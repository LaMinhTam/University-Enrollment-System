export default function renderDayOfWeek(dayOfWeek: number) {
    switch (dayOfWeek) {
        case 2:
            return "2";
        case 3:
            return "3";
        case 4:
            return "4";
        case 5:
            return "5";
        case 6:
            return "6";
        case 7:
            return "7";
        case 1:
            return "CN";
        default:
            return "";
    }
}
