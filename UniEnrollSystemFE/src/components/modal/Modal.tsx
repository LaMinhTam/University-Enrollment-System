import ReactModal from "react-modal";
import WatchScheduleModal from "./WatchScheduleModal";
import { RootState } from "../../store/configureStore";
import { useSelector } from "react-redux";

const Modal = () => {
    const isOpenWatchScheduleModal = useSelector(
        (state: RootState) => state.modal.isOpenWatchScheduleModal
    );
    return (
        <>
            <ReactModal
                isOpen={isOpenWatchScheduleModal}
                overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-40 z-50
                flex justify-center items-center"
                className="modal-content w-full max-w-[1000px] bg-white rounded outline-none relative"
            >
                <WatchScheduleModal />
            </ReactModal>
        </>
    );
};

export default Modal;
