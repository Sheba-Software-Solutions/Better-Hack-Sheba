import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { CreditCard, Upload, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const UploadId = () => {
  const { user } = useAuth();
  const [idType, setIdType] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [fullName, setFullName] = useState(user?.name || '');
  const [birthdate, setBirthdate] = useState('');
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFrontFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFrontFile(e.target.files[0]);
    }
  };

  const handleBackFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBackFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!idType || !idNumber || !fullName || !birthdate || !frontFile) {
      toast.error('Please fill all required fields and upload front side of ID');
      return;
    }

    setIsUploading(true);

    // Mock upload process
    setTimeout(() => {
      const ids = JSON.parse(localStorage.getItem('sheba-cred-ids') || '[]');
      
      const newId = {
        id: 'id-' + Date.now(),
        userId: user?.id,
        type: idType,
        idNumber,
        name: fullName,
        birthdate,
        verifiedAt: new Date().toISOString(),
      };

      ids.push(newId);
      localStorage.setItem('sheba-cred-ids', JSON.stringify(ids));

      toast.success(`${idType} uploaded and verified successfully!`);
      
      // Reset form
      setIdType('');
      setIdNumber('');
      setBirthdate('');
      setFrontFile(null);
      setBackFile(null);
      setIsUploading(false);
    }, 2000);
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <CreditCard className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Upload ID Document</h1>
        </div>
        <p className="text-muted-foreground mb-8">
          Add a new government-issued ID to your credential wallet
        </p>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ID Type Selection */}
            <div className="space-y-2">
              <Label htmlFor="idType">ID Document Type *</Label>
              <Select value={idType} onValueChange={setIdType}>
                <SelectTrigger id="idType">
                  <SelectValue placeholder="Select ID type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="National ID">National ID</SelectItem>
                  <SelectItem value="Passport">Passport</SelectItem>
                  <SelectItem value="Driver License">Driver License</SelectItem>
                  <SelectItem value="Voter ID">Voter ID</SelectItem>
                  <SelectItem value="Military ID">Military ID</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  placeholder="As shown on ID"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="idNumber">ID Number *</Label>
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
              <Label htmlFor="birthdate">Date of Birth *</Label>
              <Input
                id="birthdate"
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
              />
            </div>

            {/* File Uploads */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="frontFile">Front Side of ID *</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                  <Input
                    id="frontFile"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFrontFileChange}
                    className="hidden"
                  />
                  <label htmlFor="frontFile" className="cursor-pointer">
                    {frontFile ? (
                      <div className="flex flex-col items-center">
                        <CheckCircle2 className="h-8 w-8 text-accent mb-2" />
                        <p className="text-sm font-medium text-foreground">{frontFile.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">Click to change</p>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Upload front side</p>
                        <p className="text-xs text-muted-foreground mt-1">PNG, JPG, PDF</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="backFile">Back Side of ID (Optional)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                  <Input
                    id="backFile"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleBackFileChange}
                    className="hidden"
                  />
                  <label htmlFor="backFile" className="cursor-pointer">
                    {backFile ? (
                      <div className="flex flex-col items-center">
                        <CheckCircle2 className="h-8 w-8 text-accent mb-2" />
                        <p className="text-sm font-medium text-foreground">{backFile.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">Click to change</p>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Upload back side</p>
                        <p className="text-xs text-muted-foreground mt-1">PNG, JPG, PDF</p>
                      </>
                    )}
                  </label>
                </div>
              </div>
            </div>

            {/* Info Banner */}
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Verification Process:</strong> Your ID will be verified within 24-48 hours.
                You'll receive a notification once the verification is complete.
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-base"
              disabled={isUploading}
            >
              {isUploading ? 'Uploading & Verifying...' : 'Upload ID Document'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default UploadId;
