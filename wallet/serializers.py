from rest_framework import serializers
from .models import Document


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = [
            "id",
            "document_file",
            "document_type",
            "verification_status",
            "uploaded_at",
        ]
        read_only_fields = ["verification_status", "uploaded_at"]
