import React from 'react';
import { useBookmarks } from '../hooks/useBookmarks';
import ItemCard from '../components/user/ItemsCard';
import { Loader, HeartCrack } from 'lucide-react';

const BookmarksPage = () => {
    const { bookmarks, isLoading } = useBookmarks();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader className="animate-spin text-blue-500" size={48} />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">My Wishlist</h1>
            <p className="text-gray-600 mb-8">Items you've saved for later.</p>

            {bookmarks && bookmarks.length > 0 ? (
                <ItemCard items={bookmarks} />
            ) : (
                <div className="text-center py-16">
                    <HeartCrack size={64} className="mx-auto text-gray-400" />
                    <h2 className="mt-4 text-xl font-semibold text-gray-700">Your wishlist is empty.</h2>
                    <p className="mt-2 text-gray-500">Click the heart icon on any item to save it here.</p>
                </div>
            )}
        </div>
    );
};

export default BookmarksPage;
