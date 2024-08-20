type SearchBarProps = {
  onSearch: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value); // Trigger search on each input change
  };

  return (
    <input
      type="text"
      placeholder="Rechercher des documents..."
      onChange={handleInputChange}
      className="w-full p-2 border border-gray-300 rounded-lg"
    />
  );
};

export default SearchBar;
