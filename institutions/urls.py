from django.urls import path
from .views import (
    InstitutionRegistrationView,
    CredentialIssuanceView,
    InstitutionCredentialListView,
)

# Defines the URL patterns for the 'institutions' app.
urlpatterns = [
    # Endpoint for new institutions to sign up.
    path(
        "register/", InstitutionRegistrationView.as_view(), name="institution-register"
    ),
    # Secure endpoint for approved institutions to issue new credentials.
    path("issue/", CredentialIssuanceView.as_view(), name="credential-issue"),
    # Secure endpoint for an institution to view their issued credentials.
    path(
        "credentials/",
        InstitutionCredentialListView.as_view(),
        name="institution-credentials-list",
    ),
]
