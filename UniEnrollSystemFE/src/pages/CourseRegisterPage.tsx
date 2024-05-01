import { useEffect, useRef, useState } from "react";
import RequiredAuthPage from "./RequiredAuthPage";
import Header from "../modules/program/Header";
import TableCourse from "../modules/registration/TableCourse";
import TableClasses from "../modules/registration/TableClasses";
import TableRegistration from "../modules/registration/TableRegistration";
import { ICourseRegistration } from "../types/courseType";
import { UniEnrollSystemAPI } from "../apis/constants";
import { useDispatch } from "react-redux";
import { setRegisterClasses } from "../store/actions/registrationSlice";

const CourseRegisterPage = () => {
    const [courses, setCourses] = useState<{
        [key: string]: ICourseRegistration;
    } | null>(null);
    const dispatch = useDispatch();
    const tableClassesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.title = "Đăng ký học phần";
    }, []);

    useEffect(() => {
        async function fetchData() {
            const responseCourse = UniEnrollSystemAPI.getCourseRegistration(
                1,
                2024
            );
            const responseClasses = UniEnrollSystemAPI.getClassesEnrolled(
                1,
                2024
            );

            const [course, classes] = await Promise.all([
                responseCourse,
                responseClasses,
            ]);

            if (course.status === 200) {
                setCourses(course.data);
            }
            if (classes.status === 400) {
                dispatch(setRegisterClasses(classes.data));
            }
        }
        fetchData();
    }, [dispatch]);

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
