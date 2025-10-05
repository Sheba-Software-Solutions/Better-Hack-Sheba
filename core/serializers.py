import uuid
from rest_framework import serializers
from .models import User
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import UserDetailsSerializer


class CustomRegisterSerializer(RegisterSerializer):
    """
    Custom serializer to handle the 'name' field during registration
    and auto-generate a unique username.
    """

    # Use first_name to match the Django User model
    first_name = serializers.CharField(max_length=150)
    # Make username optional since we auto-generate it
    username = serializers.CharField(max_length=150, required=False, allow_blank=True)

    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data["first_name"] = self.validated_data.get("first_name", "")
        # Auto-generate a unique username if not provided
        if not data.get("username"):
            email = data.get("email", "").split("@")[0]
            data["username"] = f"{email}-{uuid.uuid4().hex[:8]}"
        return data

    def save(self, request):
        """
        Override the save method to correctly save the 'first_name' field.
        """
        # Let the parent class create the user.
        user = super().save(request)
        # Add our custom 'first_name' field to the user object.
        user.first_name = self.cleaned_data.get("first_name", "")
        user.save(update_fields=["first_name"])
        return user


class CustomUserDetailsSerializer(UserDetailsSerializer):
    """
    Custom serializer to include the 'first_name' field and a frontend-compatible
    'hasVerifiedId' field in user details responses.
    """

    hasVerifiedId = serializers.SerializerMethodField()

    class Meta(UserDetailsSerializer.Meta):
        # Use first_name instead of name
        fields = UserDetailsSerializer.Meta.fields + (
            "first_name",
            "hasVerifiedId",
            "kyc_status",
        )

    def get_hasVerifiedId(self, obj):
        """
        Dynamically determine the value of hasVerifiedId based on kyc_status.
        Returns True only if the status is 'VERIFIED'.
        """
        return obj.kyc_status == "VERIFIED"


class KYCSubmissionSerializer(serializers.ModelSerializer):
    """
    Serializer for handling the user's KYC document submission.
    This is used to upload the ID card and selfie images.
    """

    class Meta:
        model = User
        # The user provides these fields during KYC submission.
        fields = [
            "id_card_image",
            "selfie_image",
            "id_number",
            "birthdate",
            "kyc_status",
        ]
        # The kyc_status is updated by the system/admin, not the user.
        read_only_fields = ["kyc_status"]
