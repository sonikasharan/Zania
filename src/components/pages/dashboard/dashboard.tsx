import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "../../shared/card/card";
import Overlay from "../../shared/overlay/overlay";

interface Card {
  type: string;
  title: string;
  position: number;
  image: string;
}

const Dashboard: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleCardClick = (image: string) => {
    setSelectedImage(image);
  };

  //When Overlay Closes setting selected image to null
  const handleOverlayClose = () => {
    setSelectedImage(null);
  };

  const saveCards = async (updatedcards: Card[]) => {
    try {
      await axios.post("/api/cards", updatedcards);
      setCards(updatedcards);
    } catch (error) {
      console.error("Error saving cards", error);
    }
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Allows the drop
  };

  const handleDrop = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) return;

    // Create a copy of the cards array
    const updatedCards = [...cards];

    // Reorder the dragged card
    const [draggedCard] = updatedCards.splice(draggedIndex, 1);
    updatedCards.splice(index, 0, draggedCard);

    // Update positions of cards
    const updatedCardsWithPositions = updatedCards.map((card, i) => ({
      ...card,
      position: i + 1,
    }));

    setCards(updatedCardsWithPositions);
    saveCards(updatedCardsWithPositions);
    setDraggedIndex(null);
  };

  useEffect(() => {
    //fetch the Card Data
    const fetchData = async () => {
      try {
        const response = await axios.get<Card[]>("/api/cards");
        setCards(response.data);
      } catch (error) {
        console.error("Error fetching cards", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col w-full lg:w-fit h-full overflow-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cards</h1>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {cards
          .sort((a, b) => a.position - b.position)
          .map((card, index) => (
            <div
              className=" cursor-pointer"
              key={card.position}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
              onClick={() => handleCardClick(card.image)}
            >
              <Card type={card.type} title={card.title} image={card.image} />
            </div>
          ))}
      </div>
      {selectedImage && (
        <Overlay image={selectedImage} onClose={handleOverlayClose} />
      )}
    </div>
  );
};

export default Dashboard;
