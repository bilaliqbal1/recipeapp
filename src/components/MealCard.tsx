import React from "react";

interface MealCardProps {
  name: string;
  imageUrl: string;
  instructions: string;
  rating: number;
  onOpenModal: () => void;
}

const MealCard: React.FC<MealCardProps> = ({
  name,
  imageUrl,
  instructions,
  rating,
  onOpenModal,
}) => {
  return (
    <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
      <img className="w-full h-48 object-cover" src={imageUrl} alt={name} />
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{name}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-4">
          {instructions}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-yellow-500 font-semibold">
            Rating: {rating} / 5
          </span>
          <button
            onClick={onOpenModal}
            className=" text-black px-4 py-2 rounded-lg shadow-md transition duration-200 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 p-4"
          >
            Add to Week
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
