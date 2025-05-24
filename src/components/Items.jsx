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
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchItems,
  addItem,
  updateItem,
  deleteItem,
  startEditing,
  cancelEditing,
  setEditName,
  setEditCost,
} from "../features/itemsSlice";

const Items = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [itemName, setItemName] = useState("");
  const [cost, setItemCost] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");
  const toast = useToast();
  const [isAdding, setIsAdding] = useState(false);

  // Redux state and dispatch
  const dispatch = useDispatch();
  const {
    items: allItemsData,
    loading,
    editingId,
    editName,
    editCost,
  } = useSelector((state) => state.items);

  // Fetch items on component mount

  useEffect(() => {
    dispatch(fetchItems());
  }, []);

  // Filter and sort items
  const filteredAndSortedItems = React.useMemo(() => {
    let items = [...allItemsData];

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      items = items.filter(
        (item) =>
          item.Name.toLowerCase().includes(term) ||
          item.Cost.toString().includes(term)
      );
    }

    // Sorting
    switch (sortBy) {
      case "name-asc":
        items.sort((a, b) => a.Name.localeCompare(b.Name));
        break;
      case "name-desc":
        items.sort((a, b) => b.Name.localeCompare(a.Name));
        break;
      case "cost-asc":
        items.sort((a, b) => a.Cost - b.Cost);
        break;
      case "cost-desc":
        items.sort((a, b) => b.Cost - a.Cost);
        break;
      default:
        break;
    }

    return items;
  }, [allItemsData, searchTerm, sortBy]);

  const onClickAddItem = async () => {
    if (isAdding) return;
    setIsAdding(true);

    if (!itemName || !cost) {
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
      await dispatch(addItem({ name: itemName, cost })).unwrap();
      dispatch(fetchItems());

      setItemName("");
      setItemCost("");
      onToggle();
      toast({
        title: "Success",
        description: "Item added successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Error adding item: ", error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await dispatch(deleteItem(id)).unwrap();
      toast({
        title: "Success",
        description: "Item deleted successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete item",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Error deleting item: ", error);
    }
  };

  const handleStartEditing = (item) => {
    dispatch(startEditing(item));
  };

  const handleCancelEditing = () => {
    dispatch(cancelEditing());
  };

  const handleUpdateItem = async (id) => {
    if (!editName || !editCost) {
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
        updateItem({ id, name: editName, cost: editCost })
      ).unwrap();
      toast({
        title: "Success",
        description: "Item updated successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update item",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Error updating item: ", error);
    }
  };

  return (
    <Box
      mx={["2rem", "6rem", "10rem"]}
      p="1.4rem"
      border="1px"
      borderColor="#B794F4"
      rounded="8px"
      shadow="md"
    >
      <Heading size="md" mb={4}>
        Project Items
      </Heading>
      <HStack mb={4} spacing={4}>
        <Input
          placeholder="Search items..."
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
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="cost-asc">Cost (Low-High)</option>
          <option value="cost-desc">Cost (High-Low)</option>
        </Select>
        <Button colorScheme="purple" onClick={onToggle}>
          + Add Item
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
            onClickAddItem();
          }}
        >
          <Text mb={2} fontWeight="semibold">
            Add Items
          </Text>
          <HStack>
            <Input
              placeholder="Enter item name"
              width="60%"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              isRequired
              minLength={1}
            />
            <Input
              placeholder="$0.00"
              type="number"
              width="40%"
              value={cost}
              onChange={(e) => setItemCost(e.target.value)}
              isRequired
              min={0}
              step="0.01"
            />
            <Button
              colorScheme="purple"
              type="submit"
              isDisabled={!itemName.trim() || !cost}
            >
              ✓ Add
            </Button>
            <Button
              colorScheme="gray"
              type="button"
              aria-label="Close add item form"
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
      ) : filteredAndSortedItems.length == 0 ? (
        <Text py="2rem" color="gray.500" textAlign="center">
          {allItemsData.length === 0
            ? "No items added yet. Add your first item!"
            : "No items match your search criteria."}
        </Text>
      ) : (
        <>
          {filteredAndSortedItems.map((eachItem) => (
            <Box borderWidth="1px" p={4} rounded="md" key={eachItem.id} mt={4}>
              {editingId === eachItem.id ? (
                <HStack>
                  <Input
                    value={editName}
                    onChange={(e) => dispatch(setEditName(e.target.value))}
                    flex={2}
                  />
                  <Input
                    value={editCost}
                    onChange={(e) => dispatch(setEditCost(e.target.value))}
                    type="number"
                    flex={1}
                  />
                  <IconButton
                    icon={<CheckIcon />}
                    colorScheme="purple"
                    onClick={() => handleUpdateItem(eachItem.id)}
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
                    <Text fontWeight="bold">{eachItem.Name}</Text>
                    <HStack>
                      <IconButton
                        icon={<EditIcon />}
                        size="sm"
                        aria-label="Edit"
                        onClick={() => handleStartEditing(eachItem)}
                      />
                      <IconButton
                        icon={<DeleteIcon />}
                        size="sm"
                        aria-label="Delete"
                        colorScheme="red"
                        onClick={() => handleDeleteItem(eachItem.id)}
                      />
                    </HStack>
                  </HStack>
                  <Text color="purple.700" fontWeight="bold">
                    ${eachItem.Cost}
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

export default Items;
