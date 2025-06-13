import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Signup_page from "../pages/Signuppage";
import Homepage from "../pages/Homepage";
import Loginpage from "../pages/Loginpage";



const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/signUp" element={<Signup_page />}></Route>
      <Route path="/signin" element={<Loginpage />}></Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
