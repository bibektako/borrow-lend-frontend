import React, { useState } from 'react';
import { useMyItems, useCategories, useDeleteItem } from '../hooks/useItem';
import UserItemCard from '../components/user/User_Items_card';
import ItemModal from '../components/items/ItemModel';

const MyItemsPage = () => {
    const { items, isLoadingItems, errorItems } = useMyItems();
    const { categories, isLoadingCategories, errorCategories } = useCategories();
    
    const { mutate: deleteItem } = useDeleteItem();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const handleOpenModal = (item = null) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const handleDeleteItem = (itemId) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            deleteItem(itemId);
        }
    };

    const renderContent = () => {
        if (isLoadingItems || isLoadingCategories) return <p className="text-center text-gray-500">Loading your data...</p>;
        if (errorItems || errorCategories) return <p className="text-center text-red-500 p-4 bg-red-50 rounded-lg">Failed to load data. Please try again.</p>;
        if (items.length > 0) {
            return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {items.map(item => (
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
            <ItemModal isOpen={isModalOpen} onClose={handleCloseModal} item={editingItem} categories={categories} onSaveSuccess={handleCloseModal} />
        </div>
    );
};

export default MyItemsPage;
