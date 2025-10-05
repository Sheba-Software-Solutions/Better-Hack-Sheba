from rest_framework import serializers
from .models import User


class KYCSubmissionSerializer(serializers.ModelSerializer):
    """
    Serializer for handling the user's KYC document submission.
    This is used to upload the ID card and selfie images.
    """

    class Meta:
        model = User
        # The user can only write to the image fields.
        fields = ["id_card_image", "selfie_image", "kyc_status"]
        # The kyc_status is updated by the system/admin, not the user.
        read_only_fields = ["kyc_status"]
