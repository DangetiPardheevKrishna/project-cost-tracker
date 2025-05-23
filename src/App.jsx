import { Flex } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import React, { lazy, Suspense } from "react";
import Home from "./pages/Home";

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
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Suspense fallback={null}>
        {" "}
        <ToastContainer />
      </Suspense>
    </>
  );
};

export default App;
