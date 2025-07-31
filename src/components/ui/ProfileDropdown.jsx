import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut, LayoutDashboard } from "lucide-react";

const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
};

export const ProfileDropdown = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleLogout = () => {
    setIsOpen(false);
    onLogout();
  };

  const handleNavigate = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 ring-2 ring-offset-2 ring-transparent hover:ring-blue-500 transition-all focus:outline-none"
      >
        <User size={20} />
      </button>

      <div
        className={`
          absolute top-full right-0 mt-2 w-60 bg-white rounded-xl shadow-2xl transition-all duration-300 ease-in-out origin-top-right
          ${
            isOpen
              ? "transform opacity-100 scale-100"
              : "transform opacity-0 scale-95 pointer-events-none"
          }
        `}
      >
        <div className="p-4 border-b border-slate-200">
          <p className="font-semibold text-slate-800 truncate">
            {user.username}
          </p>
          <p className="text-sm text-slate-500 truncate">{user.email}</p>
        </div>
        <div className="p-2">
          {user.role === "admin" && (
            <button
              onClick={() => handleNavigate("/admin/dashboard")}
              className="w-full flex items-center gap-3 px-3 py-2 text-left text-sm text-slate-700 rounded-md hover:bg-slate-100"
            >
              <LayoutDashboard size={16} />
              Admin Dashboard
            </button>
          )}
          <button
            onClick={() => handleNavigate("/profile")}
            className="w-full flex items-center gap-3 px-3 py-2 text-left text-sm text-slate-700 rounded-md hover:bg-slate-100"
          >
            <User size={16} />
            My Profile
          </button>
        </div>
        <div className="p-2 border-t border-slate-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-left text-sm text-red-600 rounded-md hover:bg-red-50"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};