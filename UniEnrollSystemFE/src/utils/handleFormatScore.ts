const handleFormatScore = (score: number) => {
    if (score && Number(score) >= 0) {
        const roundedScore = Number(score.toFixed(3));
        const formattedScore = roundedScore.toFixed(2).replace(".", ",");
        return formattedScore;
    } else return "";
};

export default handleFormatScore;
