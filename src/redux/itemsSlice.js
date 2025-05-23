import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { v4 as uuidv4 } from "uuid";

// Async thunk for fetching items
export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async (_, { dispatch }) => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          const q = query(
            collection(db, "Items"),
            where("UserId", "==", user.uid)
          );
          const unsubscribeSnapshot = onSnapshot(q, (querySnapshot) => {
            const items = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            dispatch(itemsSlice.actions.setItems(items));
            resolve(items);
          });
          return () => unsubscribeSnapshot();
        }
      });
    });
  }
);

// Async thunk for adding an item
// export const addItem = createAsyncThunk(
//   "items/addItem",
//   async ({ name, cost }, { rejectWithValue }) => {
//     try {
//       const userId = auth.currentUser.uid;
//       const id = uuidv4();
//       await setDoc(doc(db, "Items", id), {
//         Cost: parseFloat(cost),
//         Name: name,
//         UserId: userId,
//       });
//       return { id, Cost: parseFloat(cost), Name: name, UserId: userId };
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const addItem = createAsyncThunk(
  "items/addItem",
  async ({ name, cost }, { rejectWithValue }) => {
    try {
      const userId = auth.currentUser.uid;
      const id = uuidv4(); // Make ID deterministic

      // Check if item already exists
      const existing = await getDoc(doc(db, "Items", id));
      if (existing.exists()) {
        return rejectWithValue("Item already exists");
      }

      await setDoc(doc(db, "Items", id), {
        Cost: parseFloat(cost),
        Name: name,
        UserId: userId,
      });

      return { id, Cost: parseFloat(cost), Name: name, UserId: userId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// Async thunk for updating an item
export const updateItem = createAsyncThunk(
  "items/updateItem",
  async ({ id, name, cost }, { rejectWithValue }) => {
    try {
      await updateDoc(doc(db, "Items", id), {
        Name: name,
        Cost: parseFloat(cost),
      });
      return { id, Name: name, Cost: parseFloat(cost) };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for deleting an item
export const deleteItem = createAsyncThunk(
  "items/deleteItem",
  async (id, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, "Items", id));
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
    loading: true,
    error: null,
    editingId: null,
    editName: "",
    editCost: "",
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    },
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
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
  setItems,
  startEditing,
  cancelEditing,
  setEditName,
  setEditCost,
} = itemsSlice.actions;

export default itemsSlice.reducer;
