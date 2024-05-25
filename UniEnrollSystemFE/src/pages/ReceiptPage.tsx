import { useEffect, useState } from "react";
import ReceiptTable from "../modules/receipt/ReceiptTable";
import RequiredAuthPage from "./RequiredAuthPage";
import { IReceipt } from "../types/receiptType";
import { UniEnrollSystemAPI } from "../apis/constants";
import { Loading } from "../components/common";

const ReceiptPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [receipts, setReceipts] = useState<IReceipt[]>([]);
    useEffect(() => {
        const fetchReceipts = async () => {
            try {
                setLoading(true);
                const res = await UniEnrollSystemAPI.getReceipts(1, 10);
                if (res.status === 200) {
                    setReceipts(res.data);
                    setLoading(false);
                }
            } catch (err) {
                setLoading(false);
                console.log(err);
            }
        };
        fetchReceipts();
    }, []);
    return (
        <RequiredAuthPage>
            <div className="w-full h-full p-3 mt-5 shadow-md select-none bg-lite max-w-[1140px] mx-auto">
                <h1 className="text-lg font-bold">Phiếu thu tổng hợp</h1>
                {loading ? <Loading /> : <ReceiptTable data={receipts} />}
            </div>
        </RequiredAuthPage>
    );
};

export default ReceiptPage;
