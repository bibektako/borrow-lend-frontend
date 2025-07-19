import React, { useContext } from "react";
import { getBackendImageUrl } from "../../../utils/backend-image";
import { Link, useNavigate } from "react-router-dom";
import { useCreateBorrowRequest } from "../../hooks/useBorrow"; // Adjust path
import { AuthContext } from "../../auth/Authprovider"; // Adjust path

const LocationPinIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 005.16-4.057l-1.18-1.18a15.475 15.475 0 01-4.022 3.055l-2.296 1.532a1.125 1.125 0 01-1.344 0l-2.296-1.532a15.475 15.475 0 01-4.022-3.055l-1.18 1.18a16.975 16.975 0 005.16 4.057l.071.041zM12 1.5a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5z"
      clipRule="evenodd"
    />
    <path d="M12 12.75a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
  </svg>
);

const StarIcon = ({ className = "w-5 h-5", filled = false }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.612.049.864.86.42 1.28l-4.096 3.986a.562.562 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 21.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.096-3.986c-.444-.42-.192-1.23.42-1.28l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
    />
  </svg>
);

const SingleItemCard = ({ item }) => {
  const {
    _id,
    name,
    category,
    borrowingPrice,
    imageUrls,
    location,
    rating,
    reviewCount,
  } = item;

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { mutate: createBorrowRequest, isPending } = useCreateBorrowRequest();

  const handleBorrowClick = (e) => {
    e.preventDefault(); // Prevent navigating to the detail page
    e.stopPropagation(); // Stop the event from bubbling up to the Link
    if (!user) {
      navigate("/signin");
      return;
    }
    createBorrowRequest(_id);
  };

  const renderStars = () => {
    const stars = [];
    const itemRating = rating || 0;
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <StarIcon
          key={i}
          className={`w-4 h-4 ${
            i <= itemRating ? "text-yellow-400" : "text-gray-300"
          }`}
          filled={i <= itemRating}
        />
      );
    }
    return stars;
  };

  return (
    <Link to={`/item/${_id}`} className="block group">
      <div className="w-full rounded-2xl overflow-hidden bg-white font-sans border border-gray-200 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
        <div className="relative h-56 w-full">
          <img
            src={getBackendImageUrl(imageUrls?.[0])}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/400x400/e2e8f0/cbd5e0?text=Image+Not+Found";
              e.currentTarget.onerror = null;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4">
            <span className="bg-black/50 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {category?.name || "Uncategorized"}
            </span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 truncate">{name}</h3>

          <div className="flex items-center text-gray-500 mt-2 text-sm">
            <LocationPinIcon className="w-4 h-4 mr-1.5 flex-shrink-0 text-gray-400" />
            <span className="truncate">{location || "Thimi, Bhaktapur"}</span>
          </div>

          <div className="flex items-center mt-3">
            <div className="flex items-center space-x-0.5">{renderStars()}</div>
            <span className="text-gray-500 ml-2 text-xs">
              ({reviewCount || 0} reviews)
            </span>
          </div>

          <div className="flex justify-between items-end mt-4">
            <p className="text-xl font-extrabold text-gray-900">
              ${borrowingPrice?.toFixed(2)}
              <span className="text-sm font-medium text-gray-500">/day</span>
            </p>
            <button
              onClick={handleBorrowClick}
              disabled={isPending || status !== "available"}
              className="px-4 py-1.5 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
            >
              {isPending
                ? "Requesting..."
                : status !== "available"
                ? "Unavailable"
                : "Borrow"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

const ItemCard = ({ items }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <SingleItemCard key={item._id} item={item} />
      ))}
    </div>
  );
};

export default ItemCard;
