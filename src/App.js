// App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LetterPage from "./pages/LetterPage";
import ExpandableVideoPlayer from "./components/ExpandableVideoPlayer";
import { Provider } from "react-redux";
import { store } from "./store";
import ExpandableVideoPlayer_improve from "./components/ExpandableVideoPlayer_improve";

export default function App() {
  const [hasTyped, setHasTyped] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [startTyping, setStartTyping] = useState(false);


   const introMsg = [
    'Happy Birthday Mr. Law!',
    'This is a little gift I have made for you',
    'Click the play button to begin',
    'Hope you will enjoy this!'
  ]

  const [introMsgIndex, setIntroMsgIndex] = useState(0)

  useEffect(() => {
    if (hasTyped) return;

    const interval = setInterval(() => {
      setIntroMsgIndex(prev => {
        if (prev < introMsg.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval); // Stop when done
          return prev;
        }
      });
    }, 2000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [hasTyped]);

  return (
    <Provider store={store}>
    <div className="w-[100vw] h-[100dvh]  overflow-hidden">
       {/* MASK  */}
        <div onClick={()=>{
            if(hasTyped){
              setIsExpanded(false)
            }
        }} style={{
            backgroundColor:"#000",
            opacity:isExpanded ? (hasTyped ? 0.7 : 0.9) : 0,
            zIndex: isExpanded ? 300 : 0,
            transition:'all .2s linear'
        }} className=' w-full  h-full absolute flex  justify-center items-center '>
          {!hasTyped && (
            <div className="animate-shake w-full justify-center items-center text-white text-xl">
              {
                introMsg.map((msg, index)=>(
                  <p key={index}
                  className="absolute w-full flex justify-center items-center px-6"
                  style={{
                    transition:'all .5s linear',
                    opacity: index === introMsgIndex ? 1 : 0
                  }} >{msg}</p>
                ))
              }
            </div>
          )}
        </div>
      <div
        className={`absolute ${isExpanded ? 'right-0':'right-2'} top-0 overflow-hidden   `}
        onClick={()=>{
          if(!isExpanded) setIsExpanded(true)
        }}
       style={{
          zIndex: 999,
          width: isExpanded ? "100dvw": 40,
          transition:'all .2s linear'
        }}>
          <ExpandableVideoPlayer_improve hasTyped={hasTyped} setStartTyping={setStartTyping} isExpanded={isExpanded}  setIsExpanded={setIsExpanded} />
      </div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <MainPage
                startTyping={startTyping}
                hasTyped={hasTyped}
                setHasTyped={setHasTyped}
              />
            }
          />
                
          <Route path="/letter/:id" element={<LetterPage  />} />
        </Routes>
      </Router>
    </div>
    </Provider>
  );
}
