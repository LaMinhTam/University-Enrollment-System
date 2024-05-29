export default function getWeekDates(targetDate: string) {
    const date = new Date(targetDate);

    // Lấy ngày đầu tiên của tuần (Thứ Hai)
    const firstDay = new Date(date);
    const dayOfWeek = firstDay.getDay();
    const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek; // Tính khoảng cách đến thứ Hai
    firstDay.setDate(date.getDate() + diffToMonday);

    // Tạo mảng chứa các ngày trong tuần
    const dates = [];
    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(firstDay);
        currentDate.setDate(firstDay.getDate() + i);

        // Chuyển ngày thành chuỗi định dạng 'dd/MM/yyyy'
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");
        dates.push(`${day}/${month}/${year}`);
    }

    return dates;
}
