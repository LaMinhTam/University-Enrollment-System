import Header from "../modules/debt/Header";
import Table from "../modules/debt/Table";
import RequiredAuthPage from "./RequiredAuthPage";

const StudentDebtPage = () => {
    return (
        <RequiredAuthPage>
            <div className="w-full p-2">
                <div className="w-full shadow-md bg-lite p-[10px]">
                    <Header />
                    <Table />
                </div>
            </div>
        </RequiredAuthPage>
    );
};

export default StudentDebtPage;
