import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
const Pending = ({ text }: { text: string }) => {
    return (
        <div className="flex items-center justify-center gap-x-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-senary text-lite">
                <QuestionMarkIcon />
            </span>
            <span>{text}</span>
        </div>
    );
};

export default Pending;
