import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ScheduleType = {
    targetDate: string;
    dates?: string[];
};

const initialState: ScheduleType = {
    targetDate: new Date().toISOString(),
    dates: [],
};

const scheduleSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setTargetDate(state, action: PayloadAction<string>) {
            state.targetDate = action.payload;
        },
        setDates(state, action: PayloadAction<string[]>) {
            state.dates = action.payload;
        },
    },
});

export const { setTargetDate, setDates } = scheduleSlice.actions;
export default scheduleSlice.reducer;
