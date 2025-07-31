import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { BellRing, BellOff } from 'lucide-react';

const NotificationItem = ({ notification, onClose }) => {
  const getNotificationStyle = (type) => {
    switch (type) {
      case 'approved':
        return { icon: <BellRing size={18} className="text-green-500" />, color: 'text-green-600' };
      case 'new_request':
        return { icon: <BellRing size={18} className="text-blue-500" />, color: 'text-blue-600' };
      case 'denied':
      case 'cancelled':
        return { icon: <BellOff size={18} className="text-red-500" />, color: 'text-red-600' };
      default:
        return { icon: <BellRing size={18} className="text-slate-500" />, color: 'text-slate-600' };
    }
  };

  const { icon } = getNotificationStyle(notification.type);

  return (
    <Link
      to={notification.link}
      onClick={onClose}
      className="block p-3 transition-colors duration-150 hover:bg-slate-50"
    >
      <div className="flex items-start gap-4">
        <div className="relative flex-shrink-0 pt-0.5">
          {icon}
          {!notification.read && (
            <span className="absolute top-0 right-[-4px] block h-2.5 w-2.5 rounded-full bg-blue-500 border-2 border-white"></span>
          )}
        </div>

        <div className="flex-grow">
          <p className="text-sm text-slate-700 leading-snug">{notification.message}</p>
          <p className="text-xs text-slate-400 mt-1.5">
            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
          </p>
        </div>
      </div>
    </Link>
  );
};



const NotificationPanel = ({ notifications, onClose }) => {
  return (
    <div
      className="absolute top-full right-0 mt-2 w-80 max-w-sm bg-white rounded-lg shadow-2xl border border-slate-200 z-50 overflow-hidden animate-fade-in-down"
      aria-labelledby="notification-panel-title"
    >
      <header className="p-3 border-b border-slate-200">
        <h3 id="notification-panel-title" className="font-semibold text-slate-800">
          Notifications
        </h3>
      </header>

      <div className="max-h-96 overflow-y-auto">
        {notifications && notifications.length > 0 ? (
          <div>
            {notifications.map((n) => (
              <NotificationItem key={n._id} notification={n} onClose={onClose} />
            ))}
          </div>
        ) : (
          <div className="text-center p-8">
            <BellOff className="mx-auto h-12 w-12 text-slate-300" />
            <p className="mt-4 text-sm font-medium text-slate-600">You're all caught up!</p>
            <p className="mt-1 text-xs text-slate-400">New notifications will appear here.</p>
          </div>
        )}
      </div>

      <footer className="p-2 bg-slate-50 text-center border-t border-slate-200">
        <Link
          to="/notifications" 
          onClick={onClose}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          View all notifications
        </Link>
      </footer>
    </div>
  );
};

export default NotificationPanel;