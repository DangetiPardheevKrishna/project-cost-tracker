import { Route, Routes, useNavigate } from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import React, { lazy, Suspense, useEffect } from "react";
import Home from "./pages/Home";
import { auth } from "./firebase/firebase";

const ToastContainer = lazy(() =>
  import("react-toastify").then((module) => ({
    default: module.ToastContainer,
  }))
);

export const toast = lazy(() =>
  import("react-toastify").then((module) => ({
    default: module.toast,
  }))
);
const App = () => {
  console.log(auth.currentUser?.uid);
  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      <Suspense fallback={null}>
        <ToastContainer />
      </Suspense>
    </>
  );
};

export default App;
