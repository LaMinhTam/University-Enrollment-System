import ClearIcon from "@mui/icons-material/Clear";
const Fail = ({ text }: { text: string }) => {
    return (
        <div className="flex items-center justify-center gap-x-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-error text-lite">
                <ClearIcon />
            </span>
            <span>{text}</span>
        </div>
    );
};

export default Fail;
