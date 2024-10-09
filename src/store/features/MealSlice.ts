import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the Meal type
interface Meal {
  id: number;
  name: string;
  image: string;
  instructions: string;
  rating: number;
}

interface MealsState {
  allMeals: Meal[];
  weekMeals: {
    week1: Meal[];
    week2: Meal[];
    week3: Meal[];
    week4: Meal[];
  };
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Fetch meals from the API
export const fetchMeals = createAsyncThunk("meals/fetchMeals", async () => {
  const response = await axios.get("https://dummyjson.com/recipes");
  return response.data.recipes;
});

const initialState: MealsState = {
  allMeals: [],
  weekMeals: {
    week1: [],
    week2: [],
    week3: [],
    week4: [],
  },
  status: "idle",
  error: null,
};

const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {
    addMealToWeek: (
      state,
      action: PayloadAction<{ week: keyof MealsState["weekMeals"]; meal: Meal }>
    ) => {
      const { week, meal } = action.payload;
      if (!state.weekMeals[week].find((m) => m.id === meal.id)) {
        state.weekMeals[week].push(meal);
      }
    },
    removeMealFromWeek: (
      state,
      action: PayloadAction<{
        week: keyof MealsState["weekMeals"];
        mealId: number;
      }>
    ) => {
      const { week, mealId } = action.payload;
      state.weekMeals[week] = state.weekMeals[week].filter(
        (meal) => meal.id !== mealId
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMeals.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allMeals = action.payload;
      })
      .addCase(fetchMeals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch meals";
      });
  },
});

export const { addMealToWeek, removeMealFromWeek } = mealsSlice.actions;

export default mealsSlice.reducer;
