import React, { useState } from 'react';
import { useNotifications } from '../../hooks/useNotifications'; // Adjust path if needed
import { Link } from 'react-router-dom';
import { Bell, CheckCheck } from 'lucide-react';

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAsRead } = useNotifications();

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen && unreadCount > 0) {
      markAsRead();
    }
  };

  return (
    <div className="relative">
      <button onClick={handleToggle} className="relative p-2">
        <Bell className="w-6 h-6 text-gray-700 hover:text-blue-600" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 max-w-sm bg-white rounded-lg shadow-xl overflow-hidden z-50 border">
          <div className="p-3 font-bold border-b text-gray-800">Notifications</div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notif) => (
                <Link
                  key={notif._id}
                  to={notif.link || "/my-rentals"}
                  onClick={() => setIsOpen(false)}
                  className={`block p-3 border-b hover:bg-gray-50 ${!notif.read ? 'bg-blue-50' : ''}`}
                >
                  <p className="text-sm text-gray-800">{notif.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(notif.createdAt).toLocaleString()}
                  </p>
                </Link>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                 <CheckCheck className="mx-auto h-12 w-12 text-gray-300" />
                 <p className="mt-2 text-sm">You're all caught up!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;