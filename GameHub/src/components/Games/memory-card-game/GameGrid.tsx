// components/Games/memory-card-game/GameGrid.tsx
import React from 'react';
import { Card } from './Card';
import { IconType } from 'react-icons';

interface GameGridProps {
  icons: IconType[];
  flippedCards: number[];
  matchedCards: number[];
  handleCardClick: (index: number) => void;
}

export const GameGrid: React.FC<GameGridProps> = ({ icons, flippedCards, matchedCards, handleCardClick }) => (
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
    {icons.map((Icon, index) => (
      <Card
        key={index}
        index={index}
        Icon={Icon}
        flipped={flippedCards.includes(index)}
        matched={matchedCards.includes(index)}
        onClick={handleCardClick}
      />
    ))}
  </div>
);
