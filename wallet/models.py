#
# File: /home/pirate/Documents/Projects/Better-auth/Sheba-Pass/Better-Hack-Sheba-Cred/wallet/models.py
#
from django.db import models
from django.conf import settings

# We must import the CredentialRecord model from our new 'institutions' app
# so that we can create a relationship (ForeignKey) to it.
from institutions.models import CredentialRecord


class Document(models.Model):
    """
    Represents a user's uploaded document. This now acts as a user's "claim" or "attempt"
    to link to a pre-registered CredentialRecord from an institution.
    """

    # A link to the user who uploaded the document.
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="documents"
    )

    # The actual file (PDF, JPG, etc.) that the user uploaded from the app.
    document_file = models.FileField(upload_to="user_documents/")

    # This is the most important field in the new design. It's a link to the trusted
    # CredentialRecord.
    # By default, it is empty (null=True).
    # Only after a successful hash match will this field be populated.
    # If this field is not null, the document is considered "Verified".
    verified_credential = models.ForeignKey(
        CredentialRecord,
        on_delete=models.SET_NULL,  # If the trusted record is deleted, just set this field to null.
        null=True,  # This field can be empty in the database.
        blank=True,  # This field is optional in forms.
        related_name="user_documents",
    )

    # We still store the text extracted by OCR. This is useful for debugging
    # and for our future "fuzzy matching" logic.
    extracted_text = models.TextField(blank=True, null=True)

    # A timestamp that is automatically set when the document is first uploaded.
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        # This provides a dynamic, human-readable name based on the verification status.
        status = "Verified" if self.verified_credential else "Unverified"
        return f"Document from {self.user.email} ({status})"


# NOTE: The old `VerifiableCredential` model that was previously in this file is now obsolete.
# Its role has been fully replaced by the much more robust `CredentialRecord` model
# in the 'institutions' app. We have deleted it.
