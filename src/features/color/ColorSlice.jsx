import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
    },
})

export default getColorSlice.reducer;