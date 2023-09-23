import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import EnquiryService from "./enquiryService";

export const getEnquiry = createAsyncThunk(
    'Enquiry/get-enquiries',
    async (thunkAPI) => {
        try {
            return await EnquiryService.getEnquiry();
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)


export const deleteAEnquiry = createAsyncThunk(
    'Enquiry/delete-enquiry',
    async (id, thunkAPI) => {
        try {
            return await EnquiryService.deleteAEnquiry(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const updateAEnquiry = createAsyncThunk(
    'Enquiry/update-enquiry',
    async (enq, thunkAPI) => {
        try {
            return await EnquiryService.updateAEnquiry(enq);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)


export const resetState = createAction('Reset_all')


const initialState = {
    enquiries: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}


export const getEnquiriesSlice = createSlice({
    name: "blogCategory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getEnquiry.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getEnquiry.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.enquiries = action.payload;
            })
            .addCase(getEnquiry.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })


            .addCase(deleteAEnquiry.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteAEnquiry.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedEnquiry = action.payload;
            })
            .addCase(deleteAEnquiry.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })

            .addCase(updateAEnquiry.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateAEnquiry.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedEnquiry = action.payload;
            })
            .addCase(updateAEnquiry.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })

            .addCase(resetState, () => initialState)

    },
})

export default getEnquiriesSlice.reducer;