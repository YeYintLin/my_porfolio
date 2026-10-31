"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./WelcomeSplash.css";

interface WelcomeSplashProps {
  duration?: number;
}

export default function WelcomeSplash({ duration = 2000 }: WelcomeSplashProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

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
          aria-label="Loading portfolio"
          role="status"
        >
          <div className="loader-wrapper">
            <span className="loader-letter">G</span>
            <span className="loader-letter">e</span>
            <span className="loader-letter">n</span>
            <span className="loader-letter">e</span>
            <span className="loader-letter">r</span>
            <span className="loader-letter">a</span>
            <span className="loader-letter">t</span>
            <span className="loader-letter">i</span>
            <span className="loader-letter">n</span>
            <span className="loader-letter">g</span>

            <div className="loader"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
