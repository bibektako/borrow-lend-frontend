import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useItemById } from '../hooks/useItem'
import Header from '../layouts/Header';
import ImageGallery from '../components/items/items detail/imageGallery';
import ItemInfo from '../components/items/items detail/itemsInfo';
import OwnerInfo from '../components/items/items detail/ownerInfo';
import BookingPanel from '../components/items/items detail/BookingPanel';
import Reviews from '../components/items/items detail/Reviews';
import { ArrowLeft } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ItemDetailPage = () => {
  const { id } = useParams();
  const { item, isLoading, error } = useItemById(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-gray-600 animate-pulse">Loading item details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600">Error</h2>
            <p className="text-red-500 mt-2">{error.message || 'Failed to fetch item details.'}</p>
            <Link to="/browse" className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg">
                Back to Browse
            </Link>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-700">Item Not Found</h2>
            <p className="text-gray-500 mt-2">The item you are looking for does not exist or may have been removed.</p>
            <Link to="/browse" className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg">
                Back to Browse
            </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/browse" className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900">
            <ArrowLeft size={16} />
            Back to all items
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8">
            <ImageGallery imageUrls={item.imageUrls} itemName={item.name} />
            <ItemInfo item={item} />
            <Reviews itemId={item._id} />
          </div>

          <div className="lg:col-span-1 space-y-8">
            <OwnerInfo owner={item.owner} />
            <BookingPanel item={item} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ItemDetailPage;
