from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_api_key.permissions import HasAPIKey
from .models import CredentialRecord, Institution, InstitutionAPIKey
from .serializers import (
    CredentialRecordSerializer,
    InstitutionRegistrationSerializer,
)


class InstitutionRegistrationView(generics.CreateAPIView):
    """
    API endpoint for new institutions to register.
    This is a public endpoint.
    """

    queryset = Institution.objects.all()
    serializer_class = InstitutionRegistrationSerializer
    permission_classes = [permissions.AllowAny]  # Anyone can register.


class CredentialIssuanceView(generics.CreateAPIView):
    """
    API endpoint for an approved institution to issue a new credential.
    Requires a valid Institution API Key.
    """

    queryset = CredentialRecord.objects.all()
    serializer_class = CredentialRecordSerializer
    permission_classes = [HasAPIKey]  # Enforce API Key authentication.

    def perform_create(self, serializer):
        # Identify the institution from the provided API key.
        key = self.request.META["HTTP_AUTHORIZATION"].split()[1]
        api_key_object = InstitutionAPIKey.objects.get_from_key(key)
        requesting_institution = api_key_object.institution
        # Save the new credential, linking it to the correct institution.
        serializer.save(issuer=requesting_institution)


class InstitutionCredentialListView(generics.ListAPIView):
    """
    API endpoint for an institution to view the credentials they have issued.
    Requires a valid Institution API Key.
    """

    serializer_class = CredentialRecordSerializer
    permission_classes = [HasAPIKey]

    def get_queryset(self):
        # Identify the institution from the API key.
        key = self.request.META["HTTP_AUTHORIZATION"].split()[1]
        api_key_object = InstitutionAPIKey.objects.get_from_key(key)
        # Return only the credentials issued by that specific institution.
        return CredentialRecord.objects.filter(issuer=api_key_object.institution)
