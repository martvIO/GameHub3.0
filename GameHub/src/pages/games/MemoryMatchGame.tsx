import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MemoryMatchGame = () => {
  const icons = ['🍎', '🍌', '🍇', '🍓', '🍉', '🍒', '🍍', '🥝', '🥭', '🍑'];
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);

  const totalPairs = icons.length;

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const duplicatedIcons = [...icons, ...icons];
    const shuffledCards = duplicatedIcons
      .map((icon, index) => ({
        id: index,
        value: icon,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5);

    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs(0);
  };

  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || cards[index].isFlipped || cards[index].isMatched) {
      return;
    }

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, { ...newCards[index], index }];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      checkMatch(newFlippedCards);
    }
  };

  const checkMatch = (flippedCards) => {
    if (flippedCards[0].value === flippedCards[1].value) {
      const newCards = [...cards];
      newCards[flippedCards[0].index].isMatched = true;
      newCards[flippedCards[1].index].isMatched = true;
      setCards(newCards);
      setMatchedPairs((prev) => prev + 1);
      setFlippedCards([]);
    } else {
      setTimeout(() => {
        const newCards = [...cards];
        newCards[flippedCards[0].index].isFlipped = false;
        newCards[flippedCards[1].index].isFlipped = false;
        setCards(newCards);
        setFlippedCards([]);
      }, 600);
    }
  };

  useEffect(() => {
    if (matchedPairs === totalPairs) {
      setTimeout(() => {
        alert('🎉 Congratulations! You matched all pairs!');
        resetGame();
      }, 800);
    }
  }, [matchedPairs, totalPairs]);

  const progressPercentage = (matchedPairs / totalPairs) * 100;

  return (
    <div className="min-h-screen bg-gray-900 dark:bg-gray-100 py-16 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-2xl mx-auto space-y-8"
      >
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 dark:bg-purple-400/10 mb-4">
            <span className="text-purple-500 dark:text-purple-400 text-4xl">🧠</span>
          </div>
          <h1 className="text-4xl font-bold text-white dark:text-gray-900">
            Memory Match Game
          </h1>
          <p className="text-gray-400 dark:text-gray-500 max-w-lg mx-auto">
            Flip the cards to find matching pairs. Can you match them all?
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full bg-gray-800 dark:bg-gray-300 rounded-full h-4"
        >
          <div className="bg-purple-600 dark:bg-purple-500 h-full rounded-full" />
        </motion.div>

        {/* Game Board */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="grid grid-cols-5 gap-6 mt-6"
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              onClick={() => handleCardClick(index)}
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
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MemoryMatchGame;
