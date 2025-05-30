// LetterPage.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';


import postcardsData from '../postcards.json';

 const postcards = postcardsData.map(card => ({
    ...card,
    image: require(`../assets/${card.image}`)
  }));


export default function LetterPage() {
  const { id } = useParams();
  const navigate = useNavigate();
    const location = useLocation();
  const card = postcards.find(c => c.id === id);
  const [dragY, setDragY] = useState(0);

  if (!card) return <p>Card not found</p>;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <motion.img
        src={card.image}
        alt={card.title}
        layoutId={`card-${card.id}`}
        className="absolute top-0 left-0 w-full h-[35vh] object-cover z-0"
      />

      <motion.div
        drag="y"
        dragConstraints={{ top: -20, bottom: 20 }}
        dragElastic={0.2}
        onDrag={(_, info) => setDragY(info.point.y)}
        onDragEnd={() => setDragY(0)}
        className="absolute top-[30vh] left-0 right-0 bottom-0 bg-white rounded-t-3xl p-6 z-10 shadow-lg"
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
      >
        <h1 className="text-2xl font-semibold mb-2">{card.title}</h1>
        <p className="text-gray-600 mb-4">{card.message}</p>
        <button
          className="mt-2 text-sm text-blue-500 underline"
       onClick={() => navigate('/', { state: { index: postcards.findIndex(c => c.id === id) } })}
        >
          Go back
        </button>
      </motion.div>
    </div>
  );
}
