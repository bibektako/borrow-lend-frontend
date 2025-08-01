import { useContext, useState, useEffect, useRef } from "react";
// 1. Import the Bell icon
import { Search, Menu, X, Bell } from "lucide-react";
import { useNavigate, NavLink } from "react-router-dom";
import logoImage from "../assets/images/logo.png";
import { AuthContext } from "../auth/Authprovider";
import { NavLinks } from "../components/ui/Navlinks";
import { ProfileDropdown } from "../components/ui/ProfileDropdown";
// 2. Import the hooks and components for the notification system
import { useNotifications } from "../hooks/usenotification"
import NotificationPanel from "../components/ui/NotificationPanel";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { notifications, unreadCount, markAsRead } = useNotifications();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsPanelOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [panelRef]);

  const handleBellClick = () => {
    const newPanelState = !isPanelOpen;
    setIsPanelOpen(newPanelState);

    if (newPanelState && unreadCount > 0) {
      setTimeout(() => {
        markAsRead();
      }, 2000);
    }
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      navigate(`/browse?search=${searchTerm.trim()}`);
      setSearchTerm("");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const handleSignIn = () => {
    navigate("/signin");
    setIsMenuOpen(false);
  };

  const handleRegister = () => {
    navigate("/signUp");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="relative flex items-center justify-between gap-6 px-6 py-3 bg-white shadow-md">
      <NavLink to="/" className="flex items-center gap-2 flex-shrink-0 z-10" onClick={() => setIsMenuOpen(false)}>
        <img src={logoImage} alt="Logo" className="w-9 h-9" />
        <span className="text-xl font-bold text-slate-800 hidden lg:block">
          BorrowLend
        </span>
      </NavLink>

      <div className="flex-1 justify-center hidden md:flex items-center gap-8">
        <NavLinks user={user} />
      </div>

      <div className="hidden md:flex items-center gap-4 flex-shrink-0">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
            className="w-full pl-10 pr-4 py-2 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>

        {user ? (
          <div className="flex items-center gap-4">
            <div className="relative" ref={panelRef}>
              <button
                onClick={handleBellClick}
                className="relative p-2 text-slate-600 hover:text-blue-600 rounded-full hover:bg-slate-100 transition-colors"
                aria-label="Open notifications"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white"></span>
                )}
              </button>
              
              {isPanelOpen && (
                <NotificationPanel 
                  notifications={notifications}
                  onClose={() => setIsPanelOpen(false)}
                />
              )}
            </div>

            <ProfileDropdown user={user} onLogout={handleLogout} />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-blue-600"
              onClick={handleSignIn}
            >
              Sign In
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        )}
      </div>

      {/* --- Mobile Menu --- */}
      <div className="md:hidden z-10">
        <button onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-white md:hidden z-0 pt-20">
          <div className="flex flex-col items-center p-4 gap-6">
            <NavLinks user={user} onLinkClick={() => setIsMenuOpen(false)} />
            <div className="w-full max-w-xs h-px bg-slate-200"></div>
            {user ? (
              <div className="flex flex-col items-center gap-4 w-full">
                <ProfileDropdown user={user} onLogout={handleLogout} />
              </div>
            ) : (
              <div className="flex flex-col items-stretch gap-3 w-full max-w-xs">
                <button
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 border rounded-lg"
                  onClick={handleSignIn}
                >
                  Sign In
                </button>
                <button
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  onClick={handleRegister}
                >
                  Register
                </button>
              </div>
            )}
            <div className="relative w-full max-w-xs mt-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;