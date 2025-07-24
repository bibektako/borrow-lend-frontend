import React, { useContext } from "react";
import { getBackendImageUrl } from "../../../utils/backend-image"; // Adjust path if needed
import { Link, useNavigate } from "react-router-dom";
import { useCreateBorrowRequest } from "../../hooks/useBorrow"
import { AuthContext } from "../../auth/Authprovider";
import { MapPin, Star, Heart, CheckCircle, UserCheck } from "lucide-react";

// --- Single Item Card Component ---
const SingleItemCard = ({ item }) => {
  // Destructure all required properties from the item object
  const {
    _id,
    name,
    category,
    borrowingPrice,
    imageUrls,
    location,
    rating = 0, // Default to 0 if not provided
    reviewCount = 0, // Default to 0
    status = 'available', // Default status
    owner,
  } = item;

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { mutate: createBorrowRequest, isPending } = useCreateBorrowRequest();

  // Determine if the current logged-in user is the owner of the item
  const isOwner = user && owner?._id === user._id;

  const handleBorrowClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      navigate("/signin");
      return;
    }
    // Do not allow borrowing if the item is unavailable or if the user is the owner
    if (status !== 'available' || isOwner) return;
    createBorrowRequest(_id);
  };

  const renderStars = () => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"}`}
        fill="currentColor"
      />
    ));
  };

  const getStatusPill = () => {
    const statusMap = {
      available: { text: "Available", bg: "bg-green-100", text_color: "text-green-800", icon: <CheckCircle size={14}/> },
      borrowed: { text: "Borrowed", bg: "bg-red-100", text_color: "text-red-800", icon: null },
      requested: { text: "Requested", bg: "bg-yellow-100", text_color: "text-yellow-800", icon: null },
    };
    const currentStatus = statusMap[status] || statusMap.borrowed;

    return (
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full ${currentStatus.bg} ${currentStatus.text_color}`}>
            {currentStatus.icon}
            {currentStatus.text}
        </div>
    );
  };

  return (
    <Link to={`/item/${_id}`} className="block group w-full">
      <div className="relative flex flex-col h-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative h-52 w-full">
          <img
            src={getBackendImageUrl(imageUrls?.[0])}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            onError={(e) => { e.currentTarget.src = "https://placehold.co/400x400/e2e8f0/cbd5e0?text=Image+Not+Found"; }}
          />
          {/* Top-right badges and buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {isOwner && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    <UserCheck size={14}/> Your Item
                </div>
            )}
            {!isOwner && getStatusPill()}
          </div>
          {/* Wishlist Button */}
          <button className="absolute top-3 left-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:text-red-500 transition-colors"
            onClick={(e) => { e.preventDefault(); alert('Added to wishlist!'); }}>
            <Heart size={16} />
          </button>
        </div>

        {/* Content Container */}
        <div className="p-4 flex flex-col flex-grow">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">{category?.name || "Uncategorized"}</p>
          <h3 className="text-md font-bold text-gray-900 mt-1 truncate" title={name}>{name}</h3>

          <div className="flex items-center text-gray-500 mt-2 text-sm">
            <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0 text-gray-400" />
            <span className="truncate">{location || "Not specified"}</span>
          </div>

          <div className="flex items-center mt-3">
            <div className="flex items-center">{renderStars()}</div>
            <p className="text-gray-500 ml-2 text-xs">
              ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
            </p>
          </div>

          {/* This spacer pushes the footer to the bottom */}
          <div className="flex-grow"></div> 

          {/* Card Footer */}
          <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-100">
            <p className="text-lg font-bold text-gray-900">
              ${borrowingPrice?.toFixed(2)}
              <span className="text-sm font-normal text-gray-500">/day</span>
            </p>
            <button
              onClick={handleBorrowClick}
              disabled={isPending || status !== 'available' || isOwner}
              className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isPending ? 'Requesting...' : 'Borrow'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};


// --- Item Grid Component ---
// This component receives an array of items and maps them to the SingleItemCard.
const ItemCard = ({ items }) => {
  if (!items || items.length === 0) {
    return <p className="col-span-full text-center text-gray-500">No items found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <SingleItemCard key={item._id} item={item} />
      ))}
    </div>
  );
};

export default ItemCard;