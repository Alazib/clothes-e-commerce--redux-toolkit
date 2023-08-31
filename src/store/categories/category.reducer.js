import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils"

export const CATEGORIES_INITIAL_STATE = {
  categories: [],
  isLoading: false,
  error: null,
}

export const fetchCategoriesThunk = createAsyncThunk(
  "categories/fetchFromFirestore",
  async () => {
    const categories = await getCategoriesAndDocuments()
    return categories
  }
)

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: CATEGORIES_INITIAL_STATE,
  extraReducers: (builder) => {
    builder.addCase(fetchCategoriesThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
      state.categories = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchCategoriesThunk.rejected, (state, action) => {
      state.error = action.error
    })
  },
})

export const { setCategories } = categoriesSlice.actions

export const categoriesReducer = categoriesSlice.reducer
