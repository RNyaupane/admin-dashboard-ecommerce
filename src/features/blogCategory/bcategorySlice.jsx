import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BlogCategoryService from "./bcategoryService";

export const getBlogCategory = createAsyncThunk(
    'blogCategory/get-categories',
    async (thunkAPI) => {
        try {
            return await BlogCategoryService.getBlogCategories();
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const createBlogCategory = createAsyncThunk(
    'blogCategory/create-category',
    async (blogData, thunkAPI) => {
        try {
            return await BlogCategoryService.createBlogCategory(blogData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const resetState = createAction('Reset_all')

const initialState = {
    blogCategories: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}


export const getBlogCategoriesSlice = createSlice({
    name: "blogCategory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBlogCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBlogCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.blogCategories = action.payload;
            })
            .addCase(getBlogCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(createBlogCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBlogCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdBlogCategory = action.payload;
            })
            .addCase(createBlogCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState)
    },
})

export default getBlogCategoriesSlice.reducer;