# hashlib is a standard Python library used to create secure hashes (like SHA-256).
import hashlib

# json is a library for working with JSON data, which we'll use for hashing.
import json

# models is the core of Django's database functionality.
from django.db import models

# settings allows us to refer to our custom User model easily (AUTH_USER_MODEL).
from django.conf import settings
from rest_framework_api_key.models import AbstractAPIKey


class Institution(models.Model):
    """
    Represents a partner institution (e.g., a university, government agency)
    that is authorized to issue credentials into our system.
    """

    # These choices will create a dropdown menu in the Django admin for the 'status' field.
    APPROVAL_STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("APPROVED", "Approved"),
        ("REJECTED", "Rejected"),
    ]

    # The official name of the institution. We make it unique to prevent duplicates.
    name = models.CharField(max_length=255, unique=True)

    # A link to a User account that can manage this institution.
    # This is optional and can be set by a system administrator.
    # on_delete=models.SET_NULL means if the assigned user is deleted, this field will become empty (null)
    # instead of deleting the institution, which is safer.
    admin_user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,  # Allows the database column to be empty.
        blank=True,  # Allows the field to be optional in forms like the Django admin.
        help_text="The user account that can manage this institution.",
    )

    # The approval status of the institution, controlled by our admins.
    # It uses the choices defined above and defaults to 'PENDING'.
    status = models.CharField(
        max_length=10, choices=APPROVAL_STATUS_CHOICES, default="PENDING"
    )

    # A timestamp that is automatically set when the institution is first created.
    created_at = models.DateTimeField(auto_now_add=True)

    # This special method defines how an Institution object is displayed as a string,
    # which is very useful in the Django admin.
    def __str__(self):
        return self.name


class CredentialRecord(models.Model):
    """
    Stores the authoritative, trusted record of a credential as provided
    by an approved institution. This is our "source of truth".
    """

    STATUS_CHOICES = [
        ("ACTIVE", "Active"),
        ("REVOKED", "Revoked"),  # For credentials that are no longer valid.
        ("EXPIRED", "Expired"),  # For credentials that have a time limit.
    ]

    # A required link to the institution that issued this credential.
    # One institution can issue many credentials.
    # related_name allows us to easily get all credentials from an institution
    # object, e.g., `my_institution.credentials.all()`.
    issuer = models.ForeignKey(
        Institution,
        on_delete=models.CASCADE,  # If an institution is deleted, all its credentials are also deleted.
        related_name="credentials",
    )

    # A special field type for storing structured JSON data directly in the database.
    # This will hold the data like {"full_name": "John Doe", "program": "CS"}.
    credential_data = models.JSONField()

    # This field will store the unique digital fingerprint of the credential_data.
    # `unique=True` ensures no two records can have the same hash.
    # `db_index=True` makes database lookups on this field extremely fast.
    credential_hash = models.CharField(
        max_length=64,  # SHA-256 hashes are always 64 characters long.
        unique=True,
        db_index=True,
    )

    # The current status of the credential.
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="ACTIVE")

    # A timestamp that is automatically set when the record is first created.
    issued_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        # We try to find a 'full_name' in the JSON data to create a nice, readable name.
        # If it's not found, we'll just show 'N/A'.
        full_name = self.credential_data.get("full_name", "N/A")
        return f"Credential for {full_name} from {self.issuer.name}"

    def save(self, *args, **kwargs):
        """
        We override Django's default save method. This custom logic will run
        every time a CredentialRecord is saved to the database.
        """
        # We call our custom method to generate the hash before the data is saved.
        self.credential_hash = self._generate_hash()
        # After setting the hash, we call the original, default save method to save the object.
        super().save(*args, **kwargs)

    def _generate_hash(self):
        """
        Generates a consistent and deterministic SHA-256 hash from the credential_data JSON.
        'Deterministic' means the same input will ALWAYS produce the same output.
        """
        # We convert the Python dictionary (credential_data) into a JSON string.
        # `sort_keys=True` is the most critical part. It guarantees that the JSON's keys
        # are always in the same alphabetical order. This ensures that a dictionary with a
        # different key order will still produce the exact same hash.
        canonical_string = json.dumps(self.credential_data, sort_keys=True)

        # The hashing function requires a byte string, so we encode our string into UTF-8 bytes.
        # We then create the SHA-256 hash and get its hexadecimal string representation.
        return hashlib.sha256(canonical_string.encode("utf-8")).hexdigest()


class InstitutionAPIKey(AbstractAPIKey):
    """
    A custom API Key model that links a key directly to an Institution.
    """

    institution = models.ForeignKey(
        Institution,
        on_delete=models.CASCADE,
        related_name="api_keys",
    )
