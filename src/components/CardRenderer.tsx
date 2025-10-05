import type { Card } from "../types/card";
import CoopATMCard from "./cards/CoopATMCard";
import DriversLicenseCard from "./cards/DriversLicenseCard";
import KebeleIDCard from "./cards/KebeleIdCard";
import NationalIDCard from "./cards/NationalIdCard";

interface CardRendererProps {
  card: Card;
  onClick?: () => void;
}

const CardRenderer = ({ card, onClick }: CardRendererProps) => {
  switch (card.type) {
    case 'drivers_license':
      return <DriversLicenseCard card={card} onClick={onClick} />;
    case 'national_id':
      return <NationalIDCard card={card} onClick={onClick} />;
    case 'kebele_id':
      return <KebeleIDCard card={card} onClick={onClick} />;
    case 'coop_atm':
      return <CoopATMCard card={card} onClick={onClick} />;
    default:
      return null;
  }
};

export default CardRenderer;
