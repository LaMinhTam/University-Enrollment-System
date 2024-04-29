import PrintIcon from "@mui/icons-material/Print";
import ExpandIcon from "@mui/icons-material/Expand";
const Header = () => {
    return (
        <div className="flex items-center justify-between py-2 border-b border-b-text3">
            <h1 className="text-lg font-semibold">Chương trình khung</h1>
            <div className="flex items-center justify-center gap-x-3">
                <button className="flex items-center justify-center px-4 py-2 rounded hover:text-tertiary hover:bg-strock gap-x-2 bg-tertiary text-lite">
                    <PrintIcon />
                    <span className="font-normal">In</span>
                </button>
                <button className="px-4 py-2 rounded hover:text-tertiary hover:bg-strock bg-tertiary text-lite">
                    <ExpandIcon />
                </button>
            </div>
        </div>
    );
};

export default Header;
