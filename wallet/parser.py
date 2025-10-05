import re
from datetime import datetime
from typing import Optional


def parse_credential_from_text(text: str) -> Optional[dict]:
    """
    Comprehensive OCR parser for extracting structured credential data from certificates.
    
    Supports multiple document types:
    - Academic certificates (degrees, diplomas, transcripts)
    - Professional certifications
    - ID cards (student IDs, national IDs)
    - Membership cards
    - Ethiopian and international formats
    
    Extracts:
    - full_name: Person's name
    - serial_number: Unique identifier
    - issued_date: Date of issuance
    - certificate_title: Type/title of credential
    """
    
    if not text or len(text.strip()) < 10:
        return None
    
    # Normalize text: remove excessive whitespace, preserve line breaks for structure
    text_normalized = re.sub(r'[ \t]+', ' ', text)
    text_normalized = re.sub(r'\n\s*\n', '\n', text_normalized)
    
    # Extract only required fields
    extracted_data = {
        "full_name": extract_name(text_normalized),
        "serial_number": extract_serial_number(text_normalized),
        "issued_date": extract_date(text_normalized),
        "certificate_title": extract_certificate_title(text_normalized),
    }
    
    # Validation: require at minimum name and one identifier (serial or title)
    if extracted_data["full_name"] and (extracted_data["serial_number"] or extracted_data["certificate_title"]):
        # Clean up None values for optional fields
        return {k: v for k, v in extracted_data.items() if v is not None}
    
    return None


def extract_name(text: str) -> Optional[str]:
    """Extract person's name using multiple pattern strategies."""
    
    # Pattern 1: Explicit labels (most common)
    label_patterns = [
        r"(?:Full\s+)?Name\s*[:：]\s*([A-Z][A-Za-z\s\.'-]{2,50})",
        r"(?:Student|Recipient|Candidate)\s+Name\s*[:：]\s*([A-Z][A-Za-z\s\.'-]{2,50})",
        r"(?:Name\s+of\s+(?:Student|Recipient|Candidate))\s*[:：]\s*([A-Z][A-Za-z\s\.'-]{2,50})",
        r"ስም\s*[:：]\s*([A-Z][A-Za-z\s\.'-]{2,50})",  # Amharic "Name"
        # Ethiopian ID specific patterns
        r"Name[:\s]+([A-Z][a-z]+\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)",
        r"(?:የሙሉ\s+ስም|ስም)\s*[:：]?\s*([A-Z][A-Za-z\s\.'-]{2,50})",  # Full name in Amharic
    ]
    
    # Pattern 2: Ceremonial phrases
    ceremonial_patterns = [
        r"(?:This\s+(?:is\s+to\s+)?certif(?:y|ies)\s+that)\s+([A-Z][A-Za-z\s\.'-]{2,50})\s+(?:has|have)",
        r"(?:Presented\s+to|Awarded\s+to|Granted\s+to)\s+([A-Z][A-Za-z\s\.'-]{2,50})",
        r"(?:Hereby\s+conferred\s+(?:up)?on)\s+([A-Z][A-Za-z\s\.'-]{2,50})",
        r"(?:Be\s+it\s+known\s+that)\s+([A-Z][A-Za-z\s\.'-]{2,50})",
    ]
    
    # Pattern 3: Ethiopian name patterns (3-4 parts common)
    # Ethiopian names often follow: FirstName FatherName GrandfatherName
    ethiopian_patterns = [
        r"\b([A-Z][a-z]+\s+[A-Z][a-z]+\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\b",
        r"([A-Z][a-z]{2,}\s+[A-Z][a-z]{2,}\s+[A-Z][a-z]{2,})",  # 3-part Ethiopian name
    ]
    
    # Try all patterns in order of reliability
    all_patterns = label_patterns + ceremonial_patterns
    
    for pattern in all_patterns:
        match = re.search(pattern, text, re.IGNORECASE | re.MULTILINE)
        if match:
            name = match.group(1).strip()
            # Clean up common OCR artifacts
            name = re.sub(r'\s+', ' ', name)
            name = re.sub(r'[_\-]{2,}', '', name)
            # Validate: 2-5 words, reasonable length
            if 2 <= len(name.split()) <= 5 and 5 <= len(name) <= 60:
                return name
    
    return None


