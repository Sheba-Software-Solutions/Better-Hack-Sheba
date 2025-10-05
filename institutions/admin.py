from django.contrib import admin
from .models import Institution, CredentialRecord, InstitutionAPIKey
from rest_framework_api_key.admin import APIKeyModelAdmin


@admin.register(Institution)
class InstitutionAdmin(admin.ModelAdmin):
    # Admin view for approving new institutions.
    list_display = ("name", "status", "created_at")
    list_filter = ("status",)
    search_fields = ("name",)


@admin.register(CredentialRecord)
class CredentialRecordAdmin(admin.ModelAdmin):
    # Read-only view for browsing issued credentials.
    list_display = ("__str__", "issuer", "status", "issued_at")
    readonly_fields = (
        "issuer",
        "credential_data",
        "credential_hash",
        "status",
        "issued_at",
    )
    search_fields = ("issuer__name", "credential_hash")


@admin.register(InstitutionAPIKey)
class InstitutionAPIKeyAdmin(APIKeyModelAdmin):
    # Admin view for generating API keys for approved institutions.
    list_display = ("name", "institution", "prefix", "created", "revoked")
    list_filter = ("institution",)
    search_fields = ("name", "institution__name", "prefix")
