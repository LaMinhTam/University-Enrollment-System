import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IClass, ICourseRegistration } from "../../types/courseType";
import { IClassesEnrolled } from "../../types/classesEnrolledType";
import { IClassesEnrolledSchedule } from "../../types/commonType";

type RegistrationTypes = {
    registrationPeriod: {
        semester: number;
        year: number;
    };
    courses: {
        [key: string]: ICourseRegistration;
    } | null;
    registerClasses: IClassesEnrolled[];
    courseSelectedId: string;
    courseSelectedClasses: IClass[];
    storedCourseSelectedClasses: IClass[];
    classSchedule: IClass;
    classesEnrolledSchedule: IClassesEnrolledSchedule[];
    isFilterDuplicateSchedule: boolean;
    classSelectedId: string;
    courseChangeQuantityClassId: string;
    courseChangeQuantityId: string;
    courseSelectedCredit: number;
    isRemoveClass: boolean;
};

const initialState: RegistrationTypes = {
    registrationPeriod: {
        semester: 0,
        year: 0,
    },
    courses: null,
    registerClasses: [],
    courseSelectedId: "",
    courseSelectedClasses: [],
    storedCourseSelectedClasses: [],
    classSchedule: {} as IClass,
    classesEnrolledSchedule: [],
    isFilterDuplicateSchedule: false,
    classSelectedId: "",
    courseChangeQuantityClassId: "",
    courseSelectedCredit: 0,
    isRemoveClass: false,
    courseChangeQuantityId: "",
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
        setCourses: (
            state,
            action: PayloadAction<{ [key: string]: ICourseRegistration } | null>
        ) => {
            state.courses = action.payload;
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
        setCourseChangeQuantityClassId: (
            state,
            action: PayloadAction<string>
        ) => {
            state.courseChangeQuantityClassId = action.payload;
        },
        setCourseSelectedCredit: (state, action: PayloadAction<number>) => {
            state.courseSelectedCredit = action.payload;
        },
        setIsRemoveClass: (state, action: PayloadAction<boolean>) => {
            state.isRemoveClass = action.payload;
        },
        setCourseChangeQuantityId: (state, action: PayloadAction<string>) => {
            state.courseChangeQuantityId = action.payload;
        },
    },
});

export const {
    setRegistrationPeriod,
    setCourses,
    setRegisterClasses,
    setCourseSelectedId,
    setCourseSelectedClasses,
    setStoredSelectedClasses,
    setClassSchedule,
    setClassesEnrolledSchedule,
    setIsFilterDuplicateSchedule,
    setClassSelectedId,
    setCourseChangeQuantityClassId,
    setCourseSelectedCredit,
    setIsRemoveClass,
    setCourseChangeQuantityId,
} = registrationSlice.actions;
export default registrationSlice.reducer;
