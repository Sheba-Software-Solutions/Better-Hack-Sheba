from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import User
from .serializers import KYCSubmissionSerializer


class KYCSubmissionView(generics.UpdateAPIView):
    """
    API endpoint for an authenticated user to submit their KYC documents.
    This uses UpdateAPIView to modify the current user's instance.
    """

    queryset = User.objects.all()
    serializer_class = KYCSubmissionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        """
        Override get_object to always return the currently authenticated user.
        This ensures users can only update their own profile.
        """
        return self.request.user

    def update(self, request, *args, **kwargs):
        """
        Override the update method to set the kyc_status to 'PENDING'
        after a successful document upload.
        """
        # First, call the parent's update method to handle the file saving.
        response = super().update(request, *args, **kwargs)

        # If the upload was successful (HTTP 200), update the status.
        if response.status_code == status.HTTP_200_OK:
            user = self.get_object()
            user.kyc_status = "PENDING"
            user.save(update_fields=["kyc_status"])

            # Re-serialize the user to include the updated status in the response.
            serializer = self.get_serializer(user)
            response.data = serializer.data

        return response
