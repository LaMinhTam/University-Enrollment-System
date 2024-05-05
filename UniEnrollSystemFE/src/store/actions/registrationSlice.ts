import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IClass } from "../../types/courseType";
import { IClassesEnrolled } from "../../types/classesEnrolledType";
import { IClassesEnrolledSchedule } from "../../types/commonType";

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
    classesEnrolledSchedule: IClassesEnrolledSchedule[];
    isFilterDuplicateSchedule: boolean;
    classSelectedId: string;
    courseChangeQuantityId: string;
    courseSelectedCredit: number;
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
    isFilterDuplicateSchedule: false,
    classSelectedId: "",
    courseChangeQuantityId: "",
    courseSelectedCredit: 0,
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
            action: PayloadAction<IClassesEnrolledSchedule[]>
        ) => {
            state.classesEnrolledSchedule = action.payload;
        },
        setIsFilterDuplicateSchedule: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.isFilterDuplicateSchedule = action.payload;
        },
        setClassSelectedId: (state, action: PayloadAction<string>) => {
            state.classSelectedId = action.payload;
        },
        setCourseChangeQuantityId: (state, action: PayloadAction<string>) => {
            state.courseChangeQuantityId = action.payload;
        },
        setCourseSelectedCredit: (state, action: PayloadAction<number>) => {
            state.courseSelectedCredit = action.payload;
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
    setIsFilterDuplicateSchedule,
    setClassSelectedId,
    setCourseChangeQuantityId,
    setCourseSelectedCredit,
} = registrationSlice.actions;
export default registrationSlice.reducer;
