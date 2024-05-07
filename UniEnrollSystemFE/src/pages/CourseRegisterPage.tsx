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
import handleGetClassesEnrolledSchedule from "../utils/handleGetClassesEnrolledSchedule";
import { IClassesEnrolledSchedule } from "../types/commonType";

const CourseRegisterPage = () => {
    const [courses, setCourses] = useState<{
        [key: string]: ICourseRegistration;
    } | null>(null);
    const dispatch = useDispatch();
    const tableClassesRef = useRef<HTMLDivElement>(null);
    const registrationPeriod = useSelector(
        (state: RootState) => state.registration.registrationPeriod
    );
    const classes = useSelector(
        (state: RootState) => state.registration.registerClasses
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
                    const classes = classesRes.data.map((item) => {
                        return {
                            ...item,
                            isPaid: false,
                            updatedAt: "13/05/2024",
                            fee: "2.450.000",
                        };
                    });
                    dispatch(setRegisterClasses(classes));
                }
            } catch (error) {
                toast.error("Lỗi khi lấy dữ liệu học phần");
            }
        }
        if (registrationPeriod.semester && registrationPeriod.year) {
            fetchData();
        }
    }, [dispatch, registrationPeriod.semester, registrationPeriod.year]);

    useEffect(() => {
        if (courses && classes) {
            const classesEnrolledSchedule = handleGetClassesEnrolledSchedule(
                classes,
                courses
            ) as IClassesEnrolledSchedule[];
            dispatch(setClassesEnrolledSchedule(classesEnrolledSchedule));
        }
    }, [classes, courses, dispatch]);

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
