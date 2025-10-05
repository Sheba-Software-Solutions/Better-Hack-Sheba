import type { CoopATM } from "../../types/card";
import { Wallet } from "lucide-react";

interface CoopATMCardProps {
  card: CoopATM;
  onClick?: () => void;
}

const CoopATMCard = ({ card, onClick }: CoopATMCardProps) => {
  return (
    <div 
      onClick={onClick}
      className="relative w-full h-56 rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
         style={{ 
           background: 'linear-gradient(135deg, hsl(var(--atm-primary)) 0%, hsl(var(--atm-secondary)) 100%)',
           boxShadow: 'var(--card-shadow-lg)'
         }}>
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full -ml-24 -mb-24"></div>
      
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-primary/70 uppercase tracking-wider font-semibold">Coop Bank ATM</p>
            <p className="text-sm font-mono mt-1 text-primary">Account: {card.accountNumber}</p>
          </div>
          <Wallet className="w-8 h-8 text-primary" />
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-2xl font-bold text-primary tracking-wider font-mono">
              {card.atmNumber}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-primary/60">Cardholder</p>
              <p className="font-semibold text-primary">{card.fullName}</p>
            </div>
            <div>
              <p className="text-xs text-primary/60">Valid Thru</p>
              <p className="font-semibold text-primary">{card.expiryDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoopATMCard;
