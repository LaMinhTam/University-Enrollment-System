import { Column, useTable } from "react-table";
import RequiredAuthPage from "./RequiredAuthPage";
import React from "react";

interface Data {
    col1: string;
    col2: string;
}
const StudyResultPage = () => {
    const data = React.useMemo<Data[]>(
        () => [
            {
                col1: "STT",
                col2: "Mã lớp học phần",
            },
            {
                col1: "React",
                col2: "Table",
            },
            // more data...
        ],
        []
    );

    const columns = React.useMemo<Column<Data>[]>(
        () => [
            {
                Header: "Column 1",
                accessor: "col1", // accessor is the "key" in the data
            },
            {
                Header: "Column 2",
                accessor: "col2",
            },
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });

    return (
        <RequiredAuthPage>
            <div className="w-full p-2">
                <div className="w-full shadow-md bg-lite p-[10px]">
                    <h1 className="text-lg font-bold">Kết quả học tập</h1>
                    <table
                        {...getTableProps()}
                        style={{ border: "solid 1px blue" }}
                    >
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <th {...column.getHeaderProps()}>
                                            {column.render("Header")}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map((row) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map((cell) => (
                                            <td {...cell.getCellProps()}>
                                                {cell.render("Cell")}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </RequiredAuthPage>
    );
};

export default StudyResultPage;
