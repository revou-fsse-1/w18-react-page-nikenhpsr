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
    setSearchQuery(query);

    const filteredArtworks = artworks.filter((artwork) => {
      const nameMatch = artwork.name
        .toLowerCase()
        .includes(query.toLowerCase());
      const yearMatch = artwork.year.toString().includes(query);
      return nameMatch || yearMatch;
    });

    setSearchResults(filteredArtworks);
  };
  const handleBuyTicket = () => {
    setShowTicketForm(true);
  };

  const handleCloseTicketForm = () => {
    setShowTicketForm(false);
  };

  return (
    <div>
      <h1>Van Gogh Art Gallery</h1>
      <p>You have liked {likeCount} picture(s).</p>
      <SearchBar onSearch={handleSearch} />

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
      <button onClick={handleOpenForm}>Buy Ticket</button>
      {isFormOpen && <TicketForm onClose={handleCloseForm} />}
      {showTicketForm && <TicketForm onClose={handleCloseTicketForm} />}
    </div>
  );
}

export default App;
