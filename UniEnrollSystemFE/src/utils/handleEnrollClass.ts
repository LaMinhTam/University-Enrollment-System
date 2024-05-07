import { UniEnrollSystemAPI } from "../apis/constants";
import { IClassesEnrolled } from "../types/classesEnrolledType";
import { IClass } from "../types/courseType";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import {
    setClassSchedule,
    setCourseSelectedClasses,
    setCourseSelectedId,
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
    courseSelectedCredit: number
) {
    try {
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
                        isPaid: false,
                        updatedAt: "13/05/2024",
                        fee: "2.450.000",
                    },
                ])
            );
            dispatch(setCourseSelectedClasses([]));
            dispatch(setClassSchedule({} as IClass));
            dispatch(setCourseSelectedId(""));
            setIsSelectedGroup(false);
            setSelectedGroup(0);
            toast.success("Đăng ký lớp học phần thành công");
        } else {
            dispatch(setIsOpenScheduleDuplicateModal(true));
            dispatch(setDuplicateSchedule(response.data as IExistedSchedule[]));
            toast.error(response.message);
        }
    } catch (error) {
        toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau");
    }
}
