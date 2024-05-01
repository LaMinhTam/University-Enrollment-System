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
