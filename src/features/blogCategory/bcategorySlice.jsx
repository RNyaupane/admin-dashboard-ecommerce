import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BlogCategoryService from "./bcategoryService";

export const getBlogCategories = createAsyncThunk(
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

export const getSingleBlogCategory = createAsyncThunk(
    'blogCategory/get-category',
    async (id, thunkAPI) => {
        try {
            return await BlogCategoryService.getBlogCategory(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const updateBlogCategory = createAsyncThunk(
    'blogCategory/update-category',
    async (blogCat, thunkAPI) => {
        try {
            return await BlogCategoryService.updateBlogCategory(blogCat);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const deleteBlogCategory = createAsyncThunk(
    'blogCategory/delete-category',
    async (id, thunkAPI) => {
        try {
            return await BlogCategoryService.deleteBlogCategory(id);
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
            .addCase(getBlogCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBlogCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.blogCategories = action.payload;
            })
            .addCase(getBlogCategories.rejected, (state, action) => {
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


            .addCase(getSingleBlogCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSingleBlogCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.blogCatName = action.payload.title;
            })
            .addCase(getSingleBlogCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })


            .addCase(deleteBlogCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteBlogCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedBlogCategory = action.payload;
            })
            .addCase(deleteBlogCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })


            .addCase(updateBlogCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateBlogCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedBlogCategory = action.payload;
            })
            .addCase(updateBlogCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })

            .addCase(resetState, () => initialState)
    },
})

export default getBlogCategoriesSlice.reducer;