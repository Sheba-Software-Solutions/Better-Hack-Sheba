import re


def parse_credential_from_text(text: str) -> dict | None:
    """
    Parses raw OCR text to extract structured credential data.
    Uses regular expressions to find key-value pairs.
    """
    # Define regex patterns for the fields we need to extract.
    name_pattern = re.compile(r"Name:\s*(.*)", re.IGNORECASE)
    id_pattern = re.compile(r"ID:\s*([A-Z0-9\/]+)", re.IGNORECASE)
    program_pattern = re.compile(r"Program:\s*(.*)", re.IGNORECASE)

    # Search for each pattern in the provided text.
    name_match = name_pattern.search(text)
    id_match = id_pattern.search(text)
    program_match = program_pattern.search(text)

    # If all three key fields are found, construct and return a dictionary.
    if name_match and id_match and program_match:
        # .group(1) captures the text inside the parentheses in the regex.
        # .strip() removes any leading/trailing whitespace.
        data = {
            "full_name": name_match.group(1).strip(),
            "credential_id": id_match.group(1).strip(),
            "program": program_match.group(1).strip(),
        }
        return data

    # If any of the required fields are not found, return None.
    return None
