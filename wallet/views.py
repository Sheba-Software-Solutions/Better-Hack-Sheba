import hashlib
import json
import pytesseract
from PIL import Image

from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from thefuzz import fuzz

from institutions.models import CredentialRecord
from .models import Document
from .parser import parse_credential_from_text
from .serializers import DocumentSerializer


class UserDocumentVerifyView(APIView):
    """
    Handles user document uploads for verification against trusted records.
    """

    permission_classes = [permissions.AllowAny]  # Temporarily allow any user for testing

    def _generate_hash_from_data(self, data):
        """Generates a SHA-256 hash from a dictionary."""
        canonical_string = json.dumps(data, sort_keys=True)
        return hashlib.sha256(canonical_string.encode("utf-8")).hexdigest()

    def post(self, request, *args, **kwargs):
        # 1. Handle the file upload and create a Document instance.
        serializer = DocumentSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Create a dummy user for testing if not authenticated
        user = getattr(request, 'user', None)
        if not user or not user.is_authenticated:
            from core.models import User
            user = User.objects.first()  # Use first user for testing
        
        document = serializer.save(user=user)

        # 2. Perform OCR on the uploaded document.
        try:
            extracted_text = pytesseract.image_to_string(
                Image.open(document.document_file.path)
            )
            document.extracted_text = extracted_text
            document.save()
        except Exception as e:
            document.delete()  # Clean up the failed document
            return Response(
                {"error": f"OCR processing failed: {e}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        # 3. Parse the extracted text to get structured data.
        parsed_data = parse_credential_from_text(document.extracted_text)
        if not parsed_data:
            return Response(
                {"status": "UNVERIFIED", "detail": "Could not parse required fields."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # 4. Attempt a direct verification with a hash match.
        ocr_hash = self._generate_hash_from_data(parsed_data)
        try:
            matched_credential = CredentialRecord.objects.get(credential_hash=ocr_hash)
            document.verified_credential = matched_credential
            document.save()
            return Response(
                {"status": "VERIFIED", "data": matched_credential.credential_data},
                status=status.HTTP_200_OK,
            )
        except CredentialRecord.DoesNotExist:
            pass  # If no direct match, proceed to fuzzy matching.

        # 5. Fuzzy matching fallback if direct hash match fails.
        credential_id = parsed_data.get("credential_id")
        if credential_id:
            try:
                # Note: This is a simplified lookup. A real-world scenario might need a more robust search.
                potential_match = CredentialRecord.objects.get(
                    credential_data__credential_id=credential_id
                )

                trusted_name = potential_match.credential_data.get("full_name", "")
                ocr_name = parsed_data.get("full_name", "")
                similarity_score = fuzz.ratio(trusted_name.lower(), ocr_name.lower())

                if similarity_score > 90:
                    return Response(
                        {
                            "status": "CONFIRMATION_REQUIRED",
                            "suggestion": potential_match.credential_data,
                            "document_id": document.id,
                            "match_id": potential_match.id,
                        },
                        status=status.HTTP_200_OK,
                    )
            except CredentialRecord.DoesNotExist:
                pass  # No potential match found by ID.

        # 6. If all attempts fail, return unverified.
        return Response(
            {"status": "UNVERIFIED", "detail": "No matching credential record found."},
            status=status.HTTP_404_NOT_FOUND,
        )


class UserDocumentConfirmView(APIView):
    """
    Endpoint for the user to confirm a fuzzy match suggestion from the verify endpoint.
    """

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        document_id = request.data.get("document_id")
        credential_id = request.data.get("credential_id")

        if not document_id or not credential_id:
            return Response(
                {"error": "document_id and credential_id are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            # Ensure the document belongs to the requesting user for security.
            document = Document.objects.get(id=document_id, user=request.user)
            credential = CredentialRecord.objects.get(id=credential_id)

            # Link the document to the confirmed credential.
            document.verified_credential = credential
            document.save()

            return Response(
                {"status": "VERIFIED", "data": credential.credential_data},
                status=status.HTTP_200_OK,
            )
        except Document.DoesNotExist:
            return Response(
                {"error": "Document not found or access denied."},
                status=status.HTTP_404_NOT_FOUND,
            )
        except CredentialRecord.DoesNotExist:
            return Response(
                {"error": "Credential record not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
