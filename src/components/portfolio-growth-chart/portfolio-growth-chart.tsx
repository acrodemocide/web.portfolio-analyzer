import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
// eslint-disable-next-line no-unused-vars
import ReactApexChart from 'react-apexcharts';

export type PortfolioGrowthChartProps = {
    slot?: string;
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

export const PortfolioGrowthChart = ({ slot }: PortfolioGrowthChartProps) => {
    const theme = useTheme();

    const { primary, secondary } = theme.palette.text;
    const line = theme.palette.divider;

    const [options, setOptions] = useState(areaChartOptions);

    const primaryKeys: string[] = Object.keys(theme.palette.primary);
    const option700: string = primaryKeys[700];

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: [theme.palette.primary.main, option700],
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
        {
            name: 'Personal Portfolio',
            data: [25, 50, 75, 100, 110, 130, 150]
        },
        {
            name: 'S&P 500',
            data: [25, 35, 55, 40, 65, 88, 98]
        }
    ]);

    useEffect(() => {
        setSeries([
            {
                name: 'Personal Portfolio',
                data: [25, 50, 75, 108, 120, 95, 135, 140, 155, 122, 145, 160]
            },
            {
                name: 'S&P 500',
                data: [25, 43, 55, 66, 60, 77, 68, 75, 88, 95, 100, 110]
            }
        ]);
    }, []);

    return <ReactApexChart options={options} series={series} type="area" height={450} />;
};
