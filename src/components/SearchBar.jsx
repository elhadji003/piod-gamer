const SearchBar = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        className="border-b border-gray-600 bg-gray-800 text-white outline-none p-2 w-full"
        placeholder="Rechercher une communauté 🎮"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
