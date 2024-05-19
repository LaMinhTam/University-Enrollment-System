export default function renderClassesRegistrationStatus(status: string) {
    let str = "";
    switch (status) {
        case "CLOSED":
            str = "Đã khóa";
            break;
        case "WAITING":
            str = "Đang chờ sinh viên đăng ký";
            break;
        case "PLANNING":
            str = "Đang lên kế hoạch";
            break;
        case "OPENED":
            str = "Đã mở";
            break;
        default:
            str = "";
            break;
    }
    return str;
}
