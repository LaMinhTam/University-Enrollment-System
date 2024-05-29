import { useEffect, useRef, useState } from "react";
import RequiredAuthPage from "./RequiredAuthPage";
import TableCourse from "../modules/registration/TableCourse";
import TableClasses from "../modules/registration/TableClasses";
import TableRegistration from "../modules/registration/TableRegistration";
import { UniEnrollSystemAPI } from "../apis/constants";
import { useDispatch, useSelector } from "react-redux";
import {
    setClassesEnrolledSchedule,
    setCourses,
    setRegisterClasses,
    setWaitingCourses,
} from "../store/actions/registrationSlice";
import Header from "../modules/registration/Header";
import { RootState } from "../store/configureStore";
import { toast } from "react-toastify";
import handleGetClassesEnrolledSchedule from "../utils/handleGetClassesEnrolledSchedule";
import { IClassesEnrolledSchedule } from "../types/commonType";
import handleResetCourseRegisterPage from "../utils/handleResetCourseRegisterPage";
import { Loading } from "../components/common";
import { setIsOpenWaitingCourseModal } from "../store/actions/modalSlice";

const CourseRegisterPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const courses = useSelector(
        (state: RootState) => state.registration.courses
    );
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
                setLoading(true);
                const coursesRes =
                    await UniEnrollSystemAPI.getCourseRegistration(
                        registrationPeriod.semester,
                        registrationPeriod.year
                    );
                const classesRes = await UniEnrollSystemAPI.getClassesEnrolled(
                    registrationPeriod.semester,
                    registrationPeriod.year
                );

                const waitingRes = await UniEnrollSystemAPI.getWaitingCourses(
                    registrationPeriod.semester,
                    registrationPeriod.year
                );

                if (coursesRes.status === 200) {
                    dispatch(setCourses(coursesRes.data));
                }
                if (classesRes.status === 200) {
                    dispatch(setRegisterClasses(classesRes.data));
                }

                if (waitingRes.status === 200) {
                    dispatch(setWaitingCourses(waitingRes.data));
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
                toast.error("Lỗi khi lấy dữ liệu học phần");
            }
        }
        if (
            registrationPeriod.semester !== 0 &&
            registrationPeriod.year !== 0
        ) {
            fetchData();
        } else {
            toast.error("Vui lòng chọn đợt đăng ký học phần");
            handleResetCourseRegisterPage(dispatch);
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
            <div className="w-full h-full mt-5 bg-lite p-[10px] md:max-w-[1140px] md:mx-auto">
                <Header />
                {loading ? (
                    <Loading />
                ) : (
                    <>
                        <TableCourse
                            data={courses || {}}
                            tableClassesRef={tableClassesRef}
                        />
                        <div ref={tableClassesRef}>
                            <TableClasses />
                        </div>
                        <button
                            onClick={() =>
                                dispatch(setIsOpenWaitingCourseModal(true))
                            }
                            className="w-full max-w-[400px] h-[48px] px-4 py-2 bg-primary text-lite rounded"
                        >
                            Danh sách các môn học đã đăng ký dự bị
                        </button>
                        <TableRegistration />
                    </>
                )}
            </div>
        </RequiredAuthPage>
    );
};

export default CourseRegisterPage;