def extract_date(text: str) -> Optional[str]:
    """Extract and normalize dates in various formats."""
    
    # Pattern 1: Labeled dates
    labeled_patterns = [
        r"(?:Issue(?:d)?\s+(?:Date|On)|Date\s+(?:of\s+)?Issue(?:d)?)\s*[:：]\s*(\d{1,2}[-/\.]\d{1,2}[-/\.]\d{2,4})",
        r"(?:Date|Dated|Date\s+of\s+Award)\s*[:：]\s*(\d{1,2}[-/\.]\d{1,2}[-/\.]\d{2,4})",
        r"(?:Graduation\s+Date|Completion\s+Date)\s*[:：]\s*(\d{1,2}[-/\.]\d{1,2}[-/\.]\d{2,4})",
        r"(?:የተሰጠበት\s+ቀን|ቀን)\s*[:：]\s*(\d{1,2}[-/\.]\d{1,2}[-/\.]\d{2,4})",  # Amharic "Date"
        # Ethiopian ID specific patterns
        r"(?:DOB|Date\s+of\s+Birth|Birth\s+Date)\s*[:：]\s*(\d{1,2}[-/\.]\d{1,2}[-/\.]\d{2,4})",
        r"(?:Expiry\s+Date|Valid\s+Date|Validity)\s*[:：]\s*(\d{1,2}[-/\.]\d{1,2}[-/\.]\d{2,4})",
        r"(?:Admission|Admission\s+Date)\s*[:：]\s*(\d{1,2}[-/\.]\d{1,2}[-/\.]\d{2,4})",
        r"(?:የትውልድ\s+ቀን)\s*[:：]?\s*(\d{1,2}[-/\.]\d{1,2}[-/\.]\d{2,4})",  # Birth date in Amharic
    ]
    
    # Pattern 2: Written dates
    written_patterns = [
        r"(?:Issue(?:d)?|Date(?:d)?|Awarded)\s*[:：]?\s*(\d{1,2}\s+(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)[a-z]*\s+\d{2,4})",
        r"(\d{1,2}(?:st|nd|rd|th)?\s+(?:of\s+)?(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)[a-z]*,?\s+\d{2,4})",
    ]
    
    # Pattern 3: ISO and standard formats
    standard_patterns = [
        r"\b(\d{4}-\d{2}-\d{2})\b",  # ISO: 2024-01-15
        r"\b(\d{1,2}/\d{1,2}/\d{4})\b",  # US/Ethiopian: 01/15/2024
        r"\b(\d{1,2}\.\d{1,2}\.\d{4})\b",  # European: 15.01.2024
    ]
    
    all_patterns = labeled_patterns + written_patterns + standard_patterns
    
    for pattern in all_patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            date_str = match.group(1).strip()
            normalized = normalize_date(date_str)
            if normalized:
                return normalized
    
    return None


