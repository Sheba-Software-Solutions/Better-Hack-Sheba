from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
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

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.email
