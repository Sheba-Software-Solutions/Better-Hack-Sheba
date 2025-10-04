# --- Base Image ---
# We start with an official Python image. Using a specific version is good practice.
FROM python:3.11-slim

# --- Environment Variables ---
# These help prevent Python from writing .pyc files and buffering output.
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# --- System Dependencies ---
# We install system packages required by our app. Most importantly, tesseract-ocr.
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    # We also need gcc for compiling some Python packages if needed.
    gcc \
    # postgresql-client is needed for the psycopg2 library.
    libpq-dev \
    && apt-get clean

# --- Application Setup ---
# Set the working directory inside the container.
WORKDIR /app

# Copy the requirements file and install Python packages.
# We copy this first to leverage Docker's layer caching. If this file doesn't change,
# Docker won't re-run this step, making subsequent builds faster.
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the working directory.
COPY . .

# --- Port Exposure ---
# Expose port 8000 to allow communication with the Django app from outside the container.
EXPOSE 8000

# --- Default Command ---
# The command to run when the container starts. For development, we'll use Django's
# built-in server. For production, this would be replaced with something like gunicorn.
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
