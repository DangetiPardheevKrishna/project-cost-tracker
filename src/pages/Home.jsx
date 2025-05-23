// App.js
import React, { useEffect, useState } from "react";
import { Box, VStack } from "@chakra-ui/react";
import Dashboard from "../components/Dashboard";
import Items from "../components/Items";
import OtherCosts from "../components/OtherCosts";
import Navbar from "../components/Navbar";

// Initialize services
const Home = () => {
  // Get current user's UID

  // Fetch user document
  //   async function getUserData() {
  //     const userDocRef = doc(db, "Users", auth.currentUser.uid);
  //     const userDocSnap = await getDoc(userDocRef);
  //     if (userDocSnap.exists()) {
  //       console.log("User data:", userDocSnap.data());
  //       return userDocSnap.data();
  //     } else {
  //       console.log("No such document!");
  //       return null;
  //     }
  //   }

  //   // Usage
  //   getUserData().then((userData) => {
  //     // Do something with the user data
  //     console.log(userData);
  //   });
  return (
    <Box bg="gray.50" minH="100vh">
      <VStack spacing={8} align="stretch">
        <Navbar />
        <Dashboard />
        <Items />
        <OtherCosts />
      </VStack>
    </Box>
  );
};

export default Home;

// Dashboard.js
