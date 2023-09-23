import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const getUserFromLocalStorage = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')) : null

const initialState = {
    user: getUserFromLocalStorage,
    orders: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

export const login = createAsyncThunk('auth/admin-login', async (user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


export const getOrders = createAsyncThunk(
    'order/get-orders',
    async (thunkAPI) => {
        try {
            return await authService.getOrder();
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getOrderByUser = createAsyncThunk(
    'order/get-orderByUser',
    async (id, thunkAPI) => {
        try {
            return await authService.getOrderByUser(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.message = "Login Successfull"
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.user = null;
                state.message = "Login Rejected"
            })


            .addCase(getOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.orders = action.payload;
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = "Rejected"
            })

            .addCase(getOrderByUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrderByUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.orderByUser = action.payload;
                state.message = ""
            })
            .addCase(getOrderByUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = "Rejected"
            })
    },
});

export default authSlice.reducer;