import { Bell, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../assets/images/logo.png'

const Header = () => {
    const navigate = useNavigate();
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white shadow-md">
      <div className="flex items-center space-x-2">
        <img
          src={logoImage} 
          alt="Logo"
          className="w-8 h-8"
        />
      </div>
      <div className="flex-grow mx-6 max-w-2xl">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search items"
            className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-sm text-gray-700 hover:underline" onClick={() => navigate("/signin")}>Sign In</button>
        <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 text-sm" onClick={()=> navigate("/signUp")}>
          Register
        </button>
        <div className="relative">
          <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>
        <Sun className="w-6 h-6 text-gray-600 cursor-pointer" />
      </div>
    </header>
  );
};

export default Header;
