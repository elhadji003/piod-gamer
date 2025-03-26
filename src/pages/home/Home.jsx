import React, { useState } from "react";
import img from "../../assets/images/image-1.avif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import CardInfos from "../../components/CardInfos";
import { motion } from "framer-motion";
import Temoigne from "../../components/Temoigne";
import Modal from "../../components/Modal";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const isOpenModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-black min-h-screen">
      {/* Titre principal avec animation */}
      <div className="md:flex items-center justify-around sm:flex">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="uppercase text-pink-500 text-center text-4xl font-extrabold py-10"
        >
          Gaming{" "}
          <span className="text-white tracking-wider animate-pulse">Zone</span>
          <FontAwesomeIcon
            icon={faGamepad}
            className="ms-5 text-4xl text-pink-500 hover:text-white transition-colors duration-300"
          />
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="uppercase text-center text-xl font-extrabold py-10 space-x-4"
        >
          <Link
            to={"/login"}
            className="text-white hover:bg-pink-500 p-2 rounded-md transition-colors duration-300"
          >
            Se connecter
          </Link>
          <Link to={"/login"} className="text-white bg-pink-500 p-2 rounded-md">
            S'inscrire
          </Link>
          <button className="text-white" onClick={isOpenModal}>
            X
          </button>
        </motion.h1>
      </div>

      {/* Contenu texte + image avec animation */}
      <div className="flex flex-col md:flex-row justify-around items-center pb-10 gap-8 px-4">
        {/* Texte résumé + bouton */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative text-white p-6 rounded-lg shadow-xl max-w-xl border-2 border-pink-500 animate-glow bg-white/5 backdrop-blur-sm"
        >
          <p className="text-base leading-relaxed tracking-wide">
            <span className="text-xl font-bold text-pink-500 max-xs:text-sm max-sm:ms-5">
              Rejoins la communauté des vrais gamers
            </span>{" "}
            <br />
            <br />
            Partage ta passion, fais des échanges, ou défie d'autres joueurs
            dans un esprit de{" "}
            <span className="text-pink-400 font-semibold">respect</span> et de{" "}
            <span className="text-pink-400 font-semibold">fair-play</span>. Ici,
            le jeu devient une expérience sociale unique.
            <br />
            <br />
            <span className="text-pink-400 font-semibold">
              Achète, vends, joue et connecte-toi
            </span>{" "}
            avec des passionnés comme toi !
          </p>

          {/* Bouton Login */}
          <div className="mt-6">
            {/* <Link to="/features"> */}
            <button className="border border-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-full shadow-md transition-transform hover:scale-105">
              Voir plus ...
            </button>
            {/* </Link> */}
          </div>
        </motion.div>

        {/* Image gaming */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="rounded-md shadow-lg hover:scale-105 transition-transform duration-500"
        >
          <img
            src={img}
            alt="Gaming Community"
            className="w-90 h-auto rounded-md object-cover"
          />
        </motion.div>
      </div>

      {/* Statistiques */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-center text-3xl md:text-4xl text-pink-500 font-extrabold uppercase tracking-wider mb-8"
      >
        Statistiques de la{" "}
        <span className="text-white animate-pulse">Communauté</span>
      </motion.h2>

      <CardInfos />

      <Temoigne />

      <Modal isOpen={isOpen} isClose={isOpenModal} />

      <footer className="text-center text-white text-sm py-4 border-t border-pink-500 mt-10">
        © 2025 Gaming Zone. Tous droits réservés.
      </footer>
    </div>
  );
};

export default Home;
