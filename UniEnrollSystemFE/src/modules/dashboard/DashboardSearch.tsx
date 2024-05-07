const DashboardSearch = () => {
    return (
        <div className="relative z-50">
            <div className="bg-white rounded-full shadow-[10px_10px_20px_0px_rgba(218,213,213,0.15)] p-2 flex items-center">
                <div className="flex-1 px-5">
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        className="w-full text-sm bg-transparent placeholder:text-text4"
                    />
                </div>
                <button className="w-[72px] rounded-full bg-primary text-white h-10 flex items-center justify-center flex-shrink-0">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default DashboardSearch;
