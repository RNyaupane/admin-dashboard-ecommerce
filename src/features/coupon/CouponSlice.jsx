import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import CouponService from "./CouponService";

export const getCoupons = createAsyncThunk(
    'Coupon/get-Coupons',
    async (thunkAPI) => {
        try {
            return await CouponService.getCoupons();
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const createCoupon = createAsyncThunk(
    'Coupon/create-Coupon',
    async (CouponData, thunkAPI) => {
        try {
            return await CouponService.createCoupon(CouponData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getCoupon = createAsyncThunk(
    'Coupon/get-coupon',
    async (id, thunkAPI) => {
        try {
            return await CouponService.getCoupon(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const updateCoupon = createAsyncThunk(
    'Coupon/update-coupon',
    async (coupon, thunkAPI) => {
        try {
            return await CouponService.updateCoupon(coupon);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const deleteCoupon = createAsyncThunk(
    'Coupon/delete-coupon',
    async (id, thunkAPI) => {
        try {
            return await CouponService.deleteCoupon(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const resetState = createAction('Reset_all')

const initialState = {
    coupons: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}


export const CouponSlice = createSlice({
    name: "coupons",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCoupons.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCoupons.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.coupons = action.payload;
            })
            .addCase(getCoupons.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })

            .addCase(getCoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.couponName = action.payload.name;
                state.couponExpiry = action.payload.expiry;
                state.couponDiscount = action.payload.discount;
            })
            .addCase(getCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })


            .addCase(createCoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdCoupon = action.payload;
            })
            .addCase(createCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })


            .addCase(deleteCoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedCoupon = action.payload;
            })
            .addCase(deleteCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })

            .addCase(updateCoupon.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedCoupon = action.payload;
            })
            .addCase(updateCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })

            .addCase(resetState, () => initialState)
    },
})

export default CouponSlice.reducer;