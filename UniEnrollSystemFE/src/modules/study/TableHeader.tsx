const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th
                    rowSpan={3}
                    style={{
                        width: "100px",
                        minWidth: "100px",
                    }}
                    lang="kqht-stt"
                >
                    <div>STT</div>
                </th>
                <th
                    rowSpan={3}
                    style={{
                        width: "200px",
                        minWidth: "200px",
                    }}
                    lang="kqht-malhp"
                >
                    <div>Mã lớp học phần</div>
                </th>
                <th
                    rowSpan={3}
                    style={{
                        width: "200px",
                        minWidth: "200px",
                    }}
                    lang="kqht-tenlhp"
                >
                    <div>Tên môn học/học phần</div>
                </th>
                <th
                    rowSpan={3}
                    style={{
                        width: "100px",
                    }}
                    lang="kqht-stc"
                >
                    <div>Số tín chỉ</div>
                </th>
                <th colSpan={2} lang="kqht-qucd-row_1_2">
                    Giữa kỳ
                </th>
                <th colSpan={9} lang="kqht-qucd-row_1_3">
                    Thường xuyên
                </th>
                <th colSpan={5} lang="kqht-qucd-row_1_5">
                    Thực hành
                </th>
                <th rowSpan={3} lang="kqht-qucd-row_1_8">
                    Cuối kỳ
                </th>
                <th rowSpan={3} lang="kqht-qucd-row_1_10">
                    Điểm tổng kết
                </th>
                <th rowSpan={3} lang="kqht-qucd-diemtinchi">
                    Thang điểm 4
                </th>
                <th rowSpan={3} lang="kqht-qucd-diemchu">
                    Điểm chữ
                </th>
                <th rowSpan={3} lang="kqht-qucd-xeploai">
                    Xếp loại
                </th>
                <th rowSpan={3} lang="kqht-qucd-ghichu">
                    Ghi chú
                </th>
                <th rowSpan={3} lang="kqht-qucd-diemtbquatrinh">
                    TBQT
                </th>
                <th rowSpan={3} lang="kqht-qucd-isdat">
                    Đạt
                </th>
            </tr>
            <tr>
                <th rowSpan={2} lang="kqht-qucd-diemchuyencan1">
                    1
                </th>
                <th rowSpan={2} lang="kqht-qucd-diemchuyencane">
                    Chuyên cần
                </th>
                <th colSpan={9} lang="kqht-qucd-row_2_3_2">
                    LT Hệ số 1
                </th>
                <th rowSpan={2} lang="kqht-qucd-diemthuchanh1">
                    1
                </th>
                <th rowSpan={2} lang="kqht-qucd-diemthuchanh2">
                    2
                </th>
                <th rowSpan={2} lang="kqht-qucd-diemthuchanh3">
                    3
                </th>
                <th rowSpan={2} lang="kqht-qucd-diemthuchanh4">
                    4
                </th>
                <th rowSpan={2} lang="kqht-qucd-diemthuchanh5">
                    5
                </th>
            </tr>
            <tr>
                <th lang="kqht-qucd-diemheso11">1</th>
                <th lang="kqht-qucd-diemheso12">2</th>
                <th lang="kqht-qucd-diemheso13">3</th>
                <th lang="kqht-qucd-diemheso14">4</th>
                <th lang="kqht-qucd-diemheso15">5</th>
                <th lang="kqht-qucd-diemthuongky6">6</th>
                <th lang="kqht-qucd-diemthuongky7">7</th>
                <th lang="kqht-qucd-diemthuongky8">8</th>
                <th lang="kqht-qucd-diemthuongky9">9</th>
            </tr>
        </thead>
    );
};

export default TableHeader;
