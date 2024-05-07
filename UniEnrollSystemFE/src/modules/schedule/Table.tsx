import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";

const Table = () => {
    const dates = useSelector((state: RootState) => state.schedule.dates);
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
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td className="text-center bg-senary text-text1">Chiều</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td className="text-center bg-senary text-text1">Tối</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    );
};

export default Table;
