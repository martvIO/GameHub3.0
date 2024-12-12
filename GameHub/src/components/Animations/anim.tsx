import React from "react";
import { motion, Variants } from "framer-motion";

type AnimationType =
  | "fade-up"
  | "fade-up-move-up"
  | "fade-out-move-down"
  | "fade-down"
  | "zoom-in"
  | "zoom-out"
  | "slide-left"
  | "slide-right"
  | "rotate-in"
  | "rotate-out"
  | "flip-in"
  | "flip-out";

type AnimatedChildProps = {
  children: React.ReactNode;
  animationType: AnimationType;
  duration?: number; // in seconds
  delay?: number; // in seconds
  className?: string;
};

const animationVariants: Record<AnimationType, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-up-move-up": {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: -10 },
  },
  "fade-out-move-down": {
    hidden: { opacity: 1, y: 0 },
    visible: { opacity: 0, y: 50 },
  },
  "fade-down": {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  "zoom-in": {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  "zoom-out": {
    hidden: { opacity: 1, scale: 1 },
    visible: { opacity: 0, scale: 0.8 },
  },
  "slide-left": {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  "rotate-in": {
    hidden: { opacity: 0, rotate: -90 },
    visible: { opacity: 1, rotate: 0 },
  },
  "rotate-out": {
    hidden: { opacity: 1, rotate: 0 },
    visible: { opacity: 0, rotate: 90 },
  },
  "flip-in": {
    hidden: { opacity: 0, scaleX: 0 },
    visible: { opacity: 1, scaleX: 1 },
  },
  "flip-out": {
    hidden: { opacity: 1, scaleX: 1 },
    visible: { opacity: 0, scaleX: 0 },
  },
};

const AnimatedChild: React.FC<AnimatedChildProps> = ({
  children,
  animationType,
  duration = 0.5,
  delay = 0,
  className = "",
}) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={animationVariants[animationType]}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedChild;
