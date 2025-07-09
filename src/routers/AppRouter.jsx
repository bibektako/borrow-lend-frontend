import { BrowserRouter, Routes,Outlet, Route, Navigate } from "react-router-dom";

import Signup_page from "../pages/Signuppage";
import Homepage from "../pages/Homepage";
import Loginpage from "../pages/Loginpage";

import AdminHeader from '../layouts/admin/AdminHeader';
import CategoryPage from "../pages/admin/CategoryAdminPage";
import ItemPage from "../pages/admin/ItemsAdminPage";
import ProductVerificationPage from "../pages/admin/ItemVerificationPage";
import NormalUserRoute from "./NormalUserRoutes";
import GuestRoute from "./GuestRoute";
import Browse_Items_page from "../pages/Browse_Items_page";
import StartLendingPage from "../pages/StartLendingPage";
import ItemVerificationPage from "../pages/admin/ItemVerificationPage";



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
      <Route path="*" element={<>404 Not Found</>} />
      
      <Route path="/signUp" element={<Signup_page />}></Route>
      <Route path="/signin" element={<Loginpage />}></Route>
      


       <Route element={<AdminLayout />}>
                <Route path="/admin" element={<Navigate to="/admin/categories" replace />} />

                <Route path="/admin/categories" element={<CategoryPage />} />
                <Route path="/admin/items" element={<ItemPage />} />
                <Route path="/admin/verification" element={<ItemVerificationPage />} />
       </Route>

      {/* <Route path="/user/*" element = {<NormalUserRoute/>}> */}
      <Route path="/browse" element={<Browse_Items_page/>}/>
      <Route path="/start-lending" element={<StartLendingPage/>}/>
      {/* </Route> */}
      
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
