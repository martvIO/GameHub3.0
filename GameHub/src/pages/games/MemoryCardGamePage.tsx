import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import { FaApple, FaAndroid, FaWindows, FaLinux, FaReact, FaVuejs, FaAngular, FaNodeJs } from 'react-icons/fa';
import { GiGamepad, GiChessKnight } from 'react-icons/gi';
import { Header } from '@/components/Games/memory-card-game/Header';
import { Stats } from '@/components/Games/memory-card-game/Stats';
import { GameGrid } from '@/components/Games/memory-card-game/GameGrid';
import { WinModal } from '@/components/Games/memory-card-game/WinModal';
import { formatTime } from '@/lib/utils';

const icons: IconType[] = [FaApple, FaAndroid, FaWindows, FaLinux, FaReact, FaVuejs, FaAngular, FaNodeJs, GiGamepad, GiChessKnight];
const shuffledIcons = [...icons, ...icons].sort(() => Math.random() - 0.5);

export const MemoryCardGamePage: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (timerRunning) {
      timer = setInterval(() => setTime((prev) => prev + 1), 1000);
    }
    return () => timer && clearInterval(timer);
  }, [timerRunning]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstIndex, secondIndex] = flippedCards;
      if (shuffledIcons[firstIndex] === shuffledIcons[secondIndex]) {
        setMatchedCards((prev) => [...prev, firstIndex, secondIndex]);
      }
      setTimeout(() => setFlippedCards([]), 1000);
      setMoves((prev) => prev + 1);
    }
  }, [flippedCards]);

  useEffect(() => {
    if (matchedCards.length === icons.length * 2) setTimerRunning(false);
  }, [matchedCards]);

  const handleCardClick = (index: number) => {
    if (!timerRunning) setTimerRunning(true);
    if (flippedCards.length < 2 && !flippedCards.includes(index) && !matchedCards.includes(index)) {
      setFlippedCards((prev) => [...prev, index]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 py-16 px-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="max-w-2xl mx-auto space-y-8">
        <Header />
        <Stats moves={moves} time={formatTime(time)} />
        <GameGrid icons={shuffledIcons} flippedCards={flippedCards} matchedCards={matchedCards} handleCardClick={handleCardClick} />
      </motion.div>

      {matchedCards.length === icons.length * 2 && (
        <WinModal moves={moves} time={formatTime(time)} onReplay={() => window.location.reload()} onHome={() => (window.location.href = '/')} />
      )}
    </div>
  );
};
