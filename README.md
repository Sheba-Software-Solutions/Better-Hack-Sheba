# 🪪 Sheba-Cred: Decentralized Identity Wallet for Ethiopia

## 🌍 Project Overview
**Sheba-Cred** is a decentralized identity wallet that empowers people to store, manage, and share **verifiable credentials** such as student IDs, certificates, transcripts, and membership cards.  

### The Problem
Ethiopian documents (transcripts, IDs, certificates) are often PDFs or scans that are **hard to verify internationally**.  
Employers, universities, and platforms (e.g., Binance, Upwork) struggle to trust them.  

### Our Solution
- Users upload their documents into **Sheba-Cred Wallet**.  
- Our system verifies the documents (using **OCR + rule checks + manual fallback**).  
- Once verified, we issue a **Verifiable Credential (VC)** that’s stored securely in the wallet.  
- Users can present these credentials via **QR codes**, making them **globally shareable & trustable**.  

### Future Vision
As Ethiopia adopts **Decentralized Identifiers (DID)** and **W3C Verifiable Credentials**, Sheba-Cred will evolve into a **Web3-ready DID wallet**, bridging Ethiopian documents to global standards.  

---

## ⚡ Key Features
- 🔐 **BetterAuth-powered Authentication** → Secure user login & onboarding.  
- 📄 **Hybrid Verification System** → OCR + rule-based checks + admin review.  
- 🗂️ **Wallet Storage** → Credentials stored locally in browser (React + localStorage).  
- 📲 **QR Code Sharing** → Users present credentials as QR codes for instant verification.  
- 🌐 **Scalable to DID/VC** → Future-ready for global interoperability.  

---

## 🛠️ Tech Stack
- **Frontend**: React + Tailwind + LocalStorage (wallet UI)  
- **Backend**: Django + Django REST Framework (credential issuance, verification API)  
- **Auth**: BetterAuth (user login, sessions, secure credential binding)  
- **OCR**: Tesseract (via `pytesseract`) for extracting text from IDs/pdfs  
- **Validation**: Rule-based checks + optional ML (fraud detection, stamp/logo recognition)  
- **QR Codes**: `qrcode` (Python) / `react-qr-code` (React)  

---


## 📌 Impact
- 🌍 Solves **real Ethiopian pain point**: hard-to-verify documents.  
- 🔒 Builds on **BetterAuth** for secure, modern authentication.  
- 🪪 Bridges **today’s PDFs** to **tomorrow’s verifiable credentials**.  
- 🚀 Future-ready for **Web3 identity & global interoperability**.  

---

## 👥 Team
Sheba-Cred is built by a passionate Ethiopian team known as Sheba bringing together skills in **Django, React, cybersecurity, and Web3 identity**.  

---

## 📸 Demo Flow
1. User logs in via BetterAuth.  
2. Uploads a transcript or ID.  
3. OCR + rule checks run automatically.  
4. If valid → credential issued → stored in wallet.  
5. User shares QR with employer/university.  
6. Employer scans QR → verification success ✅.  

---
