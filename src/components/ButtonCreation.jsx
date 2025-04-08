const BoutonCreation = ({ onclick }) => {
  return (
    <button
      onClick={onclick}
      className="bg-sky-500 p-2 rounded-md shadow shadow-sky-500 my-5"
    >
      Créer une communauté gaming
    </button>
  );
};

export default BoutonCreation;
