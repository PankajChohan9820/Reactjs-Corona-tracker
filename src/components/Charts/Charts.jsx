import React, { useState } from "react";
import { useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from 'react-chartjs-2';

import styles from './Charts.module.css';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarController,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarController,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


const Charts = ({ data: { confirmed, recovered, deaths }, country }) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }
        fetchAPI();
    },[]);

    const lineChart = (
        dailyData.length ? (
            <Line
                data={{
                    labels: dailyData.map(({ date }) => date),

                    datasets: [{
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: 'Infected',
                        borderColor: "#3333ff",
                        fill: true,
                    }, {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255,0,0,0.5)',
                        fill: true,
                    }],
                }}
            />) : null
    );


    const barChart = (
        confirmed
            ? (
                <Bar
                    data={{
                        labels: ['Infected', 'Recovered', 'Deaths'],
                        datasets: [{
                            label: 'People',
                            backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                            data: [confirmed.value,  deaths.value*3, deaths.value],
                        }]
                    }}
                    options={{
                        legend: { display: false },
                        title: { display: true, text: `Current state ${country}` },
                    }}
                />
            ) : null
    );
    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>

    )
}
export default Charts;

