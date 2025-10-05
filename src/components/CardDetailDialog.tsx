import type { Card } from "../types/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { CreditCard, Shield, MapPin, Wallet } from "lucide-react";

interface CardDetailDialogProps {
  card: Card | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CardDetailDialog = ({ card, open, onOpenChange }: CardDetailDialogProps) => {
  if (!card) return null;

  const getIcon = () => {
    switch (card.type) {
      case 'drivers_license':
        return <CreditCard className="w-6 h-6" />;
      case 'national_id':
        return <Shield className="w-6 h-6" />;
      case 'kebele_id':
        return <MapPin className="w-6 h-6" />;
      case 'coop_atm':
        return <Wallet className="w-6 h-6" />;
    }
  };

  const getTitle = () => {
    switch (card.type) {
      case 'drivers_license':
        return "Driver's License";
      case 'national_id':
        return "National ID";
      case 'kebele_id':
        return "Kebele ID";
      case 'coop_atm':
        return "Coop Bank ATM Card";
    }
  };

  const getCardGradient = () => {
    switch (card.type) {
      case 'drivers_license':
        return 'linear-gradient(135deg, hsl(var(--license-primary)) 0%, hsl(var(--license-secondary)) 100%)';
      case 'national_id':
        return 'linear-gradient(135deg, hsl(var(--national-primary)) 0%, hsl(var(--national-secondary)) 100%)';
      case 'kebele_id':
        return 'linear-gradient(135deg, hsl(var(--kebele-primary)) 0%, hsl(var(--kebele-secondary)) 100%)';
      case 'coop_atm':
        return 'linear-gradient(135deg, hsl(var(--atm-primary)) 0%, hsl(var(--atm-secondary)) 100%)';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader 
          className="rounded-t-lg -mx-6 -mt-6 px-6 pt-6 pb-4 text-white relative overflow-hidden"
          style={{ background: getCardGradient() }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
          <DialogTitle className="flex items-center gap-3 text-2xl relative z-10">
            {getIcon()}
            {getTitle()}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Photo Preview */}
          <div className="w-full aspect-video bg-muted rounded-lg overflow-hidden">
            <img 
              src={card.photoUrl} 
              alt={`${card.fullName} photo`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Card Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="font-semibold text-foreground">{card.fullName}</p>
            </div>

            {card.type === 'drivers_license' && (
              <>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">License Number</p>
                  <p className="font-semibold text-foreground font-mono">{card.licenseNumber}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Date of Birth</p>
                  <p className="font-semibold text-foreground">{card.dob}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Blood Type</p>
                  <p className="font-semibold text-foreground">{card.bloodType}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Nationality</p>
                  <p className="font-semibold text-foreground">{card.nationality}</p>
                </div>
              </>
            )}

            {card.type === 'national_id' && (
              <>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">FIN Number</p>
                  <p className="font-semibold text-foreground font-mono">{card.finNumber}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Date of Birth</p>
                  <p className="font-semibold text-foreground">{card.dob}</p>
                </div>
              </>
            )}

            {card.type === 'kebele_id' && (
              <>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">ID Number</p>
                  <p className="font-semibold text-foreground font-mono">{card.idNumber}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Date of Birth</p>
                  <p className="font-semibold text-foreground">{card.dob}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Blood Type</p>
                  <p className="font-semibold text-foreground">{card.bloodType}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Emergency Contact</p>
                  <p className="font-semibold text-foreground">{card.emergencyContact}</p>
                </div>
              </>
            )}

            {card.type === 'coop_atm' && (
              <>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Account Number</p>
                  <p className="font-semibold text-foreground font-mono">{card.accountNumber}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">ATM Number</p>
                  <p className="font-semibold text-foreground font-mono">{card.atmNumber}</p>
                </div>
              </>
            )}

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Issued Date</p>
              <p className="font-semibold text-foreground">{card.issuedDate}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Expiry Date</p>
              <p className="font-semibold text-foreground">{card.expiryDate}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardDetailDialog;
