import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Upload, CheckCircle, X, FileText } from 'lucide-react';
import { toast } from 'sonner';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [idNumber, setIdNumber] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState(false);

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
    const fileInput = document.getElementById('idFile') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleVerifyId = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile || !idNumber || !birthdate) {
      toast.error('Please fill all fields and upload your ID document');
      return;
    }

    setIsVerifying(true);

    // Convert file to base64 and store
    const reader = new FileReader();
    reader.onloadend = () => {
      // Update user verification status
      updateUser({ hasVerifiedId: true });
      
      // Store National ID info with file data
      const ids = JSON.parse(localStorage.getItem('sheba-cred-ids') || '[]');
      const newId = {
        id: Date.now().toString(),
        userId: user?.id,
        type: 'National ID',
        idNumber,
        name: user?.name,
        birthdate,
        fileName: selectedFile.name,
        fileData: reader.result, // Store the file data
        verifiedAt: new Date().toISOString(),
      };
      ids.push(newId);
      localStorage.setItem('sheba-cred-ids', JSON.stringify(ids));
      
      toast.success('National ID verified successfully!');
      setIsVerifying(false);
      
      // Reset form
      setIdNumber('');
      setBirthdate('');
      setSelectedFile(null);
      setFilePreview('');
      
      // Reset file input
      const fileInput = document.getElementById('idFile') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    };
    
    reader.onerror = () => {
      toast.error('Failed to read file. Please try again.');
      setIsVerifying(false);
    };
    
    reader.readAsDataURL(selectedFile);
  };

  return (
    <div className="p-8">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-2 text-foreground">Profile</h1>
        <p className="text-muted-foreground mb-8">
          Manage your personal information and verify your identity
        </p>

        {/* User Info Card */}
        <Card className="p-6 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold mb-1 text-foreground">{user?.name}</h2>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
            {user?.hasVerifiedId && (
              <Badge variant="secondary" className="bg-accent text-accent-foreground">
                <CheckCircle className="h-4 w-4 mr-1" />
                ID Verified
              </Badge>
            )}
          </div>
        </Card>

        {/* National ID Verification */}
        {!user?.hasVerifiedId ? (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Verify Your National ID</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Verify your National ID to enhance the security and authenticity of your identity wallet. Verified users receive priority processing for their documents.
            </p>

            <form onSubmit={handleVerifyId} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={user?.name || ''}
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="idNumber">ID Number</Label>
                  <Input
                    id="idNumber"
                    placeholder="e.g., ET123456789"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthdate">Birthdate</Label>
                <Input
                  id="birthdate"
                  type="date"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="idFile">Upload National ID</Label>
                {!filePreview ? (
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-accent transition-colors">
                    <Input
                      id="idFile"
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label htmlFor="idFile" className="cursor-pointer">
                      <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground mb-1">
                        Click to upload your National ID
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
                        alt="ID Preview"
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
                disabled={isVerifying}
              >
                {isVerifying ? 'Verifying...' : 'Verify National ID'}
              </Button>
            </form>
          </Card>
        ) : (
          <Card className="p-6 bg-muted/50">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle className="h-6 w-6 text-accent" />
              <h2 className="text-xl font-semibold text-foreground">National ID Verified</h2>
            </div>
            <p className="text-muted-foreground">
              Your National ID has been successfully verified. You can now upload other documents to your wallet.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Profile;
