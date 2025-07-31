import { useContext, useState } from "react";
// 1. ADD 'Heart' to this import line to fix the error
import { Search, Menu, X, Heart } from "lucide-react";
import { useNavigate, NavLink } from "react-router-dom";
import logoImage from "../assets/images/logo.png";
import { AuthContext } from "../auth/Authprovider";
import { NavLinks } from "../components/ui/Navlinks";
import { ProfileDropdown } from "../components/ui/ProfileDropdown";
import { useBookmarks } from "../hooks/useBookmarks";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Get the live count of bookmarked items from our custom hook
  const { bookmarkCount } = useBookmarks();

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
      {/* --- Left Side: Logo --- */}
      <NavLink
        to="/"
        className="flex items-center gap-2 flex-shrink-0 z-10"
        onClick={() => setIsMenuOpen(false)}
      >
        <img src={logoImage} alt="Logo" className="w-9 h-9" />
        <span className="text-xl font-bold text-slate-800 hidden lg:block">
          BorrowLend
        </span>
      </NavLink>

      {/* --- Center: Main Navigation --- */}
      <div className="flex-1 justify-center hidden md:flex">
        <NavLinks user={user} />
      </div>

      {/* --- Right Side: Search, Auth, and Bookmarks --- */}
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
          // === Logged-in User View (Bookmarks and Profile) ===
          <div className="flex items-center gap-5">
            {/* 2. THIS IS THE NEW "BOOKMARKED" TEXT LINK */}
            <NavLink
              to="/bookmarks"
              className="relative flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
            >
              <Heart size={16} />
              <span>Bookmarked</span>
              {bookmarkCount > 0 && (
                <span className="absolute top-[-5px] right-[-10px] flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {bookmarkCount}
                </span>
              )}
            </NavLink>
            <ProfileDropdown user={user} onLogout={handleLogout} />
          </div>
        ) : (
          // === Guest View (Sign In and Register) ===
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

      {/* Mobile Menu Content (No changes needed here) */}
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