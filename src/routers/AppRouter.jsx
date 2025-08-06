import {
  BrowserRouter,
  Routes,
  Outlet,
  Route,
  Navigate,
} from "react-router-dom";

import Header from "../layouts/Header";
import Footer from "../layouts/Footer";

import Homepage from "../pages/Homepage";
import Loginpage from "../pages/Loginpage";
import Signup_page from "../pages/Signuppage";
import Browse_Items_page from "../pages/Browse_Items_page";
import ItemDetailPage from "../pages/ItemsDetailPage";
import AboutUsPage from "../pages/About_Us-Page";
import HowItWorksPage from "../pages/How_it_works_Page";
import ForgotPasswordPage from "../pages/Forgot_ password";
import ResetPasswordPage from "../pages/Reset_password";
import NotFoundPage from "../pages/NotFoundPage";

import StartLendingPage from "../pages/StartLendingPage";
import MyItemsPage from "../pages/MyItemspage";
import MyRentalsPage from "../pages/MyRentals";
import BookmarksPage from "../pages/Bookmarks_page";

import CategoryPage from "../pages/admin/CategoryAdminPage";
import ItemPage from "../pages/admin/ItemsAdminPage";
import ItemVerificationPage from "../pages/admin/ItemVerificationPage";

import NormalUserRoute from "./NormalUserRoutes";
import GuestRoute from "./GuestRoute";
import AuthPage from "../pages/Auth_Page";

const MainLayout = () => (
  <div className="flex flex-col min-h-screen bg-slate-50">
    <Header />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const AdminLayout = () => (
  <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
    <Header />
    <div className="flex-grow">
      <Outlet />
    </div>
  </div>
);

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/browse" element={<Browse_Items_page />} />
        <Route path="/item/:id" element={<ItemDetailPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />

        <Route element={<NormalUserRoute />}>
          <Route path="/start-lending" element={<StartLendingPage />} />
          <Route path="/my-items" element={<MyItemsPage />} />
          <Route path="/my-rentals" element={<MyRentalsPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
        </Route>
      </Route>

      <Route element={<GuestRoute />}>
        <Route path="/signin" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/reset-password/:resettoken"
          element={<ResetPasswordPage />}
        />
      </Route>

      <Route element={<AdminLayout />}>
        <Route
          path="/admin"
          element={<Navigate to="/admin/categories" replace />}
        />
        <Route path="/admin/categories" element={<CategoryPage />} />
        <Route path="/admin/items" element={<ItemPage />} />
        <Route path="/admin/verification" element={<ItemVerificationPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
