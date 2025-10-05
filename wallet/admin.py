from django.contrib import admin
from .models import Document


@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    """
    Custom admin view for the Document model, which represents a user's upload attempt.
    """

    list_display = ("id", "user", "verified_credential", "uploaded_at")
    list_filter = ("user",)
    search_fields = ("user__email",)
    readonly_fields = (
        "user",
        "document_file",
        "extracted_text",
        "uploaded_at",
        "verified_credential",
    )

    fieldsets = (
        ("Document Info", {"fields": ("user", "document_file")}),
        (
            "Verification Status",
            {"fields": ("verified_credential", "extracted_text")},
        ),
        ("Timestamps", {"fields": ("uploaded_at",)}),
    )


# The VerifiableCredential model has been removed and replaced by CredentialRecord.
