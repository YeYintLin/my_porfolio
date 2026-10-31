"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./WelcomeSplash.css";

interface WelcomeSplashProps {
  duration?: number;
  text?: string;
}

export default function WelcomeSplash({
  duration = 2200,
  text = "Hello! Welcome...",
}: WelcomeSplashProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const characters = text.split("");

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="welcome-splash"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
          }}
          className="welcome-splash-overlay"
          aria-label="Welcome to Ye Yint Lin's Portfolio"
          role="status"
        >
          <div className="loader-wrapper">
            {characters.map((char, index) => (
              <span
                key={index}
                className="loader-letter"
                style={{
                  animationDelay: `${(0.06 + index * 0.07).toFixed(3)}s`,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}

            <div className="loader"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
