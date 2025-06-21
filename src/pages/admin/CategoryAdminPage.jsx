import React, { useState } from 'react';
import CategoryModal from '../../components/categories/CategoryModal';
import { MoreVerticalIcon } from '../../components/ui/Icons';

// Mock initial data, in a real app this would come from an API
const initialCategories = [
    { id: 1, name: 'Electronics', image: 'https://placehold.co/100x100/DBEAFE/3B82F6?text=Electronics' },
    { id: 2, name: 'Apparel', image: 'https://placehold.co/100x100/D1FAE5/10B981?text=Apparel' },
    { id: 3, name: 'Groceries', image: 'https://placehold.co/100x100/FEF3C7/F59E0B?text=Groceries' },
    { id: 4, name: 'Furniture', image: 'https://placehold.co/100x100/E0E7FF/6366F1?text=Furniture' },
];

const CategoryPage = () => {
    const [categories, setCategories] = useState(initialCategories);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    const handleAddCategory = () => {
        setEditingCategory(null);
        setIsModalOpen(true);
    };

    const handleEditCategory = (category) => {
        setEditingCategory(category);
        setIsModalOpen(true);
    };

    const handleDeleteCategory = (categoryId) => {
        // In a real app, use a custom confirmation modal instead of window.confirm
        if (window.confirm('Are you sure you want to delete this category?')) {
            setCategories(categories.filter(cat => cat.id !== categoryId));
        }
    };

    const handleSaveCategory = (categoryData) => {
        if (categoryData.id) { // Editing
            setCategories(categories.map(cat => cat.id === categoryData.id ? { ...cat, name: categoryData.name, image: categoryData.image } : cat));
        } else { // Adding
            const newCategory = {
                id: categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1,
                name: categoryData.name,
                image: categoryData.image || 'https://placehold.co/100x100/CCCCCC/FFFFFF?text=No+Image',
            };
            setCategories([...categories, newCategory]);
        }
        setIsModalOpen(false);
    };

    return (
        <main className="flex-1 bg-gray-100 p-6 md:p-8">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Categories</h2>
                    <button onClick={handleAddCategory} className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                        + Add Category
                    </button>
                </div>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {categories.map((category) => (
                                    <tr key={category.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <img className="h-12 w-12 rounded-lg object-cover" src={category.image} alt={category.name} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                             <button onClick={() => handleEditCategory(category)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                                             <button onClick={() => handleDeleteCategory(category.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <CategoryModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSave={handleSaveCategory}
                category={editingCategory}
            />
        </main>
    );
};

export default CategoryPage;
