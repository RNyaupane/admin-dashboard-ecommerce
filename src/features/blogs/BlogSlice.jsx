import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BlogService from "./BlogService";

export const getBlogs = createAsyncThunk(
    'blogs/get-blogs',
    async (thunkAPI) => {
        try {
            return await BlogService.getBlogs();
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const createBlogs = createAsyncThunk(
    'blog/create-blogs',
    async (blogData, thunkAPI) => {
        try {
            return await BlogService.createBlog(blogData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getBlog = createAsyncThunk(
    'blog/get-blog',
    async (id, thunkAPI) => {
        try {
            return await BlogService.getBlog(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const updateBlog = createAsyncThunk(
    'blog/update-blog',
    async (blog, thunkAPI) => {
        try {
            return await BlogService.updateBlog(blog);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const deleteBlog = createAsyncThunk(
    'blog/delete-blog',
    async (id, thunkAPI) => {
        try {
            return await BlogService.deleteBlog(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const resetState = createAction('Reset_all')

const initialState = {
    blogs: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}


export const getBlogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBlogs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBlogs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.blogs = action.payload;
            })
            .addCase(getBlogs.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })


            .addCase(createBlogs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBlogs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.getBlog = action.payload;
            })
            .addCase(createBlogs.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })

            .addCase(getBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.blogName = action.payload.title;
                state.blogCategory = action.payload.category;
                state.blogDesc = action.payload.description;
                state.blogImage = action.payload.image; 
            })
            .addCase(getBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })

            .addCase(updateBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedBlog = action.payload;
            })
            .addCase(updateBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })


            .addCase(deleteBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedBlog = action.payload;
            })
            .addCase(deleteBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })

            .addCase(resetState, () => initialState)
    },
})

export default getBlogSlice.reducer;