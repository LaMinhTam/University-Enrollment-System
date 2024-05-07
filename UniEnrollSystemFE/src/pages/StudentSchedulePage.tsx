import { useLocation } from "react-router-dom";
import Table from "../modules/schedule/Table";
import Header from "../modules/schedule/Header";
import Footer from "../modules/schedule/Footer";
import RequiredAuthPage from "./RequiredAuthPage";
const StudentSchedulePage = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const type = params.get("type");
    return (
        <RequiredAuthPage>
            <div className="w-full h-full p-3 mt-5 shadow-md select-none bg-lite">
                <Header type={Number(type)} />
                <Table />
                <Footer />
            </div>
        </RequiredAuthPage>
    );
};

export default StudentSchedulePage;
