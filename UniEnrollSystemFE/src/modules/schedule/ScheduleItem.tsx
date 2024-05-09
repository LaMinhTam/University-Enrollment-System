import { Schedule } from "../../types/studyScheduleType";

const ScheduleItem = ({ item }: { item: Schedule }) => {
    let classType = "";
    if (
        item.schedules.classType === "FINAL_EXAM" ||
        item.schedules.classType === "MID_TERM_EXAM"
    ) {
        classType = "bg-senary";
    }
    if (item.schedules.classType === "THEORY") {
        classType = "bg-text6";
    }
    if (item.schedules.classType === "PRACTICE") {
        classType = "bg-primary";
    }
    if (item.schedules.classType === "NO_CLASS_DAY") {
        classType = "bg-error text-lite";
    }
    return (
        <div
            className={`p-[5px] w-full h-full mb-[5px] border border-text3 ${classType} flex flex-col text-start`}
        >
            <span>{item.courseName}</span>
            <span>{item.classId}</span>
            <span>Tiết: {item.schedules.timeSlot}</span>
            <span>Phòng: {item.schedules.room}</span>
            <span>GV: {item.schedules.lecturer}</span>
        </div>
    );
};

export default ScheduleItem;
