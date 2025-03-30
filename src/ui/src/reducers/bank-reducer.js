import {
    createAsyncThunk,
    createSelector,
    createSlice,
} from "@reduxjs/toolkit";
import bankService from "../services/bank-service";

export const getCustomerDetails = createAsyncThunk(
    "getCustomerDetails",
    async (obj) => {
        const customerData = await bankService.getCustomerDetails(obj.userName, obj.password);
        return customerData["data"];
    }
);

export const payCreditCardBiils = createAsyncThunk(
    "payCreditCardBiils",
    async (obj) => {
        const data = await bankService.payCreditCardBills(obj.userId, obj.cardNo, obj.amount, obj.accountNo );
        return data["message"];
    }
);

const customerDataSlice = createSlice({
    name: "customer-data",
    initialState: {
        data: {},
        message: ""
    },
    reducers: {
        setCustomerData: (state, action) => {
            state.data = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCustomerDetails.fulfilled, (state, action) => {
            state.data = action.payload;
        });
        builder.addCase(payCreditCardBiils.fulfilled, (state, action) => {
            state.message = action.payload;
        });
    },
});

export const customerDataSelector = createSelector(
    (state) => state["customer-data"],  // Fix the selector path
    (customerData) => customerData.data.payload // Extract the data property
);

export const { setCustomerData } = customerDataSlice.actions;
export default customerDataSlice.reducer;
