import { useRef, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { IMetric } from "../../types/commonType";
Chart.register(...registerables);

const GradeStatisticsChart = ({ data }: { data: IMetric }) => {
    const chartContainer = useRef(null);

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            const newChartInstance = new Chart(chartContainer.current, {
                type: "bar",
                data: {
                    datasets: [
                        {
                            yAxisID: "y",
                            type: "bar",
                            label: "Điểm của bạn",
                            data: data.grades,
                            backgroundColor: "rgb(250,108,81)",
                            order: 2,
                        },
                        {
                            yAxisID: "y1",
                            type: "line",
                            label: "Điểm TB lớp học phần",
                            data: data.averages,
                            fill: false,
                            borderColor: "#fdcd56",
                            tension: 0.4,
                            order: 1,
                            borderWidth: 1,
                            pointRadius: 5,
                            pointHoverRadius: 7,
                            pointBackgroundColor: "#fdcd56",
                        },
                    ],
                    labels: data.subjects,
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                display: false, // this will hide the y-axis labels on the left
                            },
                            title: {
                                display: true,
                                text: "Điểm TB lớp học phần",
                                align: "center",
                            },
                        },
                        y1: {
                            type: "linear",
                            display: true,
                            position: "right",
                            beginAtZero: true,
                            ticks: {
                                display: false,
                            },
                            title: {
                                display: true,
                                text: "Điểm của bạn",
                                align: "center",
                            },
                            grid: {
                                drawOnChartArea: false,
                            },
                        },
                        x: {
                            display: false,
                        },
                    },
                    interaction: {
                        intersect: false,
                        mode: "index",
                    },
                    plugins: {
                        legend: {
                            position: "bottom",
                        },
                        tooltip: {
                            backgroundColor: "#B7DFFF",
                            multiKeyBackground: "#B7DFFF",
                            titleColor: "#000",
                            bodyColor: "#000",
                            xAlign: "center",
                            yAlign: "top",
                            callbacks: {
                                title: function (context) {
                                    return context[0].label;
                                },
                                label: function (context) {
                                    let label = context.dataset.label || "";
                                    if (label) {
                                        label += ": ";
                                    }
                                    label += context.parsed.y;
                                    return label;
                                },
                            },
                        },
                    },
                },
                plugins: [
                    {
                        id: "customPlugin",
                        afterDraw: (chart) => {
                            const ctx = chart.ctx;
                            ctx.font = "12px Arial";
                            ctx.textAlign = "center";
                            ctx.textBaseline = "bottom";
                            ctx.fillStyle = "#171725";
                            chart.data.datasets.forEach((dataset, index) => {
                                if (dataset.type === "bar") {
                                    const meta = chart.getDatasetMeta(index);
                                    meta.data.forEach((bar) => {
                                        const data =
                                            dataset.data[
                                                meta.data.indexOf(bar)
                                            ];
                                        if (data !== null) {
                                            ctx.fillText(
                                                data.toString(),
                                                bar.x,
                                                bar.y - 5
                                            );
                                        }
                                    });
                                }
                            });
                        },
                    },
                ],
            });

            return () => {
                newChartInstance.destroy();
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex-1">
            <canvas ref={chartContainer} />
        </div>
    );
};

export default GradeStatisticsChart;
