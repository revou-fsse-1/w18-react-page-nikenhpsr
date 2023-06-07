import { useState } from "react";
import "./App.css";
import { Artwork } from "./components/artwork";
import Photocard from "./components/photoCards/photoCards";
import artworksData from "./artworks.json";

function App() {
  const artworks: Artwork[] = artworksData;
  const [likedArtworkCount, setLikedArtworkCount] = useState(0);

  const handleLikeChange = (liked: boolean) => {
    setLikedArtworkCount((prevCount) => prevCount + (liked ? 1 : -1));
  };

  return (
    <div>
      <h1>Van Gogh Art Gallery</h1>
      <h2>Find Your Favorite Van Gogh's Pieces</h2>
      <p>You have liked {likedArtworkCount} pictures.</p>
      {artworks.map((artwork) => (
        <Photocard
          key={artwork.id}
          name={artwork.name}
          year={artwork.year}
          imgSrc={artwork.imgSrc}
          onLikeChange={handleLikeChange}
          isLike={false}
        />
      ))}
    </div>
  );
}

export default App;
