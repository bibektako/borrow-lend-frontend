import React from 'react';
import { MessageSquare, Phone, CheckCircle } from 'lucide-react';

const OwnerInfo = ({ owner }) => {
  if (!owner) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Owner Information</h2>
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0">
          {/* Placeholder for owner's profile picture */}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{owner.username}</h3>
            <span className="flex items-center gap-1 text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
              <CheckCircle size={12} />
              Verified
            </span>
          </div>
          <p className="text-sm text-gray-500">Member since: January 2023</p>
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-600 space-y-1">
        <p>⭐ 4.9 • 12 items</p>
        <p>🕒 Responds within 1 hour</p>
      </div>
      <div className="mt-6 flex gap-4">
        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-100">
          <MessageSquare size={16} />
          Message
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-100">
          <Phone size={16} />
          Call
        </button>
      </div>
    </div>
  );
};

export default OwnerInfo;
