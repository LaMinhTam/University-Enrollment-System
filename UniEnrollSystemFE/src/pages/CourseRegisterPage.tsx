import { useEffect, useRef, useState } from "react";
import RequiredAuthPage from "./RequiredAuthPage";
import Header from "../modules/program/Header";
import TableCourse from "../modules/registration/TableCourse";
import TableClasses from "../modules/registration/TableClasses";
import TableRegistration from "../modules/registration/TableRegistration";
import { ICourseRegistration } from "../types/courseType";
import { UniEnrollSystemAPI } from "../apis/constants";

const CourseRegisterPage = () => {
    const [data, setData] = useState<ICourseRegistration[]>([]);
    const tableClassesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.title = "Đăng ký học phần";
    }, []);

    useEffect(() => {
        async function fetchData() {
            const response = await UniEnrollSystemAPI.getCourseRegistration(
                1,
                2024
            );
            if (response.status === 200) {
                setData(response.data);
            }
        }
        fetchData();
    }, []);

    return (
        <RequiredAuthPage>
            <div className="w-full h-full mt-5 bg-lite p-[10px]">
                <Header />
                <TableCourse data={data} tableClassesRef={tableClassesRef} />
                <div ref={tableClassesRef}>
                    <TableClasses />
                </div>
                <TableRegistration />
            </div>
        </RequiredAuthPage>
    );
};

export default CourseRegisterPage;
