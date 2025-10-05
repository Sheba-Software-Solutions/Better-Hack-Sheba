from django.urls import path
from .views import KYCSubmissionView

app_name = "core"

urlpatterns = [
    # Authenticated users submit ID + selfie for manual KYC review
    path("kyc/submit/", KYCSubmissionView.as_view(), name="kyc-submit"),
]
