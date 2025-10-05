import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import type { CardType } from "../types/card";

interface UploadIdDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UploadIdDialog = ({ open, onOpenChange }: UploadIdDialogProps) => {
  const [cardType, setCardType] = useState<CardType | "">("");
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    issuedDate: "",
    expiryDate: "",
    // Driver's License
    licenseNumber: "",
    dob: "",
    bloodType: "",
    nationality: "",
    // National ID
    finNumber: "",
    // Kebele ID
    idNumber: "",
    emergencyContact: "",
    // Coop ATM
    accountNumber: "",
    atmNumber: "",
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoPreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cardType) {
      toast.error("Please select an ID type");
      return;
    }
    
    if (!photoPreview) {
      toast.error("Please upload a photo");
      return;
    }

    setUploading(true);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success("ID card uploaded successfully!");
    setUploading(false);
    onOpenChange(false);
    
    // Reset form
    setCardType("");
    setPhotoPreview("");
    setFormData({
      fullName: "",
      issuedDate: "",
      expiryDate: "",
      licenseNumber: "",
      dob: "",
      bloodType: "",
      nationality: "",
      finNumber: "",
      idNumber: "",
      emergencyContact: "",
      accountNumber: "",
      atmNumber: "",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Upload className="w-6 h-6" />
            Upload New ID
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ID Type Selection */}
          <div className="space-y-2">
            <Label htmlFor="cardType">ID Type *</Label>
            <Select value={cardType} onValueChange={(value) => setCardType(value as CardType)}>
              <SelectTrigger>
                <SelectValue placeholder="Select ID type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="drivers_license">Driver's License</SelectItem>
                <SelectItem value="national_id">National ID</SelectItem>
                <SelectItem value="kebele_id">Kebele ID</SelectItem>
                <SelectItem value="coop_atm">Coop Bank ATM Card</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Photo Upload */}
          <div className="space-y-2">
            <Label>Photo *</Label>
            {!photoPreview ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
              >
                <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-sm font-medium text-foreground mb-1">
                  Click to upload photo
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG up to 5MB
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="relative">
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="absolute top-2 right-2 p-1 bg-destructive text-white rounded-full hover:bg-destructive/90"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Common Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="issuedDate">Issued Date *</Label>
              <Input
                id="issuedDate"
                type="date"
                value={formData.issuedDate}
                onChange={(e) => handleInputChange("issuedDate", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date *</Label>
              <Input
                id="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                required
              />
            </div>
          </div>

          {/* Driver's License Fields */}
          {cardType === "drivers_license" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="licenseNumber">License Number *</Label>
                <Input
                  id="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth *</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={(e) => handleInputChange("dob", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodType">Blood Type *</Label>
                <Input
                  id="bloodType"
                  value={formData.bloodType}
                  onChange={(e) => handleInputChange("bloodType", e.target.value)}
                  placeholder="e.g., A+"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality *</Label>
                <Input
                  id="nationality"
                  value={formData.nationality}
                  onChange={(e) => handleInputChange("nationality", e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          {/* National ID Fields */}
          {cardType === "national_id" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="finNumber">FIN Number *</Label>
                <Input
                  id="finNumber"
                  value={formData.finNumber}
                  onChange={(e) => handleInputChange("finNumber", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth *</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={(e) => handleInputChange("dob", e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          {/* Kebele ID Fields */}
          {cardType === "kebele_id" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="idNumber">ID Number *</Label>
                <Input
                  id="idNumber"
                  value={formData.idNumber}
                  onChange={(e) => handleInputChange("idNumber", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth *</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={(e) => handleInputChange("dob", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodType">Blood Type *</Label>
                <Input
                  id="bloodType"
                  value={formData.bloodType}
                  onChange={(e) => handleInputChange("bloodType", e.target.value)}
                  placeholder="e.g., A+"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact *</Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          {/* Coop ATM Fields */}
          {cardType === "coop_atm" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number *</Label>
                <Input
                  id="accountNumber"
                  value={formData.accountNumber}
                  onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="atmNumber">ATM Number *</Label>
                <Input
                  id="atmNumber"
                  value={formData.atmNumber}
                  onChange={(e) => handleInputChange("atmNumber", e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={uploading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={uploading}>
              {uploading ? "Uploading..." : "Upload ID"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadIdDialog;
