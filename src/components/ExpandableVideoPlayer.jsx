import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Piano, Play } from "lucide-react";

export default function ExpandableVideoPlayer({
  isExpanded,
  setIsExpanded,
  setStartTyping,
}) {
  const [isMuted, setIsMuted] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef(null);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleStart = (e) => {
    e.stopPropagation();
    videoRef.current?.play();
    setHasStarted(true);
    setIsMuted(false);
    setTimeout(() => {
      setIsExpanded(false);
      setStartTyping(true);
    }, 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        layoutId="piano-video"
        onClick={handleToggle}
        className={`cursor-pointer z-10 overflow-hidden relative transition-all duration-500 ${
          isExpanded && "h-[100vh]"
        }`}
        style={{ margin: isExpanded ? 0 : "1rem auto" }}
      >
        {!isExpanded && (
          <div className="bg-white opacity-60 flex justify-center items-center absolute right-2 top-2 w-10 h-10 rounded-full">
            <Piano />
          </div>
        )}

        <video
          ref={videoRef}
          src={require("../assets/piano.mov")}
          className={`w-full h-full ${
            isExpanded ? "object-contain bg-black" : "object-cover"
          }`}
          loop
          style={{
            opacity: isExpanded ? 1 : 0,
          }}
          muted={isMuted}
        />

        {!hasStarted && isExpanded && (
          <button
            onClick={handleStart}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-white text-black rounded-full p-4 shadow-lg"
          >
            <Play className="w-6 h-6" />
          </button>
        )}

        {isExpanded && hasStarted && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMuted((prev) => !prev);
            }}
            className="absolute top-4 right-4 z-20 bg-white rounded-full px-3 py-1 text-sm font-semibold"
          >
            {isMuted ? "Unmute" : "Mute"}
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
