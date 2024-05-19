import { createSlice } from "@reduxjs/toolkit";

type PaymentType = {
    paymentTime: string;
};

const initialState: PaymentType = {
    paymentTime: "0",
};

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        setPaymentTime: (state, action) => {
            state.paymentTime = action.payload;
        },
    },
});

export const { setPaymentTime } = paymentSlice.actions;
export default paymentSlice.reducer;
