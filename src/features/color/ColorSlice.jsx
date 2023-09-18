import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ColorService from "./ColorServices";


export const getColors = createAsyncThunk(
    'colors/get-colors',
    async (thunkAPI) => {
        try {
            return await ColorService.getColors();
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const createColor = createAsyncThunk(
    'color/create-color',
    async (colorData, thunkAPI) => {
        try {
            return await ColorService.createColor(colorData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getColor = createAsyncThunk(
    'color/get-color',
    async (id, thunkAPI) => {
        try {
            return await ColorService.getColor(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const updateColor = createAsyncThunk(
    'color/update-color',
    async (color, thunkAPI) => {
        try {
            return await ColorService.updateColor(color);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const deleteColor = createAsyncThunk(
    'color/delete-color',
    async (id, thunkAPI) => {
        try {
            return await ColorService.deleteColor(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const resetState = createAction('Reset_all')


const initialState = {
    colors: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}


export const getColorSlice = createSlice({
    name: "color",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getColors.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getColors.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.colors = action.payload;
            })
            .addCase(getColors.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })


            .addCase(createColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createColor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdColor = action.payload;
            })
            .addCase(createColor.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })


            .addCase(getColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getColor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.colorName = action.payload.title;
            })
            .addCase(getColor.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })


            .addCase(deleteColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteColor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedColor = action.payload;
            })
            .addCase(deleteColor.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })


            .addCase(updateColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateColor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedColor = action.payload;
            })
            .addCase(updateColor.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })

            .addCase(resetState, () => initialState)
    },
})

export default getColorSlice.reducer;