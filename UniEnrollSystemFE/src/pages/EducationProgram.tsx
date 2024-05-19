import { useEffect, useState } from "react";
import Footer from "../modules/program/Footer";
import Header from "../modules/program/Header";
import Table from "../modules/program/Table";
import { UniEnrollSystemAPI } from "../apis/constants";
import RequiredAuthPage from "./RequiredAuthPage";
import { IEducationPrograms } from "../types/educationProgramType";
const EducationProgram = () => {
    const [data, setData] = useState<{
        [key: string]: IEducationPrograms;
    } | null>(null);
    useEffect(() => {
        document.title = "Chương trình khung";
    }, []);

    useEffect(() => {
        async function fetchEducationPrograms() {
            const response = await UniEnrollSystemAPI.getEducationPrograms();
            setData(response.data);
        }
        fetchEducationPrograms();
    }, []);

    return (
        <RequiredAuthPage>
            <div className="w-full h-full mt-5 bg-lite p-[10px] max-w-[1140px] mx-auto">
                <Header />
                <Table programData={data} />
                <Footer />
            </div>
        </RequiredAuthPage>
    );
};

export default EducationProgram;
