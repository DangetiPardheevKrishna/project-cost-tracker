import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db, auth } from "../firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  query,
  where,
  getDoc,
} from "firebase/firestore";

// Helper function to get current user ID
const getCurrentUserId = () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");
  return user.uid;
};

// Fetch items for current user
export const fetchItems = createAsyncThunk(
  "Items/fetchItems",
  async (_, { rejectWithValue }) => {
    try {
      const userId = getCurrentUserId();
      const q = query(collection(db, "Items"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add new item for current user
export const addItem = createAsyncThunk(
  "Items/addItem",
  async ({ name, cost }, { rejectWithValue }) => {
    try {
      const userId = getCurrentUserId();
      const docRef = await addDoc(collection(db, "Items"), {
        Name: name,
        Cost: parseFloat(cost),
        userId,
        createdAt: new Date().toISOString(),
      });
      return {
        id: docRef.id,
        Name: name,
        Cost: parseFloat(cost),
        userId,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update existing item (with user validation)
export const updateItem = createAsyncThunk(
  "Items/updateItem",
  async ({ id, name, cost }, { rejectWithValue }) => {
    try {
      const userId = getCurrentUserId();

      // Verify item belongs to user before updating
      const itemRef = doc(db, "Items", id);
      const itemSnap = await getDoc(itemRef);

      if (!itemSnap.exists() || itemSnap.data().userId !== userId) {
        throw new Error("Unauthorized to update this item");
      }

      await updateDoc(itemRef, {
        Name: name,
        Cost: parseFloat(cost),
      });

      return { id, Name: name, Cost: parseFloat(cost) };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete item (with user validation)
export const deleteItem = createAsyncThunk(
  "Items/deleteItem",
  async (id, { rejectWithValue }) => {
    try {
      const userId = getCurrentUserId();

      // Verify item belongs to user before deleting
      const itemRef = doc(db, "Items", id);
      const itemSnap = await getDoc(itemRef);

      if (!itemSnap.exists() || itemSnap.data().userId !== userId) {
        throw new Error("Unauthorized to delete this item");
      }

      await deleteDoc(itemRef);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userItemsSlice = createSlice({
  name: "userItems",
  initialState: {
    items: [],
    loading: false,
    error: null,
    editingId: null,
    editName: "",
    editCost: "",
  },
  reducers: {
    startEditing: (state, action) => {
      const item = action.payload;
      state.editingId = item.id;
      state.editName = item.Name;
      state.editCost = item.Cost.toString();
    },
    cancelEditing: (state) => {
      state.editingId = null;
      state.editName = "";
      state.editCost = "";
    },
    setEditName: (state, action) => {
      state.editName = action.payload;
    },
    setEditCost: (state, action) => {
      state.editCost = action.payload;
    },
    clearUserItems: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.editingId = null;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export const {
  startEditing,
  cancelEditing,
  setEditName,
  setEditCost,
  clearUserItems,
} = userItemsSlice.actions;

export default userItemsSlice.reducer;
