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
    const tickAmount = 11;
    for (let i = 0; i < 11; i++) {
        portfolioCategories.push(i);
        portfolioValues.push(portfolio.price_history[i]);
    }

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: [theme.palette.primary.main, theme.palette.primary.dark],
            xaxis: {
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
                tickAmount
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
    }, [primary, secondary, line, theme, portfolio]);

    const [series, setSeries] = useState([
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
                data: portfolioValues
            }
            // {
            //     name: 'S&P 500',
            //     data: [25, 43, 55, 66, 60, 77, 68, 75, 88, 95, 100, 110]
            // }
        ]);
    }, [portfolio]);

    return <ReactApexChart options={options} series={series} type="area" height={450} />;
};
