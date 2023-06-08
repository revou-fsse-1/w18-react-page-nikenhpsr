import { useState } from "react";
import "./App.css";
import { Artwork } from "./components/artwork";
import Photocard from "./components/photoCards/photoCards";
import SearchBar from "./components/searchBar/searchBar";
import artworksData from "./artworks.json";
import TicketForm from "./components/ticketForm/ticketForm";

function App() {
  const artworks: Artwork[] = artworksData;
  const [likeCount, setLikeCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Artwork[]>(artworks);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleLikeChange = (liked: boolean) => {
    setLikeCount((prevCount) => (liked ? prevCount + 1 : prevCount - 1));
  };

  const handleSearch = (query: string) => {
    const filteredArtworks = artworks.filter((artwork) => {
      const nameMatch = artwork.name
        .toLowerCase()
        .includes(query.toLowerCase());
      const yearMatch = artwork.year.toString().includes(query);
      return nameMatch || yearMatch;
    });

    searchQuery;
    setSearchQuery(query);
    setSearchResults(filteredArtworks);
  };

  const handleCloseTicketForm = () => {
    setShowTicketForm(false);
  };

  return (
    <div className="container mx-auto p-4 lg:max-w-4xl xl:max-w-5xl">
      <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4">Van Gogh Art Gallery</h2>
      <p className="mb-4">You have liked {likeCount} picture(s).</p>
      <SearchBar onSearch={handleSearch} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {searchResults.map((artwork) => (
          <Photocard
            key={artwork.name}
            name={artwork.name}
            year={artwork.year}
            imgSrc={artwork.imgSrc}
            onLikeChange={handleLikeChange}
            isLike={false}
          />
        ))}
      </div>

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded text-base md:text-lg lg:text-xl xl:text-2xl"
        onClick={handleOpenForm}
      >
        Buy Ticket
      </button>
      {isFormOpen && <TicketForm onClose={handleCloseForm} />}
      {showTicketForm && <TicketForm onClose={handleCloseTicketForm} />}
    </div>
  );
}

export default App;
