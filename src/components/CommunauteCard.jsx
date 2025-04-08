const CommunauteCard = ({ nom, membres, profile, onJoin, borderColor }) => {
  return (
    <div
      className={`mb-3 flex items-center gap-4 bg-gray-800 rounded-md p-3 shadow-md hover:bg-gray-700 transition-all duration-200 border ${borderColor}`}
    >
      <img src={profile} alt="Profil" className="w-10 h-10 rounded-full" />
      <div>
        <h4 className="text-white font-semibold">{nom}</h4>
        <span className="text-gray-400 text-sm">
          <span className="font-bold">Membres:</span> {membres}
        </span>
      </div>
      <button
        onClick={onJoin}
        className="ml-auto px-2 py-1 text-white rounded-md hover:bg-white transition-all duration-200"
        aria-label={`Rejoindre la communauté ${nom}`}
      >
        ➕
      </button>
    </div>
  );
};

export default CommunauteCard;
