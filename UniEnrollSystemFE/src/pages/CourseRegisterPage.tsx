import { useEffect, useRef, useState } from "react";
import RequiredAuthPage from "./RequiredAuthPage";
import TableCourse from "../modules/registration/TableCourse";
import TableClasses from "../modules/registration/TableClasses";
import TableRegistration from "../modules/registration/TableRegistration";
import { ICourseRegistration } from "../types/courseType";
import { UniEnrollSystemAPI } from "../apis/constants";
import { useDispatch, useSelector } from "react-redux";
import {
    setClassesEnrolledSchedule,
    setRegisterClasses,
} from "../store/actions/registrationSlice";
import Header from "../modules/registration/Header";
import { RootState } from "../store/configureStore";
import { toast } from "react-toastify";

const CourseRegisterPage = () => {
    const [courses, setCourses] = useState<{
        [key: string]: ICourseRegistration;
    } | null>(null);
    const dispatch = useDispatch();
    const tableClassesRef = useRef<HTMLDivElement>(null);
    const registrationPeriod = useSelector(
        (state: RootState) => state.registration.registrationPeriod
    );
    useEffect(() => {
        document.title = "Đăng ký học phần";
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                const responseCourse = UniEnrollSystemAPI.getCourseRegistration(
                    registrationPeriod.semester,
                    registrationPeriod.year
                );
                const responseClasses = UniEnrollSystemAPI.getClassesEnrolled(
                    registrationPeriod.semester,
                    registrationPeriod.year
                );

                const [coursesRes, classesRes] = await Promise.all([
                    responseCourse,
                    responseClasses,
                ]);

                if (coursesRes.status === 200) {
                    setCourses(coursesRes.data);
                }
                if (classesRes.status === 200) {
                    dispatch(setRegisterClasses(classesRes.data));
                }
                if (coursesRes.status === 200 && classesRes.status === 200) {
                    const result = classesRes.data.flatMap((item) => {
                        return Object.values(coursesRes.data).flatMap((v) => {
                            return v.classes.filter((c) => {
                                if (c.id === item.id) {
                                    return true;
                                }
                                return false;
                            });
                        });
                    });
                    const classesEnrolledSchedule = result
                        .map((item) =>
                            item.schedules.filter(
                                (schedule) =>
                                    schedule.classType === "THEORY" ||
                                    schedule.classType === "PRACTICE"
                            )
                        )
                        .map((s) => {
                            return s.map((i) => {
                                return {
                                    classType: i.classType,

                                    dayOfWeek: i.dayOfWeek,
                                    timeSlot: i.timeSlot,
                                    group: i.group,
                                };
                            });
                        });
                    dispatch(
                        setClassesEnrolledSchedule(
                            classesEnrolledSchedule.flat()
                        )
                    );
                }
            } catch (error) {
                toast.error("Lỗi khi lấy dữ liệu học phần");
            }
        }
        fetchData();
    }, [dispatch, registrationPeriod.semester, registrationPeriod.year]);

    return (
        <RequiredAuthPage>
            <div className="w-full h-full mt-5 bg-lite p-[10px]">
                <Header />
                <TableCourse
                    data={courses || {}}
                    tableClassesRef={tableClassesRef}
                />
                <div ref={tableClassesRef}>
                    <TableClasses />
                </div>
                <TableRegistration />
            </div>
        </RequiredAuthPage>
    );
};

export default CourseRegisterPage;
