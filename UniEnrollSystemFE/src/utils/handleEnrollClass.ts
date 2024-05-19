import { UniEnrollSystemAPI } from "../apis/constants";
import { IClassesEnrolled } from "../types/classesEnrolledType";
import { IClass } from "../types/courseType";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import {
    setClassSchedule,
    setCourseSelectedClasses,
    setCourseSelectedId,
    setEnrollLoading,
    setRegisterClasses,
} from "../store/actions/registrationSlice";
import { toast } from "react-toastify";
import {
    setDuplicateSchedule,
    setIsOpenScheduleDuplicateModal,
} from "../store/actions/modalSlice";
import { IExistedSchedule } from "../types/scheduleType";

export default async function handleEnrollClass(
    groupId: number,
    classSchedule: IClass,
    registerClasses: IClassesEnrolled[],
    dispatch: Dispatch<UnknownAction>,
    setIsSelectedGroup: (value: boolean) => void,
    setSelectedGroup: (value: number) => void,
    courseSelectedCredit: number,
    fee: number
) {
    try {
        dispatch(setEnrollLoading(true));
        const response = await UniEnrollSystemAPI.classesEnrolled(
            classSchedule.id,
            groupId
        );
        if (response.status === 200) {
            dispatch(
                setRegisterClasses([
                    ...registerClasses,
                    {
                        ...classSchedule,
                        credit: courseSelectedCredit,
                        group: groupId,
                        paymentStatus: "UNPAID",
                        updateAt: new Date(),
                        fee,
                    },
                ])
            );
            dispatch(setCourseSelectedClasses([]));
            dispatch(setClassSchedule({} as IClass));
            dispatch(setCourseSelectedId(""));
            setIsSelectedGroup(false);
            setSelectedGroup(0);
            toast.success("Đăng ký lớp học phần thành công");
            dispatch(setEnrollLoading(false));
        } else {
            dispatch(setIsOpenScheduleDuplicateModal(true));
            dispatch(setDuplicateSchedule(response.data as IExistedSchedule[]));
            toast.error(response.message);
            dispatch(setEnrollLoading(false));
        }
    } catch (error) {
        dispatch(setEnrollLoading(false));
        toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau");
    }
}