def extract_certificate_title(text: str) -> Optional[str]:
    """Extract certificate/credential title."""
    
    # Pattern 1: Certificate type with "of/in"
    type_patterns = [
        r"(?:Certificate|Diploma|Degree|Award)\s+(?:of|in)\s+([A-Za-z\s&,]+?)(?:\n|is\s+(?:hereby|awarded)|has\s+been)",
        r"(?:Bachelor|Master|Doctor|PhD|B\.?Sc|M\.?Sc|B\.?A|M\.?A)\s+(?:of|in|degree\s+in)\s+([A-Za-z\s&,]+?)(?:\n|$|,)",
    ]
    
    # Pattern 2: Labeled title
    labeled_patterns = [
        r"(?:Certificate\s+)?Title\s*[:：]\s*([A-Za-z\s&,\-]+?)(?:\n|Date|Serial|$)",
        r"(?:Program|Course|Field\s+of\s+Study)\s*[:：]\s*([A-Za-z\s&,\-]+?)(?:\n|Date|$)",
        r"(?:Credential\s+Type|Type)\s*[:：]\s*([A-Za-z\s&,\-]+?)(?:\n|$)",
        # Ethiopian ID specific patterns
        r"(?:Study\s+Level|Level)\s*[:：]\s*([A-Za-z\s&,\-]+?)(?:\n|$)",
        r"(?:Blood\s+Type|Gender|Sex|Nationality)\s*[:：]\s*([A-Z])",  # Single letter fields
    ]
    
    # Pattern 3: Document header (first line often contains title)
    header_patterns = [
        r"^([A-Z][A-Za-z\s]+(?:Certificate|Diploma|Award|Degree|Transcript))",
        r"((?:Certificate|Diploma|Award)\s+of\s+[A-Za-z\s]+)",
        # Ethiopian ID types
        r"(Ethiopian\s+(?:Driver|Driving)\s+License)",
        r"(Ethiopian\s+(?:National\s+)?(?:Digital\s+)?ID\s+Card)",
        r"(Student\s+Identification)",
    ]
    
    all_patterns = type_patterns + labeled_patterns + header_patterns
    
    for pattern in all_patterns:
        match = re.search(pattern, text, re.IGNORECASE | re.MULTILINE)
        if match:
            title = match.group(1).strip()
            # Clean up
            title = re.sub(r'\s+', ' ', title)
            title = re.sub(r'[_\-]{2,}', '', title)
            # Validate length (allow single chars for gender/blood type)
            if 1 <= len(title) <= 100:
                return title
    
    return None


def extract_serial_number(text: str) -> Optional[str]:
    """Extract serial/certificate/ID number."""
    
    # Pattern 1: Labeled serial numbers
    labeled_patterns = [
        r"(?:Serial\s+(?:Number|No\.?|#)|Certificate\s+(?:Number|No\.?|#)|ID\s+(?:Number|No\.?)?)\s*[:：]\s*([A-Z0-9\-/]+)",
        r"(?:Credential\s+ID|Document\s+ID|Reference\s+(?:Number|No))\s*[:：]\s*([A-Z0-9\-/]+)",
        r"(?:Registration\s+(?:Number|No)|Reg\.?\s+No\.?)\s*[:：]\s*([A-Z0-9\-/]+)",
        r"(?:ተ\.ቁ|መ\.ቁ)\s*[:：]\s*([A-Z0-9\-/]+)",  # Amharic abbreviations for serial number
        # Ethiopian ID specific patterns
        r"(?:License\s+No|License\s+Number)\s*[:：]?\s*([A-Z0-9\-/]+)",
        r"(?:UGR|Student\s+ID)\s*[:：]?\s*([A-Z0-9\-/]+)",
        r"(?:ID\s+Card|National\s+ID)\s*[:：]?\s*([A-Z0-9\-/]+)",
    ]
    
    # Pattern 2: Common serial formats
    format_patterns = [
        r"\b([A-Z]{2,4}[-/]\d{4,}[-/][A-Z0-9]+)\b",  # CERT-2024-ABC123
        r"\b([A-Z]{3,}\d{4,})\b",  # CERT2024123 or UGR575614
        r"\b(\d{4}[-/]\d{4,})\b",  # 2024-123456
        r"\b([A-Z]{2,}/\d{2,}/\d{4,})\b",  # ET/24/12345
        r"\b(\d{6,})\b",  # 662194 (6+ digit numbers)
        # Barcode patterns (long numeric sequences)
        r"\b(\d{12,})\b",  # 628467391861420 (barcode numbers)
    ]
    
    # Pattern 3: Generic number after keywords
    generic_patterns = [
        r"(?:No\.?|Number|#)\s*[:：]?\s*([A-Z0-9\-/]{5,})",
    ]
    
    all_patterns = labeled_patterns + format_patterns + generic_patterns
    
    for pattern in all_patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            serial = match.group(1).strip().upper()
            # Validate: should have mix of letters/numbers or be long enough
            if len(serial) >= 4 and (re.search(r'\d', serial) or len(serial) >= 6):
                return serial
    
    return None


