import { useState } from "react";
import LikeButton from "./likeButton";

type PhotoCardProps = {
  name: string;
  year: number;
  imgSrc: string;
  isLike: boolean;
  onLikeChange: (liked: boolean) => void;
};

const Photocard = (artwork: PhotoCardProps) => {
  const [isLike, setIsLike] = useState(artwork.isLike);

  const handleLikeChange = (liked: boolean) => {
    setIsLike(liked);
    artwork.onLikeChange(liked);
  };

  return (
    <>
      <div className="photocard">
        <img src={artwork.imgSrc} alt="" />
        <h4>{artwork.name}</h4>
        <p>{artwork.year}</p>
        <LikeButton initialValue={isLike} onLikeChange={handleLikeChange} />
      </div>
    </>
  );
};

export default Photocard;
