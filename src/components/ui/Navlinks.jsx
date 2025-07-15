import React from "react";
import { NavLink } from "react-router-dom";

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

const userLinks = [
  { to: "/browse", label: "Browse Items" },
  { to: "/my-items", label: "My Items" },
  { to: "/my-rentals", label: "My Rentals" },
  { to: "/messages", label: "Messages" },
];

const guestLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/how-it-works", label: "How It Works" },
];

export const NavLinks = ({ user, onLinkClick }) => {
  let linksToRender;

  if (user?.role === "admin") {
    linksToRender = adminLinks;
  } else if (user) {
    linksToRender = userLinks;
  } else {
    linksToRender = guestLinks;
  }

  const handleLinkClick = () => {
    if (onLinkClick) {
      onLinkClick();
    }
  };

  return (
    <nav className="flex flex-col md:flex-row items-center gap-4 text-lg md:text-sm md:gap-2">
      {linksToRender.map((link) => (
        <NavLink
          key={link.to}
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
