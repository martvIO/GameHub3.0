import React from 'react';
import { motion } from 'framer-motion';
import { Star, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import wordle from '../assets/img/wordle.png';

const featuredGames = [
  {
    id: 1,
    title: "Wordle",
    image: wordle,
    rating: 4.8,
    category: "word guesser",
  },
  {
    id: 2,
    title: "The password game",
    image: "https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    category: "password",
  }
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 dark:bg-gray-100">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1920&q=80"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/70 to-transparent dark:from-gray-100 dark:via-gray-100/70" />
        </div>

        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="relative container mx-auto px-4 h-full flex items-center"
        >
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-white dark:text-gray-900 mb-6">
              Your Next Gaming Adventure Starts Here
            </h1>
            <p className="text-xl text-gray-300 dark:text-gray-700 mb-8">
              Join millions of players worldwide and discover your next favorite game.
              Stream, compete, and connect with gamers around the globe.
            </p>
            <div className="flex gap-4">
              <Button
                className="bg-purple-600 text-white hover:bg-purple-500 dark:bg-purple-600 dark:text-white dark:hover:bg-purple-500"
                size="lg"
                onClick={() => navigate('/browse')}
              >
                Explore Games
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Featured Games */}
      <section className="py-16 container mx-auto px-4">
        <motion.h2
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-3xl font-bold text-white dark:text-gray-900 mb-8"
        >
          Featured Games
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={{
                initial: { opacity: 0, y: 50 },
                animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.2 } },
              }}
              className="bg-gray-800 dark:bg-gray-200 rounded-lg overflow-hidden"
            >
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-white dark:text-gray-900 mb-2">{game.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 dark:text-gray-600">{game.category}</span>
                  <div className="flex items-center text-yellow-500">
                    <Star size={16} className="mr-1" />
                    {game.rating}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={{
          initial: { opacity: 0 },
          animate: { opacity: 1, transition: { duration: 0.8 } },
        }}
        className="bg-gray-800 dark:bg-gray-200 py-16"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
              Icon: Users,
              label: 'Active Players',
              value: '2M+',
            }, {
              Icon: TrendingUp,
              label: 'Games Available',
              value: '10K+',
            }, {
              Icon: Star,
              label: 'User Rating',
              value: '4.8',
            }].map((stat, index) => (
              <motion.div
                key={index}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={{
                  initial: { opacity: 0, x: -50 },
                  animate: { opacity: 1, x: 0, transition: { delay: index * 0.2 } },
                }}
                className="flex items-center gap-4"
              >
                <stat.Icon size={48} className="text-purple-500" />
                <div>
                  <h3 className="text-3xl font-bold text-white dark:text-gray-900">{stat.value}</h3>
                  <p className="text-gray-400 dark:text-gray-600">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};
