import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IClassesEnrolledSchedule } from "../../types/commonType";
import { IExistedSchedule } from "../../types/scheduleType";

type ModalType = {
    isOpenWatchScheduleModal: boolean;
    isOpenScheduleDuplicateModal: boolean;
    isOpenPredictScholarshipModal: boolean;
    isOpenPaymentCheckedModal: boolean;
    isOpenWaitingCourseModal: boolean;
    checkedPaymentParams: string;
    classSelectedSchedule: IClassesEnrolledSchedule[];
    duplicateSchedule: IExistedSchedule[];
};

const initialState: ModalType = {
    isOpenWatchScheduleModal: false,
    isOpenScheduleDuplicateModal: false,
    isOpenPredictScholarshipModal: false,
    isOpenPaymentCheckedModal: false,
    isOpenWaitingCourseModal: false,
    checkedPaymentParams: "",
    classSelectedSchedule: [],
    duplicateSchedule: [],
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setIsOpenWatchScheduleModal: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.isOpenWatchScheduleModal = action.payload;
        },
        setClassSelectedSchedule: (
            state,
            action: PayloadAction<IClassesEnrolledSchedule[]>
        ) => {
            state.classSelectedSchedule = action.payload;
        },
        setIsOpenScheduleDuplicateModal: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.isOpenScheduleDuplicateModal = action.payload;
        },
        setIsOpenPredictScholarshipModal: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.isOpenPredictScholarshipModal = action.payload;
        },
        setIsOpenCheckedPaymentModal: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.isOpenPaymentCheckedModal = action.payload;
        },
        setIsOpenWaitingCourseModal: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.isOpenWaitingCourseModal = action.payload;
        },
        setCheckedPaymentParams: (state, action: PayloadAction<string>) => {
            state.checkedPaymentParams = action.payload;
        },
        setDuplicateSchedule: (
            state,
            action: PayloadAction<IExistedSchedule[]>
        ) => {
            state.duplicateSchedule = action.payload;
        },
    },
});

export const {
    setIsOpenWatchScheduleModal,
    setClassSelectedSchedule,
    setIsOpenScheduleDuplicateModal,
    setIsOpenCheckedPaymentModal,
    setCheckedPaymentParams,
    setDuplicateSchedule,
    setIsOpenPredictScholarshipModal,
    setIsOpenWaitingCourseModal,
} = modalSlice.actions;
export default modalSlice.reducer;
