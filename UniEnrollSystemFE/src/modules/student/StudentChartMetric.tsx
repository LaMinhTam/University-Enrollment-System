const StudentChartMetric = () => {
    return (
        <div className="flex items-center justify-center h-[346px] mt-5">
            <div className="w-full h-full p-[10px] bg-lite rounded-lg">
                <div className="flex items-center justify-center h-[52px] border-b border-b-text3">
                    <span className="mr-auto text-lg font-bold">
                        Kết quả học tập
                    </span>
                    <select
                        name="semester"
                        id="semester"
                        className="px-3 py-[6px] border border-text3 rounded-md w-full max-w-[152px]"
                    >
                        <option value="">Học kỳ 1</option>
                        <option value="">Học kỳ 2</option>
                        <option value="">Học kỳ 3</option>
                    </select>
                </div>
                <div>
                    <img src="/tkkqht.png" alt="" />
                </div>
            </div>
            <div className="mx-5 flex flex-col items-center justify-center w-full h-full bg-lite max-w-[240px] p-[10px]">
                <div className="flex items-center justify-center h-[52px] border-b border-b-text3">
                    <span className="text-lg font-bold">Tiến độ học tập</span>
                </div>
                <div className="my-auto">{/* Chart here */}</div>
                <span className="text-lg font-bold">117/156</span>
            </div>
            <div className="w-full h-full p-[10px] bg-lite rounded-lg">
                <div className="flex items-center justify-center h-[52px] border-b border-b-text3">
                    <span className="mr-auto text-lg font-bold">
                        Lớp học phần
                    </span>
                    <select
                        name="semester"
                        id="semester"
                        className="px-3 py-[6px] border border-text3 rounded-md w-full max-w-[152px]"
                    >
                        <option value="">Học kỳ 1</option>
                        <option value="">Học kỳ 2</option>
                        <option value="">Học kỳ 3</option>
                    </select>
                </div>
                <div>
                    <img src="/tkkqht.png" alt="" />
                </div>
            </div>
        </div>
    );
};

export default StudentChartMetric;
