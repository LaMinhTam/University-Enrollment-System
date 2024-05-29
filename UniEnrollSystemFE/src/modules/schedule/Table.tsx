import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { Schedule, ScheduleData } from "../../types/studyScheduleType";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/formatTime";
import { v4 as uuidv4 } from "uuid";
import ScheduleItem from "./ScheduleItem";
import { SCHEDULE_TYPE } from "../../constants/global";
import handleFilterStudySchedule from "../../utils/handleFilterStudySchedule";
import handleFilterExamSchedule from "../../utils/handleFilterExamSchedule";
import { toast } from "react-toastify";

interface ScheduleCustomData {
    date: string;
    schedule: Schedule[];
}

const Table = ({ schedules }: { schedules: ScheduleData[] }) => {
    const [morningSchedule, setMorningSchedule] = useState<
        ScheduleCustomData[]
    >([]);
    const [data, setData] = useState<ScheduleData[]>(schedules);
    const [afternoonSchedule, setAfternoonSchedule] = useState<
        ScheduleCustomData[]
    >([]);
    const [eveningSchedule, setEveningSchedule] = useState<
        ScheduleCustomData[]
    >([]);
    const dates = useSelector((state: RootState) => state.schedule.dates);
    const scheduleType = useSelector(
        (state: RootState) => state.schedule.scheduleType
    );

    useEffect(() => {
        if (data && data.length > 0 && dates && dates.length > 0) {
            const morningSchedules: ScheduleCustomData[] = [];
            const afternoonSchedules: ScheduleCustomData[] = [];
            const eveningSchedules: ScheduleCustomData[] = [];

            dates?.forEach((date) => {
                const item = data.find(
                    (s) => formatDate(new Date(s.date)) === date
                );

                const morning = item
                    ? item.schedule.filter((s) =>
                          ["1-3", "4-6"].includes(s.schedules.timeSlot)
                      )
                    : [];

                const afternoon = item
                    ? item.schedule.filter((s) =>
                          ["7-9", "10-12"].includes(s.schedules.timeSlot)
                      )
                    : [];

                const evening = item
                    ? item.schedule.filter((s) =>
                          ["13-15", "16-18"].includes(s.schedules.timeSlot)
                      )
                    : [];

                morningSchedules.push({
                    date: date,
                    schedule: morning,
                });

                afternoonSchedules.push({
                    date: date,
                    schedule: afternoon,
                });

                eveningSchedules.push({
                    date: date,
                    schedule: evening,
                });
            });

            setMorningSchedule(morningSchedules);
            setAfternoonSchedule(afternoonSchedules);
            setEveningSchedule(eveningSchedules);
        }
    }, [dates, data]);

    useEffect(() => {
        if (schedules && [0, 1, 2].includes(scheduleType)) {
            if (scheduleType === SCHEDULE_TYPE.ALL) {
                setData(schedules);
            } else if (scheduleType === SCHEDULE_TYPE.STUDY) {
                const result = handleFilterStudySchedule(schedules);
                setData(result);
            } else if (scheduleType === SCHEDULE_TYPE.EXAM) {
                const result = handleFilterExamSchedule(schedules);
                setData(result);
            } else {
                toast.info("Lịch học không tồn tại!!!");
            }
        }
    }, [scheduleType, schedules]);

    if (!dates) return null;
    return (
        <table className="w-full mt-5 border border-collapse border-text2 table-schedule">
            <thead>
                <tr>
                    <th>Ca học</th>
                    <th>
                        Thứ 2<br />
                        {dates[0]}
                    </th>
                    <th>
                        Thứ 3<br />
                        {dates[1]}
                    </th>
                    <th>
                        Thứ 4<br />
                        {dates[2]}
                    </th>
                    <th>
                        Thứ 5<br />
                        {dates[3]}
                    </th>
                    <th>
                        Thứ 6<br />
                        {dates[4]}
                    </th>
                    <th>
                        Thứ 7<br />
                        {dates[5]}
                    </th>
                    <th>
                        Chủ nhật
                        <br />
                        {dates[6]}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="text-center bg-senary text-text1">Sáng</td>
                    {morningSchedule.map((item) => (
                        <td key={uuidv4()}>
                            {item.schedule.map((s) => (
                                <ScheduleItem key={uuidv4()} item={s} />
                            ))}
                        </td>
                    ))}
                </tr>
                <tr>
                    <td className="text-center bg-senary text-text1">Chiều</td>
                    {afternoonSchedule.map((item) => (
                        <td key={uuidv4()}>
                            {item.schedule.map((s) => (
                                <ScheduleItem key={uuidv4()} item={s} />
                            ))}
                        </td>
                    ))}
                </tr>
                <tr>
                    <td className="text-center bg-senary text-text1">Tối</td>
                    {eveningSchedule.map((item) => (
                        <td key={uuidv4()}>
                            {item.schedule.map((s) => (
                                <ScheduleItem key={uuidv4()} item={s} />
                            ))}
                        </td>
                    ))}
                </tr>
            </tbody>
        </table>
    );
};

export default Table;
