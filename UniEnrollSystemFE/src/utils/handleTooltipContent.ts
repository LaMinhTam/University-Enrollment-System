import { IPrerequisite } from "../types/courseType";

export default function handleTooltipContent(prerequisites: IPrerequisite[]) {
    const header =
        "<tr><th>Mã học phần</th><th>Tên môn học / học phần</th><th>Số TC</th><th>Số TC lý thuyết</th><th>Số TC thực hành</th></tr>";
    const rows = prerequisites
        .map((prerequisite) => {
            const id = prerequisite.id;
            const name = prerequisite.name;
            const credit = prerequisite.credit;
            const theoryCredit = prerequisite.theoryCredit;
            const practicalCredit = prerequisite.practicalCredit;

            return `<tr><td>${id}</td><td>${name}</td><td>${credit}</td><td>${theoryCredit}</td><td>${practicalCredit}</td></tr>`;
        })
        .join("");
    return `<table>${header}${rows}</table>`;
}
