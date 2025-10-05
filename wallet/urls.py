from django.urls import path
from .views import UserDocumentVerifyView, UserDocumentConfirmView

urlpatterns = [
    # Endpoint for uploading a document to start the verification process.
    path("verify/", UserDocumentVerifyView.as_view(), name="document-verify"),
    # Endpoint for confirming a fuzzy match suggestion.
    path(
        "verify/confirm/",
        UserDocumentConfirmView.as_view(),
        name="document-verify-confirm",
    ),
]
