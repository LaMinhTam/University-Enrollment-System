import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IClassesEnrolledSchedule, IReceiptData } from "../../types/commonType";
import { IExistedSchedule } from "../../types/scheduleType";

type ModalType = {
    isOpenWatchScheduleModal: boolean;
    isOpenScheduleDuplicateModal: boolean;
    isOpenPredictScholarshipModal: boolean;
    isOpenPaymentCheckedModal: boolean;
    isOpenWaitingCourseModal: boolean;
    isOpenReceiptModal: boolean;
    checkedPaymentParams: string;
    classSelectedSchedule: IClassesEnrolledSchedule[];
    duplicateSchedule: IExistedSchedule[];
    receiptData: IReceiptData;
};

const initialState: ModalType = {
    isOpenWatchScheduleModal: false,
    isOpenScheduleDuplicateModal: false,
    isOpenPredictScholarshipModal: false,
    isOpenPaymentCheckedModal: false,
    isOpenWaitingCourseModal: false,
    isOpenReceiptModal: false,
    checkedPaymentParams: "",
    classSelectedSchedule: [],
    duplicateSchedule: [],
    receiptData: {} as IReceiptData,
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
        setIsOpenReceiptModal: (state, action: PayloadAction<boolean>) => {
            state.isOpenReceiptModal = action.payload;
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
        setReceiptData: (state, action: PayloadAction<IReceiptData>) => {
            state.receiptData = action.payload;
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
    setIsOpenReceiptModal,
    setReceiptData,
} = modalSlice.actions;
export default modalSlice.reducer;
