import { BrowserRouter, Routes,Outlet, Route, Navigate } from "react-router-dom";

import Signup_page from "../pages/Signuppage";
import Homepage from "../pages/Homepage";
import Loginpage from "../pages/Loginpage";

import AdminHeader from '../layouts/admin/AdminHeader';
import CategoryPage from "../pages/admin/CategoryAdminPage";
import ItemPage from "../pages/admin/ItemsAdminPage";

const ProductsPage = () => <div className="p-8 container mx-auto"><h1 className="text-2xl font-bold">Products Page</h1><p>Content for managing products will go here.</p></div>;
const ProductVerificationPage = () => <div className="p-8 container mx-auto"><h1 className="text-2xl font-bold">Product Verification Page</h1><p>Content for verifying products will go here.</p></div>;

const AdminLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
            <AdminHeader />
            <Outlet /> {/* This renders the matched child route component (e.g., CategoryPage) */}
        </div>
    );
};

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/signUp" element={<Signup_page />}></Route>
      <Route path="/signin" element={<Loginpage />}></Route>


       <Route element={<AdminLayout />}>
                <Route path="/admin" element={<Navigate to="/admin/CategotyAdminPage" replace />} />
                <Route path="/admin/categories" element={<CategoryPage />} />
                <Route path="/admin/items" element={<ItemPage />} />
                <Route path="/admin/verification" element={<ProductVerificationPage />} />
       </Route>
       <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
