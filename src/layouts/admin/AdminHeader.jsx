import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserCircleIcon } from '../../components/ui/Icons';

const AdminHeader = () => {
    const activeLinkClass = "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1";
    const inactiveLinkClass = "text-gray-600 hover:text-blue-600";

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
                <nav className="hidden md:flex items-center space-x-8">
                    <NavLink to="/admin/verification" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>
                        Product Verification
                    </NavLink>
                    <NavLink to="/admin/items" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>
                        Listed Items
                    </NavLink>
                    <NavLink to="/admin/categories" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>
                        Category
                    </NavLink>
                </nav>
                <div className="flex items-center">
                    <button className="flex items-center text-gray-600 focus:outline-none">
                        <UserCircleIcon />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;