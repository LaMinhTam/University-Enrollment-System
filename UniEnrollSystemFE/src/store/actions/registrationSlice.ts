import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IClass } from "../../types/courseType";
import { IClassesEnrolled } from "../../types/classesEnrolledType";

type RegistrationTypes = {
    registerClasses: IClassesEnrolled[];
    courseSelectedId: string;
    courseSelectedClasses: IClass[];
    storedCourseSelectedClasses: IClass[];
    classSchedule: IClass;
    registrationPeriod: {
        semester: number;
        year: number;
    };
    classesEnrolledSchedule: {
        classType: string;
        dayOfWeek: number;
        timeSlot: string;
        group?: number;
    }[];
};

const initialState: RegistrationTypes = {
    registrationPeriod: {
        semester: 0,
        year: 0,
    },
    registerClasses: [],
    courseSelectedId: "",
    courseSelectedClasses: [],
    storedCourseSelectedClasses: [],
    classSchedule: {} as IClass,
    classesEnrolledSchedule: [],
};

const registrationSlice = createSlice({
    name: "registration",
    initialState,
    reducers: {
        setRegistrationPeriod: (
            state,
            action: PayloadAction<{ semester: number; year: number }>
        ) => {
            state.registrationPeriod = action.payload;
        },
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
        setStoredSelectedClasses: (state, action: PayloadAction<IClass[]>) => {
            state.storedCourseSelectedClasses = action.payload;
        },
        setClassSchedule: (state, action: PayloadAction<IClass>) => {
            state.classSchedule = action.payload;
        },
        setClassesEnrolledSchedule: (
            state,
            action: PayloadAction<
                {
                    classType: string;
                    dayOfWeek: number;
                    timeSlot: string;
                    group?: number;
                }[]
            >
        ) => {
            state.classesEnrolledSchedule = action.payload;
        },
    },
});

export const {
    setRegistrationPeriod,
    setRegisterClasses,
    setCourseSelectedId,
    setCourseSelectedClasses,
    setStoredSelectedClasses,
    setClassSchedule,
    setClassesEnrolledSchedule,
} = registrationSlice.actions;
export default registrationSlice.reducer;
