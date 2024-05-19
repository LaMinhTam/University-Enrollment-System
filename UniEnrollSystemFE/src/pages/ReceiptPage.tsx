import RequiredAuthPage from "./RequiredAuthPage";

const ReceiptPage = () => {
    return (
        <RequiredAuthPage>
            <div className="w-full h-full p-3 mt-5 shadow-md select-none bg-lite max-w-[1140px] mx-auto">
                <h1 className="text-lg font-bold">Phiếu thu tổng hợp</h1>
            </div>
        </RequiredAuthPage>
    );
};

export default ReceiptPage;
