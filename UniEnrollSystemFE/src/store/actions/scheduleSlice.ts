import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ScheduleType = {
    targetDate: string;
    dates?: string[];
    scheduleType: number;
};

const initialState: ScheduleType = {
    targetDate: new Date().toISOString(),
    dates: [],
    scheduleType: 0,
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
        setScheduleType(state, action: PayloadAction<number>) {
            state.scheduleType = action.payload;
        },
    },
});

export const { setTargetDate, setDates, setScheduleType } =
    scheduleSlice.actions;
export default scheduleSlice.reducer;
