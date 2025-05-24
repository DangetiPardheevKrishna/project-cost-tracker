import { Flex, Text, Button } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAuth, signOut } from "firebase/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userId");
      toast.success("Logout successful", { position: "bottom-right" });
      navigate("/login");
    } catch (error) {
      toast.error(error.message, { position: "top-center" });
    }
  };

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
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Flex>
  );
};

export default Navbar;
