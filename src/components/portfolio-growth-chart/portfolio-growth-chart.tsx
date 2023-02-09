// import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';

export const PortfolioGrowthChart = () => {
    const theme = useTheme();

    const { primary, secondary } = theme.palette.text;
    const line = theme.palette.divider;

    const primaryKeys: string[] = Object.keys(theme.palette.primary);
    const option700 = primaryKeys[700];

    const options = {
        colors: [theme.palette.primary.main, option700],
        chart: {
            id: 'portfolio-growth-chart'
        },
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002],
            labels: {
                style: {
                    colors: [
                        secondary,
                        secondary,
                        secondary,
                        secondary,
                        secondary,
                        secondary,
                        secondary,
                        secondary,
                        secondary,
                        secondary,
                        secondary,
                        secondary
                    ]
                }
            },
            axisBorder: {
                show: true,
                color: line
            },
            tickAmount: 11
        }
    };

    const series = [
        {
            name: 'Personal Portfolio',
            data: [25, 50, 75, 108, 120, 95, 135, 140, 155, 122, 145, 160]
        },
        {
            name: 'S&P 500',
            data: [25, 43, 55, 66, 60, 77, 68, 75, 88, 95, 100, 110]
        }
    ];

    return <ReactApexChart options={options} series={series} type="area" height={450} />;
};
