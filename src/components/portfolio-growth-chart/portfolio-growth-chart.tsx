import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Portfolio } from '../../services/backtest-service';
// eslint-disable-next-line no-unused-vars
import ReactApexChart from 'react-apexcharts';

export type PortfolioGrowthChartProps = {
    portfolio: Portfolio;
};

// chart options
const areaChartOptions = {
    chart: {
        height: 450,
        type: 'area' as 'area',
        toolbar: {
            show: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth' as 'smooth',
        width: 2
    },
    grid: {
        strokeDashArray: 0
    }
};

// ==============================|| INCOME AREA CHART ||============================== //

export const PortfolioGrowthChart = ({ portfolio }: PortfolioGrowthChartProps) => {
    const theme = useTheme();

    const { primary, secondary } = theme.palette.text;
    const line = theme.palette.divider;
    const [options, setOptions] = useState(areaChartOptions);

    const portfolioCategories: number[] = [];
    const portfolioValues: number[] = [];

    // portfolio.forEach((price: number, index: number) => {
    //     portfolioCategories.push(index);
    //     portfolioValues.push(price);
    // });
    for (let i = 0; i < 11; i++) {
        portfolioCategories.push(i);
        portfolioValues.push(portfolio.price_history[i]);
    }

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: [theme.palette.primary.main, theme.palette.primary.dark],
            xaxis: {
                // categories: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
                categories: portfolioCategories,
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
                // TODO: dhoward - set this tick amount based on data we get from props
                tickAmount: 11
            },
            yaxis: {
                labels: {
                    style: {
                        colors: [secondary]
                    }
                }
            },
            grid: {
                borderColor: line,
                strokeDashArray: 0
            },
            tooltip: {
                theme: 'light'
            }
        }));
    }, [primary, secondary, line, theme]);

    const [series, setSeries] = useState([
        // {
        //     name: 'Personal Portfolio',
        //     data: [25, 50, 75, 108, 120, 95, 135, 140, 155, 122, 145, 160]
        // },
        // {
        //     name: 'S&P 500',
        //     data: [25, 43, 55, 66, 60, 77, 68, 75, 88, 95, 100, 110]
        // }
        {
            name: 'Personal Portfolio',
            data: portfolioValues
        }
    ]);

    useEffect(() => {
        setSeries([
            {
                name: 'Personal Portfolio',
                // data: [25, 50, 75, 108, 120, 95, 135, 140, 155, 122, 145, 160]
                data: portfolioValues
            }
            // {
            //     name: 'S&P 500',
            //     data: [25, 43, 55, 66, 60, 77, 68, 75, 88, 95, 100, 110]
            // }
        ]);
    }, []);

    return <ReactApexChart options={options} series={series} type="area" height={450} />;
};
