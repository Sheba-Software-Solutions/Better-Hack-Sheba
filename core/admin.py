from django.contrib import admin
from django.contrib.auth import get_user_model

User = get_user_model()


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    # Show key fields including KYC status in the list view
    list_display = (
        "id",
        "email",
        "username",
        "kyc_status",
        "is_active",
        "is_staff",
        "date_joined",
    )
    list_filter = ("kyc_status", "is_active", "is_staff")
    search_fields = ("email", "username")

    # Make non-editable info read-only on the detail page
    readonly_fields = ("date_joined", "last_login")

    # Organize fields into sections for clarity
    fieldsets = (
        ("Account", {"fields": ("email", "username", "password")}),
        ("KYC", {"fields": ("kyc_status", "id_card_image", "selfie_image")}),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )
