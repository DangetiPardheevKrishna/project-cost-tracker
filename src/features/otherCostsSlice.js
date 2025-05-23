import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

const getCurrentUserId = () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");
  return user.uid;
};
export const fetchOtherCosts = createAsyncThunk(
  "OtherCosts/fetchOtherCosts",
  async () => {
    const userId = getCurrentUserId();
    const q = query(
      collection(db, "OtherCosts"),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }
);

export const addOtherCost = createAsyncThunk(
  "OtherCosts/addOtherCost",
  async ({ description, amount }) => {
    const userId = getCurrentUserId();
    const docRef = await addDoc(collection(db, "OtherCosts"), {
      userId,
      Description: description,
      Amount: parseFloat(amount),
      createdAt: new Date().toISOString(),
    });
    return {
      id: docRef.id,
      Description: description,
      Amount: parseFloat(amount),
    };
  }
);

export const updateOtherCost = createAsyncThunk(
  "OtherCosts/updateOtherCost",
  async ({ id, description, amount }) => {
    await updateDoc(doc(db, "OtherCosts", id), {
      Description: description,
      Amount: parseFloat(amount),
    });
    return { id, Description: description, Amount: parseFloat(amount) };
  }
);

export const deleteOtherCost = createAsyncThunk(
  "OtherCosts/deleteOtherCost",
  async ({ id }) => {
    await deleteDoc(doc(db, "OtherCosts", id));
    return id;
  }
);

export const otherCostsSlice = createSlice({
  name: "OtherCosts",
  initialState: {
    items: [],
    loading: false,
    editingId: null,
    editDescription: "",
    editAmount: "",
  },
  reducers: {
    startEditing: (state, action) => {
      state.editingId = action.payload.id;
      state.editDescription = action.payload.Description;
      state.editAmount = action.payload.Amount.toString();
    },
    cancelEditing: (state) => {
      state.editingId = null;
      state.editDescription = "";
      state.editAmount = "";
    },
    setEditDescription: (state, action) => {
      state.editDescription = action.payload;
    },
    setEditAmount: (state, action) => {
      state.editAmount = action.payload;
    },
    clearUserCosts: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOtherCosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOtherCosts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchOtherCosts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addOtherCost.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateOtherCost.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.editingId = null;
        state.editDescription = "";
        state.editAmount = "";
      })
      .addCase(deleteOtherCost.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export const {
  startEditing,
  cancelEditing,
  setEditDescription,
  setEditAmount,
  clearUserCosts,
} = otherCostsSlice.actions;

export default otherCostsSlice.reducer;
