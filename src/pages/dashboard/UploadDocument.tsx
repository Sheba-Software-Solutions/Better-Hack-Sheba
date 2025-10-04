import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card } from '../../components/ui/card';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Upload, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const UploadDocument = () => {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.hasVerifiedId) {
      toast.error('Please verify your National ID first in the Profile section');
      return;
    }

    if (!selectedFile || !documentType) {
      toast.error('Please select a document and specify its type');
      return;
    }

    setIsUploading(true);

    // Mock upload process
    setTimeout(() => {
      const certificates = JSON.parse(localStorage.getItem('sheba-cred-certificates') || '[]');
      const newCertificate = {
        id: Date.now().toString(),
        userId: user.id,
        name: documentType,
        fileName: selectedFile.name,
        status: 'pending',
        uploadedAt: new Date().toISOString(),
      };
      
      certificates.push(newCertificate);
      localStorage.setItem('sheba-cred-certificates', JSON.stringify(certificates));
      
      toast.success('Document uploaded successfully! Awaiting verification.');
      setSelectedFile(null);
      setDocumentType('');
      setIsUploading(false);
    }, 1500);
  };

  return (
    <div className="p-8">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-2 text-foreground">Upload Document</h1>
        <p className="text-muted-foreground mb-8">
          Submit your documents for verification
        </p>

        {!user?.hasVerifiedId && (
          <Alert className="mb-6 border-destructive">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive">
              You must verify your National ID in your Profile before uploading documents.
            </AlertDescription>
          </Alert>
        )}

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="documentType">Document Type</Label>
              <Input
                id="documentType"
                placeholder="e.g., Birth Certificate, Degree, Driver's License"
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Choose File</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent transition-colors">
                <Input
                  id="file"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="file" className="cursor-pointer">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-2">
                    {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, or PDF (max. 5MB)
                  </p>
                </label>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={!user?.hasVerifiedId || isUploading}
            >
              {isUploading ? 'Uploading...' : 'Upload Document'}
            </Button>
          </form>
        </Card>

        <div className="mt-8 bg-muted/50 rounded-lg p-6">
          <h3 className="font-semibold mb-3 text-foreground">Verification Process</h3>
          <ol className="space-y-2 text-sm text-muted-foreground list-decimal pl-5">
            <li>Document is uploaded and scanned using OCR</li>
            <li>Automated rule checks verify document format and data</li>
            <li>Admin team manually reviews for authenticity</li>
            <li>You receive a verified credential with QR code</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default UploadDocument;
