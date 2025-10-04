import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Upload, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [idNumber, setIdNumber] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleVerifyId = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile || !idNumber || !birthdate) {
      toast.error('Please fill all fields and upload your ID document');
      return;
    }

    setIsVerifying(true);

    // Mock verification process
    setTimeout(() => {
      updateUser({ hasVerifiedId: true });
      
      // Store National ID info
      const ids = JSON.parse(localStorage.getItem('sheba-cred-ids') || '[]');
      ids.push({
        id: Date.now().toString(),
        userId: user?.id,
        type: 'National ID',
        idNumber,
        name: user?.name,
        birthdate,
        verifiedAt: new Date().toISOString(),
      });
      localStorage.setItem('sheba-cred-ids', JSON.stringify(ids));
      
      toast.success('National ID verified successfully!');
      setIsVerifying(false);
    }, 2000);
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
              Before uploading other documents, you must first verify your National ID. This ensures the security and authenticity of your identity wallet.
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
                      {selectedFile ? selectedFile.name : 'Click to upload your National ID'}
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
