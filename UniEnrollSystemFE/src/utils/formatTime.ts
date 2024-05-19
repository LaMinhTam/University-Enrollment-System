import moment from "moment";

export default function formatTime(time: string) {
    const updatedAt = moment(time);
    return updatedAt.format("DD/MM/YYYY");
}

export function formatUnixTimestamp(unixTimestamp: number) {
    const date = moment.unix(unixTimestamp / 1000);

    const formattedTime = date.format("DD-MM-YYYY HH:mm:ss");

    return formattedTime;
}

export function formatDate(date: Date) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

export function splitDate(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are 0-indexed in JavaScript
    const day = date.getDate();

    return { year, month, day };
}
