import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import wordle_image from '../assets/img/wordle.png';

const games = [
  {
    id: 'wordle',
    title: 'Wordle',
    description: 'Guess the hidden word in 6 tries.',
    image: wordle_image,
    category: 'Word Game',
    rating: 4.8,
  },
  {
    id: 'password-game',
    title: 'The Password Game',
    description: 'Create the perfect password following increasingly challenging rules.',
    image: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&w=800&q=80',
    category: 'Puzzle',
    rating: 4.7,
  },
  {
    id: 'memory-card-game',
    title: 'Memory Card Game',
    description: 'Match the pairs of icons.',
    image: 'https://images.unsplash.com/photo-1581091870621-1f9d9a3c8c8e?auto=format&fit=crop&w=800&q=80',
    category: 'Puzzle',
    rating: 4.6,
  },
];

// Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const BrowseGamesPage = () => {
  return (
    <motion.div
      className="min-h-screen bg-gray-900 dark:bg-gray-100 py-16 px-4"
      initial="initial"
      animate="animate"
      variants={fadeInUp} // Page-wide animation
    >
      <motion.div
        className="container mx-auto"
        initial="initial"
        animate="animate"
        variants={fadeInUp} // On-load animation
      >
        <div className="max-w-2xl mx-auto text-center mb-12">
          <motion.h1
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-4xl font-bold text-white dark:text-gray-900 mb-4"
          >
            Browse Games
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-gray-400 dark:text-gray-600"
          >
            Discover and play our collection of engaging games
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0, transition: { delay: index * 0.2, duration: 0.6 } },
              }}
              whileHover={{ y: -5 }} // Hover effect
              className="bg-gray-800 dark:bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <Link to={`/games/${game.id}`}>
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white dark:text-gray-900 mb-2">
                    {game.title}
                  </h3>
                  <p className="text-gray-400 dark:text-gray-600 mb-4">
                    {game.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-600">
                      {game.category}
                    </span>
                    <div className="flex items-center text-yellow-500">
                      <Star size={16} className="mr-1" />
                      {game.rating}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
