import { Box, VStack } from "@chakra-ui/react";
import React, { Suspense, lazy } from "react";

// Lazy load components
const Dashboard = lazy(() => import("../components/Dashboard"));
const Items = lazy(() => import("../components/Items"));
const OtherCosts = lazy(() => import("../components/OtherCosts"));
const Navbar = lazy(() => import("../components/Navbar"));

const Home = () => {
  return (
    <Box bg="gray.50" minH="100vh">
      <VStack spacing={8} align="stretch">
        <Suspense fallback={<div>Loading Navbar...</div>}>
          <Navbar />
        </Suspense>

        <Suspense fallback={<div>Loading Dashboard...</div>}>
          <Dashboard />
        </Suspense>

        <Suspense fallback={<div>Loading Items...</div>}>
          <Items />
        </Suspense>

        <Suspense fallback={<div>Loading Other Costs...</div>}>
          <OtherCosts />
        </Suspense>
      </VStack>
    </Box>
  );
};

export default Home;
