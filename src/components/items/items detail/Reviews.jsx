import React, { useContext } from 'react';
import { useReviews } from '../../../hooks/useReview';
import { Star, ThumbsUp } from 'lucide-react';
import ReviewForm from './ReviewForm';
import { AuthContext } from '../../../auth/Authprovider';

const ReviewItem = ({ review }) => {
    const { user_id, rating, comment, createdAt } = review;

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(<Star key={i} size={16} className={i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />);
        }
        return stars;
    };

    return (
        <div className="flex gap-4 py-6 border-b border-gray-200 last:border-b-0">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center font-bold text-gray-500">
                {user_id?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-800">{user_id?.username || 'Anonymous'}</h4>
                    <p className="text-xs text-gray-400">{new Date(createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-1 my-1">{renderStars()}</div>
                <p className="text-sm text-gray-600 leading-relaxed">{comment}</p>
                <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                    <button className="flex items-center gap-1.5 hover:text-blue-600">
                        <ThumbsUp size={14} />
                        Helpful
                    </button>
                    <button className="hover:underline">Reply</button>
                </div>
            </div>
        </div>
    )
}

const Reviews = ({ itemId }) => {
  const { user } = useContext(AuthContext);
  const { reviews, isLoading, error } = useReviews(itemId);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Reviews ({isLoading ? '...' : reviews.length})</h2>
      
      {isLoading && <p className="text-gray-500 py-6 text-center">Loading reviews...</p>}
      {error && <p className="text-red-500 py-6 text-center">Could not load reviews.</p>}
      
      {!isLoading && !error && (
        <div>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <ReviewItem key={review._id} review={review} />
            ))
          ) : (
            <p className="py-8 text-center text-gray-500">No reviews yet. Be the first to leave one!</p>
          )}
        </div>
      )}
      
      
      {user && <ReviewForm itemId={itemId} />}
    </div>
  );
};

export default Reviews;
