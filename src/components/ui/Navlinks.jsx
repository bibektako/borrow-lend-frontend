import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useBorrowRequests } from "../../hooks/useBorrow";
import { useBookmarks } from "../../hooks/useBookmarks";

const activeLinkClass =
  "text-blue-600 font-bold bg-blue-50 py-2 px-3 rounded-lg";
const inactiveLinkClass =
  "text-slate-600 font-medium hover:text-blue-600 hover:bg-slate-100 py-2 px-3 rounded-lg transition-colors";

const adminLinks = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/verification", label: "Verification" },
  { to: "/admin/items", label: "Items" },
  { to: "/admin/categories", label: "Categories" },
  { to: "/admin/users", label: "Users" },
];

const baseUserLinks = [
  { to: "/bookmarks", label: "Bookmarked" },
  { to: "/browse", label: "Browse Items" },
  { to: "/my-items", label: "My Items" },
  { to: "/my-rentals", label: "My Rentals" },
  { to: "/messages", label: "Messages" },
];

const guestLinks = [
  { to: "/", label: "Home" },
  { to: "/browse", label: "Browse" },

  { to: "/about", label: "About Us" },
  { to: "/how-it-works", label: "How It Works" },
];

export const NavLinks = ({ user, onLinkClick }) => {
  const { requests } = useBorrowRequests();
  const { bookmarkCount } = useBookmarks();
  const location = useLocation();
  const [newRentalsCount, setNewRentalsCount] = useState(0);

  useEffect(() => {
    if (requests && requests.length > 0) {
      const pendingCount = requests.filter(
        (r) => r.status === "pending" || r.status === "new"
      ).length;
      setNewRentalsCount(pendingCount);
    }
  }, [requests]);

  useEffect(() => {
    if (location.pathname === "/my-rentals") {
      setNewRentalsCount(0);
    }
  }, [location]);

  const handleLinkClick = () => {
    if (onLinkClick) onLinkClick();
  };

  let linksToRender;

  if (user?.role === "admin") {
    linksToRender = adminLinks;
  } else if (user) {
    linksToRender = baseUserLinks.map((link) => {
      if (link.to === "/my-rentals" && newRentalsCount > 0) {
        return {
          ...link,
          label: (
            <span className="relative inline-block">
              My Rentals
              <span className="absolute -top-2 -right-4 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                {newRentalsCount}
              </span>
            </span>
          ),
        };
      }
      if (link.to === "/bookmarks" && bookmarkCount > 0) {
        return {
          ...link,
          label: (
            <span className="relative inline-block">
              Bookmarked
              <span className="absolute -top-2 -right-4 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                {bookmarkCount}
              </span>
            </span>
          ),
        };
      }
      return link;
    });
  } else {
    linksToRender = guestLinks;
  }

  return (
    <nav className="flex flex-col md:flex-row items-center gap-4 text-lg md:text-sm md:gap-2">
      {linksToRender.map((link) => (
        <NavLink
          key={typeof link.label === "string" ? link.label : link.to}
          to={link.to}
          end={link.to === "/"}
          className={({ isActive }) =>
            isActive ? activeLinkClass : inactiveLinkClass
          }
          onClick={handleLinkClick}
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
};
