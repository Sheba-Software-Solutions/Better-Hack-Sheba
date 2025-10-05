import type { KebeleID } from "../../types/card";
import { MapPin } from "lucide-react";

interface KebeleIDCardProps {
  card: KebeleID;
  onClick?: () => void;
}

const KebeleIDCard = ({ card, onClick }: KebeleIDCardProps) => {
  return (
    <div 
      onClick={onClick}
      className="relative w-full h-56 rounded-2xl p-6 text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
         style={{ 
           background: 'linear-gradient(135deg, hsl(var(--kebele-primary)) 0%, hsl(var(--kebele-secondary)) 100%)',
           boxShadow: 'var(--card-shadow-lg)'
         }}>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
      
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs opacity-80 uppercase tracking-wider">Kebele ID</p>
            <p className="text-sm font-mono mt-1">{card.idNumber}</p>
          </div>
          <MapPin className="w-8 h-8 opacity-70" />
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-xl font-bold">{card.fullName}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs opacity-70">DOB</p>
              <p className="font-medium">{card.dob}</p>
            </div>
            <div>
              <p className="text-xs opacity-70">Blood Type</p>
              <p className="font-medium">{card.bloodType}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs opacity-70">Emergency Contact</p>
              <p className="font-medium">{card.emergencyContact}</p>
            </div>
            <div>
              <p className="text-xs opacity-70">Valid Until</p>
              <p className="font-medium">{card.expiryDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KebeleIDCard;
