import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card } from '../../components/ui/card';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Upload, AlertCircle, X, FileText } from 'lucide-react';
import { toast } from 'sonner';

const UploadDocument = () => {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>('');
  const [documentType, setDocumentType] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFilePreview('');
    const fileInput = document.getElementById('file') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile || !documentType) {
      toast.error('Please select a document and specify its type');
      return;
    }

    setIsUploading(true);

    // Mock upload process - convert file to base64 for storage
    const reader = new FileReader();
    reader.onloadend = () => {
      const certificates = JSON.parse(localStorage.getItem('sheba-cred-certificates') || '[]');
      const newCertificate = {
        id: Date.now().toString(),
        userId: user?.id,
        name: documentType,
        fileName: selectedFile.name,
        fileData: reader.result, // Store the file data
        status: user?.hasVerifiedId ? 'verified' : 'pending',
        uploadedAt: new Date().toISOString(),
      };
      
      certificates.push(newCertificate);
      localStorage.setItem('sheba-cred-certificates', JSON.stringify(certificates));
      
      toast.success('Document uploaded successfully!');
      setSelectedFile(null);
      setFilePreview('');
      setDocumentType('');
      setIsUploading(false);
      
      // Reset file input
      const fileInput = document.getElementById('file') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    };
    
    reader.readAsDataURL(selectedFile);
  };

  return (
    <div className="p-8">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-2 text-foreground">Upload Document</h1>
        <p className="text-muted-foreground mb-8">
          Submit your documents for verification
        </p>

        {!user?.hasVerifiedId && (
          <Alert className="mb-6 border-yellow-500 bg-yellow-50">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              For enhanced security, consider verifying your National ID in your Profile section.
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
              {!filePreview ? (
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
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, or PDF (max. 5MB)
                    </p>
                  </label>
                </div>
              ) : (
                <div className="relative border-2 border-border rounded-lg p-4">
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="absolute top-2 right-2 p-1 bg-destructive text-white rounded-full hover:bg-destructive/90 z-10"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  {selectedFile?.type.startsWith('image/') ? (
                    <img
                      src={filePreview}
                      alt="Preview"
                      className="w-full h-64 object-contain rounded"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-64">
                      <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                      <p className="text-sm font-medium">{selectedFile?.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">PDF Document</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isUploading}
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
