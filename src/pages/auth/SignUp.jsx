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
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { auth, db, googleProvider } from "../../firebase/firebase.js";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!firstName || !lastName || !email || !password) {
        toast.error("Please fill in all fields");
        return;
      }

      if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "Users", userCredential.user.uid), {
        email: userCredential.user.email,
        firstName,
        lastName,
        createdAt: new Date().toISOString(),
      });

      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if user already exists in Firestore
      const userDoc = await getDoc(doc(db, "Users", user.uid));

      if (!userDoc.exists()) {
        // Split Google display name into first/last names
        const names = user.displayName?.split(" ") || [];
        const firstName = names[0] || "";
        const lastName = names.slice(1).join(" ") || "Google User";

        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName,
          lastName,
          photoURL: user.photoURL,
          createdAt: new Date().toISOString(),
        });
      }

      toast.success("Google sign up successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    } finally {
      setIsGoogleLoading(false);
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
          Create Account
        </Heading>

        <form onSubmit={handleEmailSignUp}>
          <VStack spacing={4}>
            <HStack spacing={4} w="full">
              <FormControl id="firstName" isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                />
              </FormControl>

              <FormControl id="lastName" isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                />
              </FormControl>
            </HStack>

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
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
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
              loadingText="Creating account..."
            >
              Sign Up
            </Button>
          </VStack>
        </form>
        <Text textAlign="center" my={4} color="gray.600">
          Or
        </Text>
        {/* Google Sign Up Button */}
        <Button
          onClick={handleGoogleSignUp}
          leftIcon={<FcGoogle size={20} />}
          variant="outline"
          colorScheme="gray"
          w="full"
          mb="1rem"
          isLoading={isGoogleLoading}
          loadingText="Signing up with Google..."
        >
          Continue with Google
        </Button>

        <Text textAlign="center" fontSize="sm" color="gray.600">
          Already have an account?{" "}
          <Link href="/login" color="purple.600" fontWeight="medium">
            Log in
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default SignUp;
