import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";
const Table = () => {
    const [show, setShow] = useState<number | null>(null);
    return (
        <table className="mt-5 border border-collapse border-text2">
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Tên môn học / Học phần</th>
                    <th>Mã học phần</th>
                    <th>Học phần</th>
                    <th>Số tín chỉ</th>
                    <th>Số tiết lý thuyết</th>
                    <th>Số tiết thực hành</th>
                    <th>Nhóm tự chọn</th>
                    <th>Số tín chỉ bắt buộc của nhóm</th>
                    <th>Đạt</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    className="trSemester"
                    onClick={() => setShow(show === 1 ? null : 1)}
                >
                    <td colSpan={4}>Học kỳ 1 (2021-2022)</td>
                    <td>11</td>
                    <td colSpan={5}></td>
                </tr>
                {show === 1 && (
                    <>
                        <tr>
                            <td>1</td>
                            <td>Pháp luật đại cương</td>
                            <td>PLDC</td>
                            <td>Pháp luật đại cương</td>
                            <td>3</td>
                            <td>45</td>
                            <td>15</td>
                            <td>1</td>
                            <td>3</td>
                            <td>
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-lite">
                                    <CheckIcon />
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Pháp luật đại cương</td>
                            <td>PLDC</td>
                            <td>Pháp luật đại cương</td>
                            <td>3</td>
                            <td>45</td>
                            <td>15</td>
                            <td>1</td>
                            <td>3</td>
                            <td>
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-lite">
                                    <CheckIcon />
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Pháp luật đại cương</td>
                            <td>PLDC</td>
                            <td>Pháp luật đại cương</td>
                            <td>3</td>
                            <td>45</td>
                            <td>15</td>
                            <td>1</td>
                            <td>3</td>
                            <td>
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-lite">
                                    <CheckIcon />
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Pháp luật đại cương</td>
                            <td>PLDC</td>
                            <td>Pháp luật đại cương</td>
                            <td>3</td>
                            <td>45</td>
                            <td>15</td>
                            <td>1</td>
                            <td>3</td>
                            <td>
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-lite">
                                    <CheckIcon />
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>Pháp luật đại cương</td>
                            <td>PLDC</td>
                            <td>Pháp luật đại cương</td>
                            <td>3</td>
                            <td>45</td>
                            <td>15</td>
                            <td>1</td>
                            <td>3</td>
                            <td>
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-lite">
                                    <CheckIcon />
                                </span>
                            </td>
                        </tr>
                    </>
                )}
                <tr
                    className="trSemester"
                    onClick={() => setShow(show === 2 ? null : 2)}
                >
                    <td colSpan={4}>Học kỳ 2 (2021-2022)</td>
                    <td>12</td>
                    <td colSpan={5}></td>
                </tr>
                {show === 2 && (
                    <>
                        <tr>
                            <td>1</td>
                            <td>Pháp luật đại cương</td>
                            <td>PLDC</td>
                            <td>Pháp luật đại cương</td>
                            <td>3</td>
                            <td>45</td>
                            <td>15</td>
                            <td>1</td>
                            <td>3</td>
                            <td>
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-lite">
                                    <CheckIcon />
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Pháp luật đại cương</td>
                            <td>PLDC</td>
                            <td>Pháp luật đại cương</td>
                            <td>3</td>
                            <td>45</td>
                            <td>15</td>
                            <td>1</td>
                            <td>3</td>
                            <td>
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-lite">
                                    <CheckIcon />
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Pháp luật đại cương</td>
                            <td>PLDC</td>
                            <td>Pháp luật đại cương</td>
                            <td>3</td>
                            <td>45</td>
                            <td>15</td>
                            <td>1</td>
                            <td>3</td>
                            <td>
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-lite">
                                    <CheckIcon />
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Pháp luật đại cương</td>
                            <td>PLDC</td>
                            <td>Pháp luật đại cương</td>
                            <td>3</td>
                            <td>45</td>
                            <td>15</td>
                            <td>1</td>
                            <td>3</td>
                            <td>
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-lite">
                                    <CheckIcon />
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>Pháp luật đại cương</td>
                            <td>PLDC</td>
                            <td>Pháp luật đại cương</td>
                            <td>3</td>
                            <td>45</td>
                            <td>15</td>
                            <td>1</td>
                            <td>3</td>
                            <td>
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-lite">
                                    <CheckIcon />
                                </span>
                            </td>
                        </tr>
                    </>
                )}
                <tr className="trSemester">
                    <td colSpan={4}>Tổng tín chỉ yêu cầu</td>
                    <td
                        style={{
                            color: "red",
                        }}
                    >
                        138
                    </td>
                    <td colSpan={5}></td>
                </tr>
                <tr className="trSemester">
                    <td colSpan={4}>Tổng tín chỉ bắt buộc</td>
                    <td
                        style={{
                            color: "red",
                        }}
                    >
                        106
                    </td>
                    <td colSpan={5}></td>
                </tr>
                <tr className="trSemester">
                    <td colSpan={4}>Tổng tín chỉ tự chọn</td>
                    <td
                        style={{
                            color: "red",
                        }}
                    >
                        32
                    </td>
                    <td colSpan={5}></td>
                </tr>
            </tbody>
        </table>
    );
};

export default Table;
