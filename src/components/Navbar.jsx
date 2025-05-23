import { Flex, Text, Button } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="purple.600"
      color="white"
      px={["2rem", "6rem", "10rem"]}
    >
      <Text fontSize="lg" fontWeight="bold">
        Project Cost Tracker
      </Text>

      <Button
        rightIcon={<FiLogOut />}
        colorScheme="white"
        variant="solid"
        border="1px"
        borderColor="gray.200"
        _hover={{
          transform: "scale(1.05)",
          transition: "transform 0.2s ease-in-out",
          boxShadow: "md",
        }}
        _active={{
          transform: "scale(0.98)",
        }}
        onClick={() => {
          navigate("/login");
          toast.success("Logout Success", {
            position: "bottom-right",
          });
        }}
      >
        Logout
      </Button>
    </Flex>
  );
};

export default Navbar;
