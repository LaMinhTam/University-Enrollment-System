import { useEffect, useState } from "react";
import Footer from "../modules/program/Footer";
import Header from "../modules/program/Header";
import Table from "../modules/program/Table";
import { UniEnrollSystemAPI } from "../apis/constants";
import RequiredAuthPage from "./RequiredAuthPage";
const EducationProgram = () => {
    const [data, setData] = useState([]);
    console.log("EducationProgram ~ data:", data);
    useEffect(() => {
        document.title = "Chương trình khung";
    }, []);

    useEffect(() => {
        async function fetchEducationPrograms() {
            const response = await UniEnrollSystemAPI.getEducationPrograms();
            setData(response);
        }
        fetchEducationPrograms();
    }, []);

    return (
        <RequiredAuthPage>
            <div className="w-full h-full mt-5 bg-lite p-[10px]">
                <Header />
                <Table />
                <Footer />
            </div>
        </RequiredAuthPage>
    );
};

export default EducationProgram;
