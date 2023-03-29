import Chart from "chart.js/auto"; //do not remove else chart won't display
import { Line } from "react-chartjs-2";
import React from "react";

function LineChart(props, key) {
    const data = props.data
    if (!data) {
        return (
            <div>
                <h2 style={{ textAlign: "center" }}>{props.team} Weekly Performance</h2>
                <p>Loading ...</p>
            </div>
        )
    }

    const chartData = {
        labels: data.map((data) => data.week),
        datasets: [
            {
                label: "Rankings",
                data: data.map((data) => data.ranking),
                fill: false,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                yAxisID: 'y',
            },
            {
                label: "Ratings",
                data: data.map((data) => data.rating),
                fill: false,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'y1',
            }
        ]
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: `Rankings for ${props.gender} in ${props.year}`
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Rankings'
                },
                ticks: {
                    stepSize: 1
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Weeks'
                }
            },
            y1: {
                title: {
                    display: true,
                    text: 'Ratings',
                },
                type: 'linear',
                position: 'right',
            },
        }

    }

    return (
        <div className="chart-container">
            <h2 style={{ textAlign: "center" }}>{props.team} Weekly Performance</h2>
            <Line
                data={chartData}
                options={options}
                key={key}
            />
        </div>
    );
}
export default LineChart;
