import React from 'react'

function PostCard({card}) {
  return (
   <div className=' w-full h-full bg-white  rounded-2xl border overflow-hidden p-4'>
    <h2 className=' text-2xl opacity-60'>
        {card.title}
    </h2>
                      <img  src={card.image} alt={card.title} className="card-image w-full rounded-2xl my-2" />
                      <p>{card.description}</p>
                    </div>
  )
}

export default PostCard