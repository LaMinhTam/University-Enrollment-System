import Fail from "./Fail";
import Pending from "./Pending";
import Success from "./Success";
import Unpaid from "./Unpaid";

const StatusComponent = ({ paymentStatus }: { paymentStatus: string }) => {
    return (
        <>
            {paymentStatus === "PAID" && <Success text="" />}
            {paymentStatus === "UNPAID" && <Unpaid text="" />}
            {paymentStatus === "PENDING" && <Pending text="" />}
            {paymentStatus === "ERROR" && <Fail text="" />}
        </>
    );
};

export default StatusComponent;
