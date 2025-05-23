import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  Text,
  HStack,
  IconButton,
  useDisclosure,
  Collapse,
  useToast,
  Spinner,
  Select,
  Center,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchOtherCosts,
  addOtherCost,
  updateOtherCost,
  deleteOtherCost,
  startEditing,
  cancelEditing,
  setEditDescription,
  setEditAmount,
} from "../redux/otherCostsSlice";

const OtherCosts = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("description-asc");
  const toast = useToast();
  const [isAdding, setIsAdding] = useState(false);

  // Redux state and dispatch
  const dispatch = useDispatch();
  const {
    items: allOtherCostsData,
    loading,
    editingId,
    editDescription,
    editAmount,
  } = useSelector((state) => state.otherCosts);

  // Fetch other costs on component mount
  const fetchedOnce = useRef(false);

  useEffect(() => {
    if (!fetchedOnce.current) {
      dispatch(fetchOtherCosts());
      fetchedOnce.current = true;
    }
  }, [dispatch]);

  // Filter and sort other costs
  const filteredAndSortedOtherCosts = React.useMemo(() => {
    let otherCosts = [...allOtherCostsData];

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      otherCosts = otherCosts.filter(
        (cost) =>
          cost.Description.toLowerCase().includes(term) ||
          cost.Amount.toString().includes(term)
      );
    }

    // Sorting
    switch (sortBy) {
      case "description-asc":
        otherCosts.sort((a, b) => a.Description.localeCompare(b.Description));
        break;
      case "description-desc":
        otherCosts.sort((a, b) => b.Description.localeCompare(a.Description));
        break;
      case "amount-asc":
        otherCosts.sort((a, b) => a.Amount - b.Amount);
        break;
      case "amount-desc":
        otherCosts.sort((a, b) => b.Amount - a.Amount);
        break;
      default:
        break;
    }

    return otherCosts;
  }, [allOtherCostsData, searchTerm, sortBy]);

  const onClickAddOtherCost = async () => {
    if (isAdding) return;
    setIsAdding(true);

    if (!description || !amount) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsAdding(false);
      return;
    }

    try {
      await dispatch(addOtherCost({ description, amount })).unwrap();
      dispatch(fetchOtherCosts());

      setDescription("");
      setAmount("");
      onToggle();
      toast({
        title: "Success",
        description: "Other cost added successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add other cost",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Error adding other cost: ", error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteOtherCost = async (id) => {
    try {
      await dispatch(deleteOtherCost(id)).unwrap();
      toast({
        title: "Success",
        description: "Other cost deleted successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete other cost",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Error deleting other cost: ", error);
    }
  };

  const handleStartEditing = (cost) => {
    dispatch(startEditing(cost));
  };

  const handleCancelEditing = () => {
    dispatch(cancelEditing());
  };

  const handleUpdateOtherCost = async (id) => {
    if (!editDescription || !editAmount) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await dispatch(
        updateOtherCost({
          id,
          description: editDescription,
          amount: editAmount,
        })
      ).unwrap();
      toast({
        title: "Success",
        description: "Other cost updated successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update other cost",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Error updating other cost: ", error);
    }
  };

  return (
    <Box
      mx={["2rem", "6rem", "10rem"]}
      mb="4rem"
      p="1.4rem"
      border="1px"
      borderColor="#B794F4"
      rounded="8px"
      shadow="md"
    >
      <Heading size="md" mb={4}>
        Other Costs
      </Heading>
      <HStack mb={4} spacing={4}>
        <Input
          placeholder="Search other costs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          flex={2}
        />
        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          width="auto"
          flex={1}
        >
          <option value="description-asc">Description (A-Z)</option>
          <option value="description-desc">Description (Z-A)</option>
          <option value="amount-asc">Amount (Low-High)</option>
          <option value="amount-desc">Amount (High-Low)</option>
        </Select>
        <Button colorScheme="purple" onClick={onToggle}>
          + Add Other Cost
        </Button>
      </HStack>

      <Collapse in={isOpen} animateOpacity>
        <Box
          as="form"
          p={4}
          bg="purple.50"
          borderRadius="md"
          mt={2}
          onSubmit={(e) => {
            e.preventDefault();
            onClickAddOtherCost();
          }}
        >
          <Text mb={2} fontWeight="semibold">
            Add Other Cost
          </Text>
          <HStack>
            <Input
              placeholder="Enter description"
              width="60%"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              isRequired
              minLength={1}
            />
            <Input
              placeholder="$0.00"
              type="number"
              width="40%"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              isRequired
              min={0}
              step="0.01"
            />
            <Button
              colorScheme="purple"
              type="submit"
              isDisabled={!description.trim() || !amount}
            >
              ✓ Add
            </Button>
            <Button
              colorScheme="gray"
              type="button"
              aria-label="Close add other cost form"
              onClick={onToggle}
            >
              X
            </Button>
          </HStack>
        </Box>
      </Collapse>
      {loading ? (
        <Box textAlign="center" py="1rem" color="purple.600">
          <Spinner />
        </Box>
      ) : filteredAndSortedOtherCosts.length == 0 ? (
        <Text py="2rem" color="gray.500" textAlign="center">
          {allOtherCostsData.length === 0
            ? "No other costs added yet. Add your first cost!"
            : "No costs match your search criteria."}
        </Text>
      ) : (
        <>
          {filteredAndSortedOtherCosts.map((cost) => (
            <Box borderWidth="1px" p={4} rounded="md" key={cost.id} mt={4}>
              {editingId === cost.id ? (
                <HStack>
                  <Input
                    value={editDescription}
                    onChange={(e) =>
                      dispatch(setEditDescription(e.target.value))
                    }
                    flex={2}
                  />
                  <Input
                    value={editAmount}
                    onChange={(e) => dispatch(setEditAmount(e.target.value))}
                    type="number"
                    flex={1}
                  />
                  <IconButton
                    icon={<CheckIcon />}
                    colorScheme="purple"
                    onClick={() => handleUpdateOtherCost(cost.id)}
                    aria-label="Save"
                  />
                  <IconButton
                    icon={<CloseIcon />}
                    onClick={handleCancelEditing}
                    aria-label="Cancel"
                  />
                </HStack>
              ) : (
                <>
                  <HStack justifyContent="space-between" mt={2}>
                    <Text fontWeight="bold">{cost.Description}</Text>
                    <HStack>
                      <IconButton
                        icon={<EditIcon />}
                        size="sm"
                        aria-label="Edit"
                        onClick={() => handleStartEditing(cost)}
                      />
                      <IconButton
                        icon={<DeleteIcon />}
                        size="sm"
                        aria-label="Delete"
                        colorScheme="red"
                        onClick={() => handleDeleteOtherCost(cost.id)}
                      />
                    </HStack>
                  </HStack>
                  <Text color="purple.700" fontWeight="bold">
                    ${cost.Amount}
                  </Text>
                </>
              )}
            </Box>
          ))}
        </>
      )}
    </Box>
  );
};

export default OtherCosts;
