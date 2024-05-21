import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const CreditProgressChart = ({
    data,
}: {
    data: {
        totalEarnedCredits: number;
        totalRequiredCredits: number;
    };
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            const newChartInstance = new Chart(canvasRef.current, {
                type: "doughnut",
                data: {
                    datasets: [
                        {
                            data: [1],
                            backgroundColor: ["#1DA1F2"],
                            borderWidth: 0,
                        },
                        {
                            data: [
                                data.totalEarnedCredits,
                                data.totalRequiredCredits -
                                    data.totalEarnedCredits,
                            ],
                            backgroundColor: ["#00FF00", "#E0E0E0"],
                            borderWidth: 0,
                            circular: true,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    cutout: "50%", // Decrease this percentage to make the doughnut wider
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            enabled: true,
                            position: "average",
                            backgroundColor: "#B7DFFF",
                            multiKeyBackground: "#B7DFFF",
                            titleColor: "#000",
                            bodyColor: "#000",
                            bodyFont: {
                                size: 16,
                            },
                            callbacks: {
                                label: function (context) {
                                    const datasetIndex = context.datasetIndex;
                                    if (datasetIndex === 0) {
                                        return `Tổng: ${data.totalRequiredCredits} tín chỉ`;
                                    } else if (datasetIndex === 1) {
                                        return `Đã học: ${data.totalEarnedCredits} tín chỉ`;
                                    }
                                },
                            },
                        },
                    },
                },
            });
            return () => {
                newChartInstance.destroy();
            };
        }
    }, [data.totalEarnedCredits, data.totalRequiredCredits]);
    if (!data.totalEarnedCredits || !data.totalRequiredCredits) return null;
    return (
        <div style={{ width: "200px", margin: "0 auto" }}>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};

export default CreditProgressChart;
