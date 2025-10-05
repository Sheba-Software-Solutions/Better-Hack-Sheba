from rest_framework import serializers
from .models import Document


class DocumentSerializer(serializers.ModelSerializer):
    """
    Serializer for the user's document upload.
    It primarily handles the creation of a Document instance from a file upload.
    """

    class Meta:
        model = Document
        # The user only needs to provide the 'document_file'.
        # All other fields are either set by the system or derived later.
        fields = ["id", "document_file", "verified_credential", "uploaded_at"]
        read_only_fields = ["id", "verified_credential", "uploaded_at"]
