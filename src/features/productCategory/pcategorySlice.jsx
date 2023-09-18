import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductCategoryService from "./pcategoryService";

export const getProductCategories = createAsyncThunk(
    'productCategory/get-categories',
    async (thunkAPI) => {
        try {
            return await ProductCategoryService.getProductCategories();
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const createCategory = createAsyncThunk(
    'productCategory/create-category',
    async (categoryData, thunkAPI) => {
        try {
            return await ProductCategoryService.createProductCategory(categoryData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getProductCategory = createAsyncThunk(
    'productCategory/get-category',
    async (id, thunkAPI) => {
        try {
            return await ProductCategoryService.getProductCategory(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const updateProductCategory = createAsyncThunk(
    'productCategory/update-category',
    async (categoryData, thunkAPI) => {
        try {
            return await ProductCategoryService.updateProductCategory(categoryData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const deleteProductCategory = createAsyncThunk(
    'productCategory/delete-category',
    async (id, thunkAPI) => {
        try {
            return await ProductCategoryService.deleteProductCategory(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const resetState = createAction('Reset_all')

const initialState = {
    productCategories: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}


export const productCategorySlice = createSlice({
    name: "productCategories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProductCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.productCategories = action.payload;
            })
            .addCase(getProductCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(createCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.productCategories = action.payload;
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })


            .addCase(updateProductCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProductCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedCategory = action.payload;
            })
            .addCase(updateProductCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })


            .addCase(deleteProductCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProductCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedCategory = action.payload;
            })
            .addCase(deleteProductCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })


            .addCase(getProductCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProductCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.categoryName = action.payload.title;
            })
            .addCase(getProductCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState)

    },
})

export default productCategorySlice.reducer;