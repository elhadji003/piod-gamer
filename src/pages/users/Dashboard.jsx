import React from "react";
import {
  FaGamepad,
  FaUsers,
  FaShoppingCart,
  FaBell,
  FaTrophy,
} from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col p-6">
      {/* Header */}
      <header className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gaming Zone - Ami Flow Grade 🎮</h1>
        <div className="flex gap-4">
          <FaBell className="text-xl cursor-pointer hover:text-yellow-500" />
          <FaShoppingCart className="text-xl cursor-pointer hover:text-green-500" />
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-6 mt-6">
        {/* Profil Utilisateur */}
        <div className="col-span-3 bg-gray-800 p-4 rounded-lg">
          <img
            src="https://via.placeholder.com/100"
            alt="Avatar"
            className="w-24 h-24 rounded-full mx-auto"
          />
          <h2 className="text-center text-lg font-bold mt-2">PseudoGamer</h2>
          <p className="text-center text-sm text-gray-400">
            Niveau 25 | XP: 12,345
          </p>
          <button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 p-2 rounded-lg">
            Modifier Profil
          </button>
        </div>

        {/* Fil d'actualité */}
        <div className="col-span-6 bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Fil d'actualité</h2>
          <div className="p-2 bg-gray-700 rounded-lg mb-2">
            <p>
              <strong>GamerX</strong> a débloqué un nouveau succès ! 🏆
            </p>
            <span className="text-sm text-gray-400">Il y a 10 min</span>
          </div>
          <div className="p-2 bg-gray-700 rounded-lg">
            <p>
              <strong>ProGamer99</strong> vend une manette édition limitée ! 🎮
            </p>
            <span className="text-sm text-gray-400">Il y a 30 min</span>
          </div>
        </div>

        {/* Liste d'amis */}
        <div className="col-span-3 bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Amis en ligne</h2>
          <ul>
            <li className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <p>DarkKnight</p>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <p>ShadowSlayer</p>
            </li>
          </ul>
        </div>
      </div>

      {/* Section Défis et Boutique */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-4">
          <FaTrophy className="text-3xl text-yellow-500" />
          <p>Défie un joueur et prouve ta valeur !</p>
          <button className="ml-auto bg-red-600 hover:bg-red-700 p-2 rounded-lg">
            Lancer un défi
          </button>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-4">
          <FaShoppingCart className="text-3xl text-green-500" />
          <p>Achetez ou échangez des objets gaming</p>
          <button className="ml-auto bg-blue-600 hover:bg-blue-700 p-2 rounded-lg">
            Accéder à la boutique
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
