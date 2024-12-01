import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ card, index, onClick }) => {
  return (
    <motion.div
      key={card.id}
      onClick={() => onClick(index)}
      className="relative w-24 h-24 flex items-center justify-center rounded-lg shadow-lg cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.05 }}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Card Front */}
      <motion.div
        initial={{ rotateY: 180 }}
        animate={{
          rotateY: card.isFlipped || card.isMatched ? 0 : 180,
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`absolute w-full h-full flex items-center justify-center rounded-lg ${
          card.isFlipped || card.isMatched ? 'bg-white text-black' : 'bg-purple-600'
        }`}
        style={{
          backfaceVisibility: 'hidden',
        }}
      >
        {card.isFlipped || card.isMatched ? (
          <span className="text-3xl">{card.value}</span>
        ) : null}
      </motion.div>

      {/* Card Back */}
      <motion.div
        className="absolute w-full h-full bg-purple-600 rounded-lg"
        style={{
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
        }}
      />
    </motion.div>
  );
};

export default Card;
