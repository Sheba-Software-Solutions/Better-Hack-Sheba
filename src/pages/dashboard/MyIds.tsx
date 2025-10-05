
import { useState } from "react";
import type { Card } from "../../types/card";
import CardRenderer from "../../components/CardRenderer";
import CardDetailDialog from "../../components/CardDetailDialog";
import cardsData from "../../data/cardsData.json";
import { Wallet } from "lucide-react";

const MyIds = () => {
  const cards: Card[] = cardsData as Card[];
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary rounded-2xl">
              <Wallet className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">My Wallet</h1>
              <p className="text-muted-foreground mt-1">Your digital identity cards</p>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {cards.map((card) => (
            <div key={card.id} className="animate-fade-in">
              <CardRenderer card={card} onClick={() => handleCardClick(card)} />
            </div>
          ))}
        </div>

        {/* Card Detail Dialog */}
        <CardDetailDialog 
          card={selectedCard}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />

        {/* Empty State */}
        {cards.length === 0 && (
          <div className="text-center py-20">
            <Wallet className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No cards yet</h3>
            <p className="text-muted-foreground">Add your first digital ID card to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyIds;
