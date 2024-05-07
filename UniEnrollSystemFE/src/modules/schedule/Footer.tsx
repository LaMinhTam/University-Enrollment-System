const Footer = () => {
    return (
        <div className="flex items-center justify-start mt-10 gap-x-3">
            <div className="flex items-center justify-center gap-x-[10px]">
                <span className="w-[40px] h-[15px] bg-text6 border border-text4 block"></span>
                <label lang="lichhoclythuyet">Lịch học lý thuyết</label>
            </div>
            <div className="flex items-center justify-center gap-x-[10px]">
                <span className="w-[40px] h-[15px] bg-primary border border-text4 block"></span>
                <label lang="lichhocthuchanh">Lịch học thực hành</label>
            </div>
            <div className="flex items-center justify-center gap-x-[10px]">
                <span className="w-[40px] h-[15px] bg-text7 border border-text4 block"></span>
                <label lang="lichhoctructuyen">Lịch học trực tuyến</label>
            </div>
            <div className="flex items-center justify-center gap-x-[10px]">
                <span className="w-[40px] h-[15px] bg-senary border border-text4 block"></span>
                <label lang="lichthi">Lịch thi</label>
            </div>
            <div className="flex items-center justify-center gap-x-[10px]">
                <span className="w-[40px] h-[15px] bg-error border border-text4 block"></span>
                <label lang="lichtamngung">Lịch tạm ngưng</label>
            </div>
        </div>
    );
};

export default Footer;
