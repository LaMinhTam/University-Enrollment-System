import CheckIcon from "@mui/icons-material/Check";
const Success = ({ text }: { text: string }) => {
    return (
        <div className="flex items-center justify-center gap-x-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-lite">
                <CheckIcon />
            </span>
            <span>{text}</span>
        </div>
    );
};

export default Success;
