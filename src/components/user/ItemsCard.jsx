import React from 'react';

const LocationPinIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M12 2.25c-3.967 0-7.193 3.226-7.193 7.193 0 3.235 2.19 6.062 5.183 7.025.22.07.453.105.683.105s.463-.035.683-.105c2.993-.963 5.183-3.79 5.183-7.025C19.193 5.476 15.967 2.25 12 2.25zM12 12.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
      clipRule="evenodd"
    />
     <path 
       d="M12 21.75c-3.313 0-6-2.687-6-6V9.412a1.5 1.5 0 01.44-1.06l.94-.94a1.5 1.5 0 012.12 0l1.5 1.5a.75.75 0 001.06 0l1.5-1.5a1.5 1.5 0 012.12 0l.94.94a1.5 1.5 0 01.44 1.06V15.75c0 3.313-2.687 6-6 6z"
    />
  </svg>
);

const StarIcon = ({ className = "w-5 h-5", filled = false }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354l-4.597 2.957c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
      clipRule="evenodd"
    />
  </svg>
);


/**
 * ItemCard Component - A reusable card to display product information.
 * You can save this file as 'ItemCard.jsx' in your 'components' folder.
 * @param {object} props - The properties for the item card.
 * @param {string} props.imageUrl - The URL for the item's image.
 * @param {string} props.category - The category of the item.
 * @param {string} props.itemName - The name of the item.
 * @param {number} props.price - The price of the item.
 * @param {string} props.location - The location of the item.
 * @param {number} props.distance - The distance to the item in km.
 * @param {number} props.rating - The star rating (out of 5).
 * @param {number} props.reviewCount - The number of reviews.
 */
const ItemCard = ({ imageUrl, category, itemName, price, location, distance, rating, reviewCount }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<StarIcon key={i} className={`w-5 h-5 ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`} filled={i <= rating} />);
    }
    return stars;
  };

  return (
    <div className="max-w-xs w-full rounded-lg overflow-hidden shadow-lg bg-white font-sans border border-gray-200">
      {/* Image Section */}
      <div className="relative">
        <div className="bg-gray-200 h-56 w-full flex items-center justify-center">
           <img 
              src={imageUrl} 
              alt={itemName} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/400x400/e2e8f0/cbd5e0?text=Image+Not+Found';
                e.currentTarget.onerror = null; 
              }}
            />
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-4">
        <p className="text-blue-600 text-sm font-semibold">{category}</p>
        <h3 className="text-lg font-bold text-gray-800 mt-1 truncate">{itemName}</h3>
        <p className="text-xl font-extrabold text-gray-900 mt-1">Rs {price.toLocaleString()}</p>
        
        {/* Location Info */}
        <div className="flex items-center text-gray-500 mt-2 text-sm">
          <LocationPinIcon className="w-4 h-4 mr-1.5" />
          <span>{location}</span>
          <span className="mx-1.5 text-gray-300">&bull;</span>
          <span>{distance} km</span>
        </div>
        
        {/* Rating Info */}
        <div className="flex items-center mt-3">
          <div className="flex items-center">
            {renderStars()}
          </div>
          <span className="text-gray-500 ml-2 text-sm">({reviewCount} reviews)</span>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
