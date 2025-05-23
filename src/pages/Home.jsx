import { Box, VStack } from "@chakra-ui/react";
import Dashboard from "../components/Dashboard";
import Items from "../components/Items";
import OtherCosts from "../components/OtherCosts";
import Navbar from "../components/Navbar";

const Home = () => {
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
