import React from "react";

const Notifs = ({ isOpen, isClose }) => {
  if (!isOpen) return null;

  return (
    <div className="bg-gray-100 p-4 text-black max-w-xl m-auto rounded-md">
      <button onClick={isClose} className="text-white hover:text-red-400">
        ✖
      </button>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa doloremque,
      aperiam velit non similique enim. Perferendis, dolores doloribus totam
      beatae doloremque inventore odio dolorem exercitationem? Qui tempore
      dolore error atque eos id, fugit magni ad odio obcaecati nulla voluptas
      alias enim? Tempora cumque architecto dicta, assumenda dignissimos
      officiis nam doloremque dolor facilis ducimus? Quasi amet neque autem iure
      id consequuntur molestias deleniti ratione laudantium, et voluptas
      aspernatur iste, voluptatibus ipsa facere fugit aliquid excepturi ipsum
      incidunt. Eos doloribus nostrum, consequuntur qui, magni quisquam iste
      quidem commodi dolore debitis modi aspernatur odit quia numquam alias odio
      ea. Voluptates dolor ducimus corrupti.
    </div>
  );
};

export default Notifs;
