from rest_framework import serializers
from .models import Institution, CredentialRecord


class InstitutionRegistrationSerializer(serializers.ModelSerializer):
    """
    Serializer for new institutions to register.
    The institution provides its name, and other fields are set by the system.
    """

    class Meta:
        model = Institution
        fields = ["id", "name", "status", "created_at"]
        # 'name' is the only writeable field for registration.
        read_only_fields = ["id", "status", "created_at"]


class CredentialRecordSerializer(serializers.ModelSerializer):
    """
    Serializer for creating and viewing CredentialRecords.
    Used by the issuance API.
    """

    class Meta:
        model = CredentialRecord
        # The institution only sends 'credential_data'.
        # The 'issuer' is set in the view from the API key.
        fields = ["id", "credential_data", "credential_hash", "status", "issued_at"]
        read_only_fields = ["id", "credential_hash", "status", "issued_at"]
