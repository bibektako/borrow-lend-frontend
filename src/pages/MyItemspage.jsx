import React, { useState, useEffect, useCallback } from 'react';
import { getMyItemsApi, deleteItemApi } from '../api/itemAPI';
import { getCategoriesApi } from '../api/admin/categoryAPI'
import UserItemCard from '../components/user/User_Items_card';
import ItemModal from '../components/items/ItemModel';
import Header from '../layouts/Header';

const MyItemsPage = () => {
    const [userItems, setUserItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null); // Can be null for 'Add' mode

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            // Fetch both items and categories in parallel
            const [itemsResponse, categoriesResponse] = await Promise.all([
                getMyItemsApi(),
                getCategoriesApi()
            ]);
            setUserItems(itemsResponse.data.data || []);
            setCategories(categoriesResponse.data.categories || []);
            setError(null);
        } catch (err) {
            console.error("Error fetching page data:", err);
            setError("Failed to load page data. Please ensure you are logged in and try again.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleOpenModal = (item = null) => {
        setEditingItem(item); // If item is null, it's 'Add' mode
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const handleSaveSuccess = () => {
        handleCloseModal();
        fetchData(); // Refresh all data after a successful save
    };

    const handleDeleteItem = async (itemId) => {
        if (window.confirm("Are you sure you want to delete this item? This action cannot be undone.")) {
            try {
                await deleteItemApi(itemId);
                fetchData(); // Refresh data after delete
            } catch (err) {
                console.error("Error deleting item:", err);
                setError("Failed to delete the item. Please try again.");
            }
        }
    };

    const renderContent = () => {
        if (isLoading) return <p className="text-center text-gray-500">Loading your items...</p>;
        if (error) return <p className="text-center text-red-500 p-4 bg-red-50 rounded-lg">{error}</p>;
        if (userItems.length > 0) {
            return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {userItems.map(item => (
                        <UserItemCard key={item._id} item={item} onEdit={handleOpenModal} onDelete={handleDeleteItem} />
                    ))}
                </div>
            );
        }
        return (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm border">
                <h2 className="text-xl font-semibold text-gray-700">You haven't listed any items yet.</h2>
                <p className="text-gray-500 mt-2">Click the button below to add your first item!</p>
                <button onClick={() => handleOpenModal(null)} className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">List an Item</button>
            </div>
        );
    };

    return (
        <div className="w-full">
            <Header/>
            <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm mb-8 border">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Listed Items</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage the items you have listed for others to borrow.</p>
                </div>
                <button onClick={() => handleOpenModal(null)} className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
                    + List New Item
                </button>
            </div>
            {renderContent()}
            <ItemModal isOpen={isModalOpen} onClose={handleCloseModal} item={editingItem} categories={categories} onSaveSuccess={handleSaveSuccess} />
        </div>
    );
};

export default MyItemsPage;
