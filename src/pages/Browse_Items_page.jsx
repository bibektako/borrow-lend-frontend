import React, { useEffect, useState } from 'react';
import FilterSidebar from '../components/user/Filter_Sidebar_component';
import ItemCard from '../components/user/ItemsCard';
import { getItemsApi } from '../api/itemAPI';

export default function Browse_Items_page() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await getItemsApi(); // You can pass filters here later
        setItems(response.data);
      } catch (err) {
        setError('Failed to fetch items.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen p-6">
      {/* Sidebar */}
      <div className="w-1/4">
        <FilterSidebar />
      </div>

      {/* Main Content */}
      <div className="w-3/4 px-6">
        <h1 className="text-2xl font-bold mb-6">Browse Items</h1>

        {loading && <p className="text-gray-600">Loading items...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && items.length === 0 && (
          <p className="text-gray-500">No items found.</p>
        )}
        {!loading && !error && items.length > 0 && (
          <ItemCard items={items} />
        )}
      </div>
    </div>
  );
}
