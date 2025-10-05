// Simple in-memory mock API for demo purposes
let documents = [
  {
    id: 'DOC-001',
    type: 'Transcript',
    owner: 'Abebe Bekele',
    institution: 'Addis Ababa University',
    uploadedAt: new Date().toISOString(),
    status: 'pending',
  },
  {
    id: 'DOC-002',
    type: 'Student ID',
    owner: 'Lulit Alemu',
    institution: 'AASTU',
    uploadedAt: new Date(Date.now() - 3600_000).toISOString(),
    status: 'pending',
  },
  {
    id: 'DOC-003',
    type: 'Certificate',
    owner: 'Samuel Tesfaye',
    institution: 'EiT-M',
    uploadedAt: new Date(Date.now() - 7200_000).toISOString(),
    status: 'verified',
  },
]

let credentials = [
  {
    id: 'VC-1001',
    subject: 'Abebe Bekele',
    type: 'TranscriptCredential',
    issuer: 'ETH Pass',
    issuedAt: new Date(Date.now() - 86_400_000).toISOString(),
    status: 'active',
  },
]

let users = [
  { id: 'U-1', name: 'Admin One', email: 'admin@ethpass.et', role: 'admin' },
  { id: 'U-2', name: 'Verifier Bot', email: 'verifier@ethpass.et', role: 'verifier' },
]

export const api = {
  async stats() {
    return {
      pending: documents.filter(d=>d.status==='pending').length,
      verified: documents.filter(d=>d.status==='verified').length,
      rejected: documents.filter(d=>d.status==='rejected').length,
      credentials: credentials.length,
    }
  },
  async listDocuments(status) {
    return documents.filter(d => !status || d.status === status)
  },
  async verifyDocument(id) {
    const doc = documents.find(d=>d.id===id)
    if (doc) doc.status = 'verified'
    // issue a simple credential for demo
    credentials.push({
      id: `VC-${Math.floor(Math.random()*9000+1000)}`,
      subject: doc?.owner ?? 'Unknown',
      type: doc?.type ?? 'Document',
      issuer: 'ETH Pass',
      issuedAt: new Date().toISOString(),
      status: 'active',
    })
    return doc
  },
  async rejectDocument(id) {
    const doc = documents.find(d=>d.id===id)
    if (doc) doc.status = 'rejected'
    return doc
  },
  async listCredentials() {
    return credentials
  },
  async revokeCredential(id) {
    const vc = credentials.find(c=>c.id===id)
    if (vc) vc.status = 'revoked'
    return vc
  },
  async listUsers() {
    return users
  },
  async addUser(user) {
    const u = { id: `U-${users.length+1}`, ...user }
    users.push(u)
    return u
  },
  async removeUser(id) {
    users = users.filter(u=>u.id!==id)
    return true
  }
}
