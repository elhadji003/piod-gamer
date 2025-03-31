import React, { useState } from "react";
import profileCom from "../assets/images/manette.jpg";

const Communaute = () => {
  const communautes = [
    { nom: "Akatsuki", membres: 23, profile: profileCom },
    { nom: "Ghost-Devil", membres: 15, profile: profileCom },
    { nom: "Shadow Ninjas", membres: 30, profile: profileCom },
    { nom: "Game Legends", membres: 42, profile: profileCom },
    { nom: "Justice League", membres: 120, profile: profileCom },
    { nom: "Legends Never Die", membres: 32, profile: profileCom },
  ];

  const [searchCom, setSearchCom] = useState("");

  // ✅ Mettre à jour la recherche
  const handleSearchCom = (e) => {
    setSearchCom(e.target.value);
  };

  // ✅ Filtrer les communautés selon la recherche
  const filteredCommunautes = communautes.filter((communaute) =>
    communaute.nom.toLowerCase().includes(searchCom.toLowerCase())
  );

  const borderColors = [
    "border-red-500",
    "border-green-500",
    "border-blue-500",
    "border-yellow-500",
    "border-purple-500",
    "border-pink-500",
    "border-cyan-500",
  ];

  const handleRejoindre = (nom) => {
    alert(`Voulez-vous rejoindre la communauté ${nom} ?`);
  };

  return (
    <div>
      {/* ✅ Barre de recherche fonctionnelle */}
      <div className="mb-4">
        <input
          type="text"
          className="border-b border-gray-600 bg-gray-800 text-white outline-none p-2 w-full"
          placeholder="Rechercher une communauté 🎮"
          value={searchCom}
          onChange={handleSearchCom} // ✅ Ajout de la fonction de recherche
        />
      </div>

      {/* ✅ Liste filtrée des communautés */}
      <div>
        {filteredCommunautes.length > 0 ? (
          filteredCommunautes.map((communaute, index) => {
            const borderStyle = borderColors[index % borderColors.length];

            return (
              <div
                key={index}
                className={`mb-3 flex items-center gap-4 bg-gray-800 rounded-md p-3 shadow-md hover:bg-gray-700 transition-all duration-200 border ${borderStyle}`}
              >
                {/* Image de profil */}
                <img
                  src={communaute.profile}
                  alt="Profil"
                  className="w-10 h-10 rounded-full"
                />

                {/* Infos de la communauté */}
                <div>
                  <h4 className="text-white font-semibold">{communaute.nom}</h4>
                  <span className="text-gray-400 text-sm">
                    <span className="font-bold">Membres: </span>{" "}
                    {communaute.membres}
                  </span>
                </div>

                {/* Bouton Rejoindre */}
                <button
                  onClick={() => handleRejoindre(communaute.nom)}
                  className="ml-auto px-2 py-1 text-white rounded-md hover:bg-white transition-all duration-200"
                >
                  ➕
                </button>
              </div>
            );
          })
        ) : (
          <p className="text-gray-400 text-center">
            Aucune communauté trouvée 😕
          </p>
        )}
      </div>
    </div>
  );
};

export default Communaute;
