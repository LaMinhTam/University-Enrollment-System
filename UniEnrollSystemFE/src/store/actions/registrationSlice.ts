import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IClass } from "../../types/courseType";
import { IClassSchedule } from "../../types/scheduleType";
import { IClassesEnrolled } from "../../types/classesEnrolledType";

type RegistrationTypes = {
    registerClasses: IClassesEnrolled[];
    courseSelectedId: string;
    courseSelectedClasses: IClass[];
    classSchedule: IClassSchedule[];
    classScheduleOtherData: IClassesEnrolled;
};

const initialState: RegistrationTypes = {
    registerClasses: [],
    courseSelectedId: "",
    courseSelectedClasses: [],
    classSchedule: [],
    classScheduleOtherData: {
        id: "",
        courseId: "",
        courseName: "",
        semester: 0,
        year: 0,
        maxCapacity: 0,
        status: "",
    },
};

const registrationSlice = createSlice({
    name: "registration",
    initialState,
    reducers: {
        setRegisterClasses: (
            state,
            action: PayloadAction<IClassesEnrolled[]>
        ) => {
            state.registerClasses = action.payload;
        },
        setCourseSelectedId: (state, action: PayloadAction<string>) => {
            state.courseSelectedId = action.payload;
        },
        setCourseSelectedClasses: (state, action: PayloadAction<IClass[]>) => {
            state.courseSelectedClasses = action.payload;
        },
        setClassSchedule: (state, action: PayloadAction<IClassSchedule[]>) => {
            state.classSchedule = action.payload;
        },
        setClassScheduleOtherData: (
            state,
            action: PayloadAction<IClassesEnrolled>
        ) => {
            state.classScheduleOtherData = action.payload;
        },
    },
});

export const {
    setRegisterClasses,
    setCourseSelectedId,
    setCourseSelectedClasses,
    setClassSchedule,
    setClassScheduleOtherData,
} = registrationSlice.actions;
export default registrationSlice.reducer;
