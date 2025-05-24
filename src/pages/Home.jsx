import { Box, VStack } from "@chakra-ui/react";
import Dashboard from "../components/Dashboard";
import Items from "../components/Items";
import OtherCosts from "../components/OtherCosts";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // User is signed in.
        navigate("/login");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigate]);
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
