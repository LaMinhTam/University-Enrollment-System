export default function renderDayOfWeek(dayOfWeek: number) {
    switch (dayOfWeek) {
        case 2:
            return "Thứ 2";
        case 3:
            return "Thứ 3";
        case 4:
            return "Thứ 4";
        case 5:
            return "Thứ 5";
        case 6:
            return "Thứ 6";
        case 7:
            return "Thứ 7";
        case 1:
            return "Chủ nhật";
        default:
            return "";
    }
}
