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
                data: data.map((data) => data.ranking),
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
            }
        ]
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: `Rankings for ${props.gender} in ${props.year}`
            },
            legend: {
                display: false
            }
        },
        scales: {
            y: {
              title: {
                display: true,
                text: 'Rankings'
              }
            },
            x: {
                title: {
                  display: true,
                  text: 'Weeks'
                }
              }
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
