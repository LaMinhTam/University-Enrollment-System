export default function renderColorClassNameOfStatus(status: string) {
    let str = "";
    switch (status) {
        case "CLOSED":
            str = "text-error";
            break;
        case "WAITING":
            str = "text-secondary";
            break;
        case "PLANNING":
            str = "text-text7";
            break;
        case "OPENED":
            str = "text-primary";
            break;
        default:
            str = "";
            break;
    }
    return str;
}
