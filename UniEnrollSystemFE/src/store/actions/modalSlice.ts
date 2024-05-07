import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IClassesEnrolledSchedule } from "../../types/commonType";

type ModalType = {
    isOpenWatchScheduleModal: boolean;
    classSelectedSchedule: IClassesEnrolledSchedule[];
};

const initialState: ModalType = {
    isOpenWatchScheduleModal: false,
    classSelectedSchedule: [],
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
    },
});

export const { setIsOpenWatchScheduleModal, setClassSelectedSchedule } =
    modalSlice.actions;
export default modalSlice.reducer;
