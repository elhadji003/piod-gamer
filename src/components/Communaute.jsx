import React, { useState } from "react";
import profileCom from "../assets/images/manette.jpg";
import SearchBar from "../components/SearchBar";
import CommunauteCard from "../components/CommunauteCard";
import BoutonCreation from "../components/ButtonCreation";
import { toast } from "react-toastify";

const Communaute = () => {
  const [searchCom, setSearchCom] = useState("");

  const communautes = [
    { nom: "Akatsuki", membres: 23, profile: profileCom },
    { nom: "Ghost-Devil", membres: 15, profile: profileCom },
    { nom: "Shadow Ninjas", membres: 30, profile: profileCom },
  ];

  const communautesARejoindre = [
    { nom: "Game Legends", membres: 42, profile: profileCom },
    { nom: "Justice League", membres: 120, profile: profileCom },
    { nom: "Legends Never Die", membres: 32, profile: profileCom },
  ];

  const borderColors = [
    "border-red-500",
    "border-green-500",
    "border-blue-500",
    "border-yellow-500",
    "border-purple-500",
    "border-pink-500",
    "border-cyan-500",
  ];

  const handleSearchCom = (e) => setSearchCom(e.target.value);

  const handleRejoindre = (nom) => {
    alert(`Voulez-vous rejoindre la communauté ${nom} ?`);
  };

  const handleCreerCommu = () => {
    toast.warning("Cette fonctionnalitée n'est pas encore disponible !");
  };

  const filteredCommunautes = communautes.filter((communaute) =>
    communaute.nom.toLowerCase().includes(searchCom.toLowerCase())
  );

  return (
    <div>
      <SearchBar value={searchCom} onChange={handleSearchCom} />

      <div>
        <h2 className="text-gray-500 text-sm my-3">
          Vous pouvez rejoindre ces communautés
        </h2>
        {filteredCommunautes.length > 0 ? (
          filteredCommunautes.map((communaute, index) => (
            <CommunauteCard
              key={index}
              nom={communaute.nom}
              membres={communaute.membres}
              profile={communaute.profile}
              onJoin={() => handleRejoindre(communaute.nom)}
              borderColor={borderColors[index % borderColors.length]}
            />
          ))
        ) : (
          <p className="text-gray-400 text-center">
            Aucune communauté de ce nom trouvée 😕
          </p>
        )}
      </div>

      <BoutonCreation onclick={handleCreerCommu} />

      {communautesARejoindre.map((com, index) => (
        <CommunauteCard
          key={index}
          nom={com.nom}
          membres={com.membres}
          profile={com.profile}
          onJoin={() => handleRejoindre(com.nom)}
          borderColor="border-sky-500"
        />
      ))}
    </div>
  );
};

export default Communaute;
