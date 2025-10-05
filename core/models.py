from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    # Override the username field to make it optional
    username = models.CharField(
        max_length=150,
        unique=True,
        null=True,
        blank=True,
    )
    email = models.EmailField(unique=True)

    KYC_STATUS_CHOICES = [
        ("UNVERIFIED", "Unverified"),
        ("PENDING", "Pending Review"),
        ("VERIFIED", "Verified"),
        ("REJECTED", "Rejected"),
    ]
    kyc_status = models.CharField(
        max_length=10, choices=KYC_STATUS_CHOICES, default="UNVERIFIED"
    )
    id_card_image = models.ImageField(upload_to="kyc_ids/", null=True, blank=True)
    selfie_image = models.ImageField(upload_to="kyc_selfies/", null=True, blank=True)
    id_number = models.CharField(max_length=100, blank=True)
    birthdate = models.DateField(null=True, blank=True)

    USERNAME_FIELD = "email"
    # Remove username from the required fields for account creation.
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