def extract_institution(text: str) -> Optional[str]:
    """Extract issuing institution name."""
    
    patterns = [
        r"(?:Issued\s+by|Awarded\s+by|From)\s*[:：]\s*([A-Z][A-Za-z\s&,\.]+(?:University|College|Institute|Academy|School))",
        r"([A-Z][A-Za-z\s&,\.]+(?:University|College|Institute|Academy|School))",
        r"(?:Institution|Organization)\s*[:：]\s*([A-Z][A-Za-z\s&,\.]+)",
        # Ethiopian institutions
        r"(Addis\s+Ababa\s+University)",
        r"(የአዲስ\s+አበባ\s+ዩኒቨርሲቲ)",  # Addis Ababa University in Amharic
        r"(Ethiopian\s+(?:Transport|Road)\s+Authority)",
        r"(Federal\s+Democratic\s+Republic\s+of\s+Ethiopia)",
    ]
    
    for pattern in patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            institution = match.group(1).strip()
            if 5 <= len(institution) <= 100:
                return institution
    
    return None


def extract_grade(text: str) -> Optional[str]:
    """Extract grade/GPA if present."""
    
    patterns = [
        r"(?:Grade|GPA|CGPA|Score)\s*[:：]\s*([\d\.]+(?:/[\d\.]+)?)",
        r"(?:With\s+(?:a\s+)?(?:grade\s+of|GPA\s+of))\s*([\d\.]+)",
        r"(?:Distinction|First\s+Class|Second\s+Class|Pass)",
    ]
    
    for pattern in patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            return match.group(1).strip() if match.lastindex else match.group(0).strip()
    
    return None


def normalize_date(date_string: str) -> Optional[str]:
    """
    Normalize various date formats to ISO format (YYYY-MM-DD).
    Handles Ethiopian calendar dates and international formats.
    """
    if not date_string:
        return None
    
    # Clean up the date string
    date_string = date_string.strip()
    
    # Common date formats to try
    formats = [
        "%d/%m/%Y",      # 15/01/2024
        "%m/%d/%Y",      # 01/15/2024
        "%Y-%m-%d",      # 2024-01-15 (ISO)
        "%d-%m-%Y",      # 15-01-2024
        "%d.%m.%Y",      # 15.01.2024
        "%Y/%m/%d",      # 2024/01/15
        "%d %B %Y",      # 15 January 2024
        "%d %b %Y",      # 15 Jan 2024
        "%B %d, %Y",     # January 15, 2024
        "%b %d, %Y",     # Jan 15, 2024
        "%d %B, %Y",     # 15 January, 2024
        "%dth %B %Y",    # 15th January 2024
        "%dst %B %Y",    # 1st January 2024
        "%dnd %B %Y",    # 2nd January 2024
        "%drd %B %Y",    # 3rd January 2024
    ]
    
    # Remove ordinal suffixes (1st, 2nd, 3rd, 4th, etc.)
    cleaned = re.sub(r'(\d+)(?:st|nd|rd|th)', r'\1', date_string)
    
    for fmt in formats:
        try:
            parsed_date = datetime.strptime(cleaned, fmt)
            return parsed_date.strftime("%Y-%m-%d")
        except ValueError:
            continue
    
    # If parsing fails, return original if it looks like a date
    if re.search(r'\d{4}', date_string):
        return date_string
    
    return None
