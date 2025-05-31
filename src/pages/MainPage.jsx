// MainPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useAnimation,
} from "framer-motion";
import IntroVideoPlayer from "../components/IntroVideoPlayer";
import foxWallpaper from "../assets/fox.png";
import postcardsData from "../postcards.json";
import PostCard from "../components/PostCard";
import { useLocation } from "react-router-dom";
import { ArrowDown } from "lucide-react";
import config from "../configuration.json";

const postcards = postcardsData.map((card) => ({
  ...card,
  image: require(`../assets/${card.image}`),
}));

const SCREEN_WIDTH = window.screen.width;
const SCROLL_OFFSET = 0;

export default function MainPage() {
  const [videoCollapsed, setVideoCollapsed] = useState(true); // for demo use
  const [typedGreeting, setTypedGreeting] = useState("");

  useEffect(() => {
    const fullMessage = config.greetingMessage;
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullMessage.length) {
        setTypedGreeting((prev) => prev + fullMessage.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 40); // Adjust speed here
    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();
  const x = useMotionValue(0);
  const controls = useAnimation();
  const containerRef = useRef(null);

  const location = useLocation();
  const initialIndex = location.state?.index || 0;

  useEffect(() => {
    controls.start({
      x: -initialIndex * (SCREEN_WIDTH * 0.9 + SCROLL_OFFSET),
      transition: { type: "spring", stiffness: 300, damping: 30 },
    });
  }, []);

  const handleIntroEnd = () => {
    setVideoCollapsed(true);
  };
  const openCard = (id, index) => {
    navigate(`/letter/${id}`, { state: { index } });
  };

  const handleDragEnd = (_, info) => {
    const width = containerRef.current?.offsetWidth || 0;
    const cardWidth = 0.9 * width;
    const index = Math.round(-x.get() / cardWidth);
    const clampedIndex = Math.max(0, Math.min(postcards.length - 1, index));
    controls.start({
      x: -clampedIndex * (SCREEN_WIDTH * 0.9 + SCROLL_OFFSET),
      transition: { type: "spring", stiffness: 300, damping: 30 },
    });
  };
  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100dvh",
        backgroundColor: config.themeColor,
      }}
      className="main-page  flex flex-col  "
    >
      <div
        className="  absolute  w-28 h-16"
        style={{
          backgroundImage: `url(${foxWallpaper})`,
          backgroundSize: "50%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          top: "100%",
          left: "50%",
          transform: "translateY(-100%) translateX(-50%)",
        }}
      />
      {/* <IntroVideoPlayer onIntroEnd={handleIntroEnd} /> */}
      {/* HEADER  */}
      <div
        className=" flex flex-col   items-center px-12 "
        style={{ minHeight: "350px" }}
      >
        <p
          style={{}}
          className=" text-md font-semibold text-white mt-6 opacity-50"
        >
          For {config.recipient}
        </p>
        <p className=" text-lg  text-white mt-2 opacity-80">{typedGreeting}</p>

        <h2 className="page-title mt-auto border px-2 py-1  bg-white  font-semibold opacity-60 rounded-full flex flex-row items-center">
          <ArrowDown size={18} className=" mr-1" />
          {config.ctaLabel}
        </h2>
      </div>
      <AnimatePresence>
        {true && (
          <motion.div
            className="gallery-section  flex flex-col"
            style={{ flexGrow: 1, minHeight: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              ref={containerRef}
              className="card-scroll-container w-full  flex-1  flex flex-col  overflow-hidden"
            >
              <motion.div
                className="card-drag-row  flex-1  "
                drag="x"
                style={{
                  x,
                  display: "flex",
                  gap: `${SCROLL_OFFSET}px`,
                  cursor: "grab",
                }}
                onDragEnd={handleDragEnd}
                animate={controls}
              >
                {postcards.map((card, index) => (
                  <motion.div
                    key={card.id}
                    layoutId={`card-${card.id}`}
                    className="postcard-card   flex flex-col  px-4 py-4 pb-24"
                    onClick={() => openCard(card.id, index)}
                    whileTap={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{ width: "90vw", flexShrink: 0 }}
                  >
                    <PostCard card={card} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
