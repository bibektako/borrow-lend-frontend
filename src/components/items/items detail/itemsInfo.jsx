import React, { useState } from 'react';
import { Star, MapPin, ShieldCheck, Tag } from 'lucide-react';

const ItemInfo = ({ item }) => {
  const [activeTab, setActiveTab] = useState('description');

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<Star key={i} size={16} className={i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />);
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <span className="text-sm font-semibold text-blue-600">{item.category?.name || 'Uncategorized'}</span>
      <h1 className="text-3xl font-bold text-gray-800 mt-2">{item.name}</h1>
      
      <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500 mt-3">
        <div className="flex items-center gap-1">
          {renderStars(item.rating)}
          <span className="ml-1 font-semibold">{item.rating?.toFixed(1) || 'N/A'}</span>
          <span>({item.reviewCount || 0} reviews)</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin size={14} />
          <span>{item.owner?.location || 'Unknown Location'}</span>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4 text-sm">
        <div className="flex items-center gap-2 text-green-600">
            <ShieldCheck size={16} />
            <span>Available</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
            <Tag size={16} />
            <span>Condition: Excellent</span>
        </div>
      </div>

      <div className="mt-6 border-b border-gray-200">
        <nav className="flex space-x-6">
          <button onClick={() => setActiveTab('description')} className={`py-3 px-1 text-sm font-semibold ${activeTab === 'description' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-800'}`}>Description</button>
          <button onClick={() => setActiveTab('features')} className={`py-3 px-1 text-sm font-semibold ${activeTab === 'features' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-800'}`}>Features</button>
          <button onClick={() => setActiveTab('specs')} className={`py-3 px-1 text-sm font-semibold ${activeTab === 'specs' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-800'}`}>Specifications</button>
        </nav>
      </div>

      <div className="mt-6 text-gray-700 text-sm leading-relaxed">
        {activeTab === 'description' && <p>{item.description}</p>}
        {activeTab === 'features' && <p>Features content goes here. (e.g., Portable, Long battery life, etc.)</p>}
        {activeTab === 'specs' && <p>Specifications content goes here. (e.g., Weight: 2kg, Dimensions: 10x10x5 cm, etc.)</p>}
      </div>
    </div>
  );
};

export default ItemInfo;
