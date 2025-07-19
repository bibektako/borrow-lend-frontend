import React from 'react';
import { ShieldCheck, Calendar } from 'lucide-react';
import { useCreateBorrowRequest } from '../../../hooks/useBorrow'; 
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../auth/Authprovider';


const BookingPanel = ({ item }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { mutate: createBorrowRequest, isPending } = useCreateBorrowRequest();

  const handleBookNow = () => {
    if (!user) {
      navigate('/signin');
      return;
    }
    createBorrowRequest(item._id);
  };
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
      <div className="flex justify-between items-baseline">
        <p className="text-3xl font-extrabold text-gray-900">Rs {item.borrowingPrice?.toFixed(2)}</p>
        <p className="text-sm text-gray-500">per day</p>
      </div>
      <p className="text-xs text-gray-400 mt-1">Original: Rs 85,000</p>
      
      <button 
        onClick={handleBookNow}
        disabled={isPending || item.status !== 'available'}
        className="w-full mt-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isPending ? 'Sending Request...' : (item.status !== 'available' ? 'Unavailable' : 'Book Now')}
      </button>
      <button className="w-full mt-3 py-3 border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-100">
        Add to Wishlist
      </button>

      <div className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-2">
        <ShieldCheck size={14} className="text-green-500" />
        <span>Protected by Borrowlend Guarantee</span>
      </div>
      <p className="text-center text-xs text-gray-400 mt-1">Free cancellation up to 24 hours before pickup</p>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Calendar size={20} />
            Available Dates
        </h3>
        <div className="space-y-3">
            <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                    <p className="font-semibold text-sm">Jan 20, 2025 - Jan 30, 2025</p>
                    <p className="text-xs text-gray-500">10 days available</p>
                </div>
                <button className="px-4 py-1.5 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full hover:bg-blue-200">Select</button>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                    <p className="font-semibold text-sm">Feb 5, 2025 - Feb 15, 2025</p>
                    <p className="text-xs text-gray-500">10 days available</p>
                </div>
                <button className="px-4 py-1.5 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full hover:bg-blue-200">Select</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPanel;
