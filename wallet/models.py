from django.db import models
from django.conf import settings


class Document(models.Model):
    VERIFICATION_STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("VERIFIED", "Verified"),
        ("REJECTED", "Rejected"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="documents"
    )
    document_file = models.FileField(upload_to="documents/")
    document_type = models.CharField(
        max_length=100
    )  # e.g., 'Transcript', 'Certificate'
    verification_status = models.CharField(
        max_length=10, choices=VERIFICATION_STATUS_CHOICES, default="PENDING"
    )
    extracted_text = models.TextField(blank=True, null=True)
    document_hash = models.CharField(max_length=64, blank=True, null=True)  # SHA256
    uploaded_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.document_type} for {self.user.email}"


class VerifiableCredential(models.Model):
    document = models.OneToOneField(
        Document, on_delete=models.CASCADE, primary_key=True, related_name="credential"
    )
    credential_id = models.CharField(
        max_length=255, unique=True
    )  # Could be a UUID or DID
    issued_at = models.DateTimeField(auto_now_add=True)
    qr_code = models.ImageField(upload_to="qrcodes/", blank=True, null=True)

    def __str__(self):
        return f"VC for {self.document.document_type} - {self.document.user.email}"
