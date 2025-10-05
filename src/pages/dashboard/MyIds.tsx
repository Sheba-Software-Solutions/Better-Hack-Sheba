
import { useState, useEffect } from "react";
import type { Card } from "../../types/card";
import CardRenderer from "../../components/CardRenderer";
import CardDetailDialog from "../../components/CardDetailDialog";
import UploadIdDialog from "../../components/UploadIdDialog";
import cardsData from "../../data/cardsData.json";
import { Wallet, Plus } from "lucide-react";
import { Button } from "../../components/ui/button";

const MyIds = () => {
  const staticCards: Card[] = cardsData as Card[];
  const [uploadedCards, setUploadedCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  // Load uploaded cards from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('uploadedCards');
    if (stored) {
      try {
        setUploadedCards(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse uploaded cards:', e);
      }
    }
  }, []);

  // Save uploaded cards to localStorage whenever they change
  useEffect(() => {
    if (uploadedCards.length > 0) {
      localStorage.setItem('uploadedCards', JSON.stringify(uploadedCards));
    }
  }, [uploadedCards]);

  // Combine static and uploaded cards
  const allCards = [...staticCards, ...uploadedCards];

  const handleUploadSuccess = (newCard: Card) => {
    setUploadedCards(prev => [...prev, newCard]);
  };

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary rounded-2xl">
                <Wallet className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-foreground">My Wallet</h1>
                <p className="text-muted-foreground mt-1">Your digital identity cards</p>
              </div>
            </div>
            <Button 
              onClick={() => setUploadDialogOpen(true)}
              className="hidden md:flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Upload New ID
            </Button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {allCards.map((card) => (
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

        {/* Upload ID Dialog */}
        <UploadIdDialog 
          open={uploadDialogOpen}
          onOpenChange={setUploadDialogOpen}
          onUploadSuccess={handleUploadSuccess}
        />

        {/* Empty State */}
        {allCards.length === 0 && (
          <div className="text-center py-20">
            <Wallet className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No cards yet</h3>
            <p className="text-muted-foreground">Add your first digital ID card to get started</p>
          </div>
        )}

        {/* Floating Action Button (Mobile) */}
        <button
          onClick={() => setUploadDialogOpen(true)}
          className="md:hidden fixed bottom-6 right-6 z-40 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
          aria-label="Upload new ID"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default MyIds;
