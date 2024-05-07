import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IClassesEnrolledSchedule } from "../../types/commonType";
import { IExistedSchedule } from "../../types/scheduleType";

type ModalType = {
    isOpenWatchScheduleModal: boolean;
    isOpenScheduleDuplicateModal: boolean;
    classSelectedSchedule: IClassesEnrolledSchedule[];
    duplicateSchedule: IExistedSchedule[];
};

const initialState: ModalType = {
    isOpenWatchScheduleModal: false,
    isOpenScheduleDuplicateModal: false,
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
    setDuplicateSchedule,
} = modalSlice.actions;
export default modalSlice.reducer;
