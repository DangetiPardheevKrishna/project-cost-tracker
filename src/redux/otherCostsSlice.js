import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

export const fetchOtherCosts = createAsyncThunk(
  "otherCosts/fetchOtherCosts",
  async () => {
    const querySnapshot = await getDocs(collection(db, "otherCosts"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }
);

export const addOtherCost = createAsyncThunk(
  "otherCosts/addOtherCost",
  async ({ description, amount }) => {
    const docRef = await addDoc(collection(db, "otherCosts"), {
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
  "otherCosts/updateOtherCost",
  async ({ id, description, amount }) => {
    await updateDoc(doc(db, "otherCosts", id), {
      Description: description,
      Amount: parseFloat(amount),
    });
    return { id, Description: description, Amount: parseFloat(amount) };
  }
);

export const deleteOtherCost = createAsyncThunk(
  "otherCosts/deleteOtherCost",
  async (id) => {
    await deleteDoc(doc(db, "otherCosts", id));
    return id;
  }
);

const otherCostsSlice = createSlice({
  name: "otherCosts",
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
} = otherCostsSlice.actions;

export default otherCostsSlice.reducer;
