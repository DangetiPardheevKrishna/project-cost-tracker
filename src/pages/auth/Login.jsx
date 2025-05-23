// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
//   VStack,
//   Heading,
//   InputGroup,
//   InputRightElement,
//   IconButton,
//   Text,
//   Flex,
//   Link,
// } from "@chakra-ui/react";
// import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
// import { toast } from "react-toastify";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../components/firebase";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   // Separate states for each field
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       console.log(auth.currentUser);
//       navigate("/");
//       toast.success("Login Success", {
//         colorScheme: "purple",
//         position: "bottom-right",
//       });
//     } catch (error) {
//       toast.error(error.message, { position: "top-center" });
//     }
//     // Basic validation
//     if (!email || !password) {
//       toast.error("Please fill in all fields", { position: "top-center" });
//       return;
//     }
//   };

//   return (
//     <Flex minH="100vh" align="center" justify="center" bg="gray.50">
//       <Box
//         w="100%"
//         maxW="md"
//         p={8}
//         borderWidth={1}
//         borderRadius="lg"
//         bg="white"
//         boxShadow="md"
//       >
//         <Heading as="h1" size="xl" textAlign="center" mb={6}>
//           Login
//         </Heading>

//         <form onSubmit={handleSubmit}>
//           <VStack spacing={4}>
//             <FormControl id="email" isRequired>
//               <FormLabel>Email Address</FormLabel>
//               <Input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="your@email.com"
//               />
//             </FormControl>

//             <FormControl id="password" isRequired>
//               <FormLabel>Password</FormLabel>
//               <InputGroup>
//                 <Input
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Enter your password"
//                 />
//                 <InputRightElement>
//                   <IconButton
//                     aria-label={
//                       showPassword ? "Hide password" : "Show password"
//                     }
//                     icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => setShowPassword(!showPassword)}
//                   />
//                 </InputRightElement>
//               </InputGroup>
//             </FormControl>

//             <Button
//               type="submit"
//               colorScheme="purple"
//               width="full"
//               mt={4}
//               isLoading={isLoading}
//               loadingText="Logging in..."
//             >
//               Login
//             </Button>
//           </VStack>
//         </form>

//         <Text textAlign="center" mt={4} fontSize="sm" color="gray.600">
//           Don't have an account?{" "}
//           <Link href="/signup" color="purple.600" fontWeight="medium">
//             Sign up
//           </Link>
//         </Text>
//       </Box>
//     </Flex>
//   );
// };

// export default Login;

import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  InputGroup,
  InputRightElement,
  IconButton,
  Text,
  Flex,
  Link,
  Divider,
  HStack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      toast.error("Please fill in all fields", { position: "top-center" });
      setIsLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      toast.success("Login successful!", {
        position: "bottom-right",
      });
    } catch (error) {
      toast.error(error.message, { position: "top-center" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Box
        w="100%"
        maxW="md"
        p={8}
        borderWidth={1}
        borderRadius="lg"
        bg="white"
        boxShadow="md"
      >
        <Heading as="h1" size="xl" textAlign="center" mb={6}>
          Welcome Back
        </Heading>

        {/* Email Login Form */}
        <form onSubmit={handleEmailLogin}>
          <VStack spacing={4} mb="1rem">
            <FormControl id="email" isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                autoComplete="email"
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <InputRightElement>
                  <IconButton
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    icon={
                      showPassword ? <EyeOff size={16} /> : <Eye size={16} />
                    }
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button
              type="submit"
              colorScheme="purple"
              width="full"
              mt={4}
              isLoading={isLoading}
              loadingText="Logging in..."
            >
              Login
            </Button>
          </VStack>
        </form>

        <Text fontSize="sm" textAlign="center" color="gray.600">
          New user?{" "}
          <Link href="/signup" color="purple.600" fontWeight="medium">
            Sign up
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default Login;
