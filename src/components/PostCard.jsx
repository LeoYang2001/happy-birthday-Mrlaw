import React from "react";
import { useSelector } from "react-redux";

function PostCard({ card }) {
  const ifChinese = useSelector((state) => state.language.ifChinese);
  return (
    <div
      className="w-full h-full shadow-lg rounded-2xl  overflow-hidden flex flex-col justify-end  p-4 relative"
      style={{
        backgroundImage: `url(${card.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="items-start  rounded-2xl flex flex-col">
        <div className="backdrop-blur-sm bg-white/20 rounded-lg px-3 py-2">
          <h2 className="text-2xl  text-white opacity-80 font-semibold">
            {!ifChinese? card.title : card.title_translated}
          </h2>
          <p className="mt-2  text-white opacity-60">{!ifChinese? card.description : card.description_translated}</p>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
