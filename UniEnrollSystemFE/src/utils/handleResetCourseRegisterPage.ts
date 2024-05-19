import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import {
    setClassSchedule,
    setCourseSelectedClasses,
    setCourseSelectedId,
    setCourses,
    setRegisterClasses,
    setRegistrationPeriod,
} from "../store/actions/registrationSlice";
import { IClass } from "../types/courseType";

export default function handleResetCourseRegisterPage(
    dispatch: Dispatch<UnknownAction>
) {
    dispatch(setRegistrationPeriod({ semester: 0, year: 0 }));
    dispatch(setCourses(null));
    dispatch(setRegisterClasses([]));
    dispatch(setCourseSelectedClasses([]));
    dispatch(setClassSchedule({} as IClass));
    dispatch(setCourseSelectedId(""));
}
