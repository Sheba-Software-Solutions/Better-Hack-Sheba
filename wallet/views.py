import hashlib
import json
import pytesseract
from PIL import Image

from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from thefuzz import fuzz

from institutions.models import CredentialRecord
from .models import Document
from .parser import parse_credential_from_text
from .serializers import DocumentSerializer


class DocumentUploadView(generics.CreateAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
