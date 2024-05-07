import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { UniEnrollSystemAPI } from "../apis/constants";
import { IClassesEnrolled } from "../types/classesEnrolledType";
import { IClass } from "../types/courseType";
import {
    setClassSchedule,
    setCourseSelectedClasses,
    setCourseSelectedId,
    setRegisterClasses,
} from "../store/actions/registrationSlice";
import { toast } from "react-toastify";

export default async function handleChangeClass(
    groupId: number,
    oldClass: IClassesEnrolled,
    classSchedule: IClass,
    registerClasses: IClassesEnrolled[],
    dispatch: Dispatch<UnknownAction>,
    setIsSelectedGroup: (value: boolean) => void,
    setSelectedGroup: (value: number) => void
) {
    try {
        const response = await UniEnrollSystemAPI.changeClassesEnrolled(
            oldClass.id,
            classSchedule.id,
            groupId
        );
        if (response.status === 200) {
            const newRegisterClasses = registerClasses.map((item) => {
                if (
                    item.id === oldClass.id &&
                    item.courseId === classSchedule.courseId
                ) {
                    return {
                        ...classSchedule,
                        credit: item.credit,
                        group: groupId,
                        isPaid: false,
                        updatedAt: "13/05/2024",
                        fee: "2.450.000",
                    };
                }
                return item;
            });
            dispatch(setRegisterClasses(newRegisterClasses));
            dispatch(setCourseSelectedClasses([]));
            dispatch(setClassSchedule({} as IClass));
            dispatch(setCourseSelectedId(""));
            setIsSelectedGroup(false);
            setSelectedGroup(0);
            toast.success("Đổi lớp học phần thành công");
        } else if (response.status === 400) {
            toast.error(response.message);
        }
    } catch (error) {
        toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau");
    }
}
