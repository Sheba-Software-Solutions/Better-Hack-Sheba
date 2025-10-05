from django.contrib import admin
from .models import Document, VerifiableCredential


@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    """
    Custom admin view for the Document model.
    """

    # list_display defines the columns that will be shown in the main list view.
    list_display = ("id", "user", "document_type", "verification_status", "uploaded_at")

    # list_filter adds a sidebar that allows filtering the list by these fields.
    # This will be very useful for finding all "PENDING" documents.
    list_filter = ("verification_status", "document_type")

    # search_fields adds a search bar for searching across these fields.
    search_fields = ("user__email", "document_type", "extracted_text")

    # readonly_fields makes certain fields non-editable in the detail view.
    # We don't want admins accidentally changing the user or the OCR text.
    readonly_fields = (
        "user",
        "document_file",
        "extracted_text",
        "document_hash",
        "uploaded_at",
        "updated_at",
    )

    # fieldsets allows us to organize the fields in the detail view into logical groups.
    fieldsets = (
        (
            "Document Info",
            {"fields": ("user", "document_type", "document_file", "document_hash")},
        ),
        ("Verification", {"fields": ("verification_status", "extracted_text")}),
        ("Timestamps", {"fields": ("uploaded_at", "updated_at")}),
    )


# We can also register the VerifiableCredential model, though we won't customize it for now.
admin.site.register(VerifiableCredential)
