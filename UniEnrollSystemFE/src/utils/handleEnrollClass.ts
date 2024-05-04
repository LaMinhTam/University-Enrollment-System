import { UniEnrollSystemAPI } from "../apis/constants";
import { IClassesEnrolled } from "../types/classesEnrolledType";
import { IClass } from "../types/courseType";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import {
    setCourseChangeQuantityId,
    setCourseSelectedClasses,
    setRegisterClasses,
} from "../store/actions/registrationSlice";
import { handleIncrementQuantityOfClass } from "./handleChangeQuantityOfClass";
import { toast } from "react-toastify";

export default async function handleEnrollClass(
    groupId: number,
    classSchedule: IClass,
    registerClasses: IClassesEnrolled[],
    dispatch: Dispatch<UnknownAction>,
    courseSelectedClasses: IClass[],
    setIsSelectedGroup: (value: boolean) => void,
    setSelectedGroup: (value: number) => void
) {
    try {
        const response = await UniEnrollSystemAPI.classesEnrolled(
            classSchedule.id,
            groupId
        );
        if (response.status === 200) {
            const newCourseSelectedClasses = handleIncrementQuantityOfClass(
                courseSelectedClasses,
                classSchedule
            );
            dispatch(
                setRegisterClasses([
                    ...registerClasses,
                    {
                        ...classSchedule,
                        credit: 3,
                        group: groupId,
                        isPaid: false,
                        updatedAt: "13/05/2024",
                        fee: "2.450.000",
                    },
                ])
            );
            dispatch(setCourseSelectedClasses(newCourseSelectedClasses));
            dispatch(setCourseChangeQuantityId(classSchedule.courseId));
            setIsSelectedGroup(false);
            setSelectedGroup(0);
            toast.success("Đăng ký lớp học phần thành công");
        } else {
            toast.error(response.message);
        }
    } catch (error) {
        toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau");
    }
}
