from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Document

# A list of keywords that we'll look for in the extracted text.
# In a real-world application, this would be much more extensive and perhaps stored in the database.
VERIFICATION_KEYWORDS = [
    "addis ababa university",
    "ministry of education",
    "transcript",
]


@receiver(post_save, sender=Document)
def auto_verify_document(sender, instance, created, **kwargs):
    """
    A signal receiver function that runs after a Document instance is saved.

    This function performs a simple automated check on newly created documents.

    Args:
        sender: The model class that sent the signal (Document).
        instance: The actual instance of the model being saved.
        created (bool): True if a new record was created, False if an existing record was updated.
    """
    # We only want this logic to run when a document is first created.
    if created:
        # Get the extracted text from the OCR process, default to an empty string if it's None.
        extracted_text = (instance.extracted_text or "").lower()

        # Check if any of our keywords are present in the lowercase text.
        # The 'any()' function is a clean way to check for this.
        if any(keyword in extracted_text for keyword in VERIFICATION_KEYWORDS):
            # If a keyword is found, update the status to 'VERIFIED'.
            instance.verification_status = "VERIFIED"
            # We call save() again, but only update the verification_status field
            # to avoid triggering the signal in an infinite loop.
            instance.save(update_fields=["verification_status"])
            print(f"Document {instance.id} auto-verified successfully.")
