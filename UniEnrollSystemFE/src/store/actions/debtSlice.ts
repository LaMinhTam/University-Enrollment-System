import { createSlice } from "@reduxjs/toolkit";

type DebtType = {
    debtTime: string;
};

const initialState: DebtType = {
    debtTime: "0",
};

const debtSlice = createSlice({
    name: "debt",
    initialState,
    reducers: {
        setDebtTime: (state, action) => {
            state.debtTime = action.payload;
        },
    },
});

export const { setDebtTime } = debtSlice.actions;
export default debtSlice.reducer;
