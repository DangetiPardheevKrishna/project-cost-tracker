import React from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  useColorModeValue,
  Spinner,
  VStack,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { DollarSign } from "lucide-react";

const Dashboard = () => {
  // Get data from Redux store
  const items = useSelector((state) => state.items.items);
  const otherCosts = useSelector((state) => state.otherCosts.items);
  const itemsLoading = useSelector((state) => state.items.loading);
  const otherCostsLoading = useSelector((state) => state.otherCosts.loading);

  // Calculate totals
  const itemsTotal = items.reduce((sum, item) => sum + (item.Cost || 0), 0);
  const otherCostsTotal = otherCosts.reduce(
    (sum, cost) => sum + (cost.Amount || 0),
    0
  );
  const projectTotal = itemsTotal + otherCostsTotal;

  // Card styling
  const cardBg = useColorModeValue("white", "gray.700");
  const cardShadow = useColorModeValue("sm", "dark-lg");

  return (
    <Box px={["2rem", "6rem", "10rem"]}>
      <Heading size="lg" mb={6}>
        Project Cost Summary
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
        {/* Total Project Cost Card */}
        <Box
          bg={cardBg}
          p={6}
          borderRadius="lg"
          borderWidth="1px"
          borderColor="#B794F4"
          boxShadow={cardShadow}
          textAlign="center"
          transition="all 0.2s ease-in-out"
          _hover={{
            transform: "translateY(-5px)",
            boxShadow: "md",
            cursor: "pointer",
          }}
        >
          <Flex align="center" justifyContent="center" gap={1} mb={2}>
            <DollarSign size={14} color="#805AD5" />{" "}
            {/* Match gray.500 color */}
            <Text fontSize="md" color="gray.500">
              Total Project Cost
            </Text>
          </Flex>
          {itemsLoading || otherCostsLoading ? (
            <Box>
              <Spinner fontSize="2xl" color="purple.600" />
            </Box>
          ) : (
            <Heading size="xl" color="purple.600">
              ${projectTotal.toFixed(2)}
            </Heading>
          )}
        </Box>

        {/* Items Total Card */}
        <Box
          bg={cardBg}
          p={6}
          borderRadius="lg"
          borderWidth="1px"
          borderColor="#B794F4"
          boxShadow={cardShadow}
          textAlign="center"
          transition="all 0.2s ease-in-out"
          _hover={{
            transform: "translateY(-5px)",
            boxShadow: "md",
            cursor: "pointer",
          }}
        >
          <Text fontSize="sm" color="gray.500" mb={2}>
            Items Cost
          </Text>
          {itemsLoading ? (
            <Box>
              <Spinner fontSize="2xl" color="purple.600" />
            </Box>
          ) : (
            <Heading size="xl" color="blue.600">
              ${itemsTotal.toFixed(2)}
            </Heading>
          )}
          <Text fontSize="sm" mt={2} color="gray.500">
            {items.length} items
          </Text>
        </Box>

        {/* Other Costs Card */}
        <Box
          bg={cardBg}
          p={6}
          borderRadius="lg"
          borderWidth="1px"
          borderColor="#B794F4"
          boxShadow={cardShadow}
          textAlign="center"
          transition="all 0.2s ease-in-out"
          _hover={{
            transform: "translateY(-5px)",
            boxShadow: "md",
            cursor: "pointer",
          }}
        >
          <Text fontSize="sm" color="gray.500" mb={2}>
            Other Costs
          </Text>
          {otherCostsLoading ? (
            <Box>
              <Spinner fontSize="2xl" color="purple.600" />
            </Box>
          ) : (
            <Heading size="xl" color="green.600">
              ${otherCostsTotal.toFixed(2)}
            </Heading>
          )}
          <Text fontSize="sm" mt={2} color="gray.500">
            {otherCosts.length} costs
          </Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default Dashboard;
