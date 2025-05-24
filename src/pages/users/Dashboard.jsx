import React, { useState } from "react";
import { FaBell, FaPlusCircle, FaMinus } from "react-icons/fa";
import Carousel from "../../components/Carousel";
import Diagram from "../../components/Diagram";
import Notifs from "../../components/Notifs";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { useGetBlogPostsQuery } from "../../features/blogsApp/blogsApi";

const Dashboard = () => {
  const handleModalAmis = () => {
    alert("Fonctionnalité nos disponbles !");
  };

  const { data } = useGetBlogPostsQuery();
  const likesCounts = data?.results?.likes_count;

  console.log("Like :", likesCounts);

  const handleSeenMessage = () => {
    alert("Fonctionnalité nos disponbles !");
  };

  const [seeModalNotif, setSeeModalNotif] = useState(false);
  const [notifAnimation, setNotifAnimation] = useState("");

  const handleSeeNotif = () => {
    if (!seeModalNotif) {
      setNotifAnimation("animate__backInDown");
      setSeeModalNotif(true);
    } else {
      setNotifAnimation("animate__backOutUp");

      // Attendre la fin de l'animation avant de masquer la modal
      setTimeout(() => {
        setSeeModalNotif(false);
      }, 500); // Ajustez selon la durée de l'animation
    }
  };

  const [voirPlusAmis, SetVoirPlusAmis] = useState(false);
  const amis = [
    { id: 1, name: "DarkKnight", onLine: true },
    { id: 2, name: "ShadowSlayer", onLine: true },
    { id: 3, name: "MysticWolf", onLine: true },
    { id: 4, name: "CyberNinja", onLine: false },
    { id: 5, name: "GhostRider", onLine: false },
    { id: 6, name: "SkyWalker", onLine: false },
  ];

  const displayedFriends = voirPlusAmis ? amis : amis.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col p-6">
      <header className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
        <div className="bg-gray-900 p-2 rounded-md">
          <Link
            to={"/create-post"}
            className="flex items-center gap-3 font-bold uppercase"
          >
            <span className="max-sm:hidden">Créer un post</span>{" "}
            <FaPlusCircle />{" "}
          </Link>
        </div>
        <div className="bg-gray-900 ps-3 pr-3 p-2 rounded-full">
          <button onClick={handleSeeNotif} className="">
            <FaBell />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6 mt-6 max-sm:grid-cols-6">
        <div className="col-span-3 max-sm:col-span-6 bg-gray-800 p-4 rounded-lg">
          <span>
            <h2 className="text-center text-lg font-bold mt-2">Followers</h2>
            <p className="text-center text-sm text-gray-400 bg-gray-700 p-2 rounded-md shadow-md">
              1k | followers
            </p>
          </span>

          <span>
            <h2 className="text-center text-lg font-bold mt-2">Amis</h2>
            <p
              onClick={handleModalAmis}
              className="text-center text-sm text-gray-400  bg-gray-700 p-2 rounded-md shadow-md cursor-pointer"
            >
              {likesCounts} | amis
            </p>
          </span>

          <span>
            <h2 className="text-center text-lg font-bold mt-2">Likes</h2>
            <p className="text-center text-sm text-gray-400 bg-gray-700 p-2 rounded-md shadow-md">
              20k | Likes 🔥
            </p>
          </span>
        </div>

        <div className="col-span-6 bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-center drop-shadow-neonWhite">
            Fil d'actualité
          </h2>
          <Carousel />
        </div>

        <div className="col-span-3 max-sm:col-span-6 bg-gray-800 p-4 rounded-lg">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold mb-4">Amis en ligne</h2>
            <div className="text-center">
              {amis.length > 5 && (
                <button
                  onClick={() => SetVoirPlusAmis(!voirPlusAmis)}
                  className="mt-2 text-blue-400 hover:underline"
                >
                  {voirPlusAmis ? <FaMinus /> : <FaPlusCircle />}
                </button>
              )}
            </div>
          </div>
          <ul>
            {displayedFriends.map((amis) => (
              <li
                key={amis.id}
                className="flex items-center justify-between gap-2 mb-2"
              >
                {amis ? (
                  amis.onLine ? (
                    <span className="relative flex size-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span>
                    </span>
                  ) : (
                    <span className="relative flex size-3">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex size-3 rounded-full bg-red-500"></span>
                    </span>
                  )
                ) : (
                  <span>Chargement...</span>
                )}
                <p>{amis.name}</p>
                <div>
                  <button onClick={handleSeenMessage}>
                    <FontAwesomeIcon icon={faMessage} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="diagram bg-gray-900 rounded-md max-sm:hidden">
        <Diagram />
      </div>

      {seeModalNotif && (
        <div
          className={`fixed inset-0 p-4 z-50 animate__animated ${notifAnimation}`}
        >
          <Notifs isOpen={seeModalNotif} isClose={handleSeeNotif} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
