import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center w-screen h-screen overflow-hidden bg-tertiary sm:bg-lite">
            <div className="hidden sm:block">
                <img
                    src="/page-not-found-bg.png"
                    alt="404"
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="absolute">
                <div className="relative flex-col text-center">
                    <h3 className="text-[64px] font-extrabold">404</h3>
                    <p className="text-4xl font-medium">We’re working on it!</p>
                </div>
                <img
                    src="/page-not-found-img.png"
                    alt="Not found"
                    className="object-cover w-full h-full"
                />
                <div className="flex items-center justify-center">
                    <button
                        className="flex items-center justify-center w-[200px] h-[60px] border-4 
                    border-black rounded-[30px] bg-[#E8F5FF] gap-x-2"
                        onClick={() => navigate("/")}
                    >
                        <span>
                            <svg
                                width={26}
                                height={17}
                                viewBox="0 0 26 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M2.198 5.94779L20.6431 5.94779C22.9401 5.94779 24.8022 7.80985 24.8022 10.1068L24.8022 11.6325C24.8022 13.9294 22.9401 15.7915 20.6431 15.7915L6.20842 15.7915"
                                    stroke="black"
                                    strokeWidth="2.08134"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M5.84375 1.57276C4.13521 3.2813 3.17729 4.23921 1.46875 5.94776L5.84375 10.3228"
                                    stroke="black"
                                    strokeWidth="2.08134"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                        <span className="text-2xl font-normal capitalize">
                            Go Home
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
