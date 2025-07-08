import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GlobeInstructions = ({ writingTransition, loading }) => {
  const [showSpin, setShowSpin] = useState(true);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setShowSpin(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <div>
      {/* AnimatePresence handles exit animations */}
      <AnimatePresence>
        {!writingTransition && !loading && showSpin && (
          <motion.div
            key="spin"
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center z-50 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-3xl text-gray-300"
            >
              ↑
            </motion.div>
            <motion.div
              className="uppercase text-gray-300 text-3xl pt-2"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Spin the Globe
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Down - appears after Spin fades out */}
      {!writingTransition && !loading && !showSpin && (
        <div
          className="absolute right-6 bottom-14 text-black text-lg flex items-center gap-2 z-50"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-3xl text-gray-300"
          >
            ←
          </motion.div>
          <motion.div
            className="uppercase text-gray-300 text-3xl pb-10 px-10 pt-2"
            transition={{ duration: 10, repeat: Infinity }}
          >
            Scroll Down
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default GlobeInstructions;
