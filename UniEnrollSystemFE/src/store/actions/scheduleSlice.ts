import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ScheduleType = {
    targetDate: Date;
    dates?: string[];
};

const initialState: ScheduleType = {
    targetDate: new Date(),
    dates: [],
};

const scheduleSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setTargetDate(state, action: PayloadAction<Date>) {
            state.targetDate = action.payload;
        },
        setDates(state, action: PayloadAction<string[]>) {
            state.dates = action.payload;
        },
    },
});

export const { setTargetDate, setDates } = scheduleSlice.actions;
export default scheduleSlice.reducer;
