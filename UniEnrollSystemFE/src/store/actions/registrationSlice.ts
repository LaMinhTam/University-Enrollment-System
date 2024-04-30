import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IClass } from "../../types/courseType";

type RegistrationTypes = {
    courseSelectedId: string;
    courseSelectedClasses: IClass[];
};

const initialState: RegistrationTypes = {
    courseSelectedId: "",
    courseSelectedClasses: [],
};

const registrationSlice = createSlice({
    name: "registration",
    initialState,
    reducers: {
        setCourseSelectedId: (state, action: PayloadAction<string>) => {
            state.courseSelectedId = action.payload;
        },
        setCourseSelectedClasses: (state, action: PayloadAction<IClass[]>) => {
            state.courseSelectedClasses = action.payload;
        },
    },
});

export const { setCourseSelectedId, setCourseSelectedClasses } =
    registrationSlice.actions;
export default registrationSlice.reducer;
