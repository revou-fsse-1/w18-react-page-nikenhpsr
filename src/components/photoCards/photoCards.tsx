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
    <div className="photocard bg-white p-4 shadow-md flex flex-col transform-gpu transition-transform duration-200 hover:scale-105">
      <div className="relative flex-grow">
        <img
          src={artwork.imgSrc}
          alt=""
          className="object-cover w-full h-full"
        />
        <div className="absolute top-0 right-0 p-2">
          <LikeButton
            initialValue={isLike}
            onLikeChange={handleLikeChange}
            //className="absolute top-2 right-2 z-10"
          />
        </div>
      </div>
      <h4 className="mt-2 text-xl font-semibold">{artwork.name}</h4>
      <p className="mt-1 text-gray-500">{artwork.year}</p>
    </div>
  );
};

export default Photocard;
