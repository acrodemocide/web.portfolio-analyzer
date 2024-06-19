import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Form } from '../components/form/form';
import { FormTextInput } from '../components/form/form-fields/form-text-input';
import { FormSelectInput } from '../components/form/form-fields/form-select-input';
import { BacktestPortfolio, Portfolio, PortfolioSnapshot } from '../services/backtest-service';
import { LineChart } from '@mui/x-charts/LineChart';
import { selectChartData, generateXAxisLabels, getPriceHistory } from './portfolio-builder.services';

interface StockPick {
    ticker: string;
    percent: string;
}

export const PortfolioBuilder = () => {
    const text =
    'Welcome to the Portfolio Builder. Here you can select a list of ' +
    'stocks that you want to put into your portfolio and designate the ' +
    'percentage each stock makes up of your portfolio. Here you can ' +
    'backtest your picks against historical stock data to determine how ' +
    'well your portfolio would have performed during the period selected. ' +
    'You can choose from a number of benchmarks to compare your portfolio ' +
    'against for that same period.';

    const initialStockPicks: StockPick[] = [];
    for (let i = 0; i < 10; i++) {
        initialStockPicks.push({
            ticker: '',
            percent: ''
        });
    }

    const [formPrincipalAmount, setFormPrincipalAmount] = useState('');
    const [formStartYear, setFormStartYear] = useState('');
    const [formEndYear, setFormEndYear] = useState('');
    const [formBenchMark, setFormBenchMark] = useState('');
    const [stockPicks, setStockPicks] = useState(initialStockPicks);
    // const [portfolio, setPortfolio] = useState({ price_history: [] as number[] } as Portfolio);
    const [portfolio, setPortfolio] = useState({ priceHistory: [] as PortfolioSnapshot[] } as Portfolio);

    const handleTickerChange = (ticker: string, index: number) => {
        let stockPick: StockPick = stockPicks[index];
        stockPicks[index] = { ...stockPick, ticker };
        setStockPicks([...stockPicks]);
    };

    const handlePercentChange = (percent: string, index: number) => {
        let stockPick: StockPick = stockPicks[index];
        stockPicks[index] = { ...stockPick, percent };
        setStockPicks([...stockPicks]);
    };

    const handleSubmit = () => {
        const header = 'Submitted!\n';
        const principalAmountStr = `principalAmount: ${formPrincipalAmount}\n`;
        const startYearStr = `startYear: ${formStartYear}\n`;
        const endYearStr = `endYear: ${formEndYear}\n`;
        const benchMarkStr = `benchMark: ${formBenchMark}\n`;

        let stockPicksStr = 'STOCK PICKS:\n';
        stockPicks.forEach((x, index) => {
            let str = `${index} -- Ticker: ${x.ticker === '' ? '[empty]' : x.ticker}, Percent: ${
                x.percent === '' ? '[empty]' : x.percent
            }\n`;
            stockPicksStr += str;
        });

        const message = `${header}${principalAmountStr}${startYearStr}${endYearStr}${benchMarkStr}${stockPicksStr}`;

        console.log('@@message: ', message);
        BacktestPortfolio().then((response) => {
            setPortfolio(response);
        });
    };

    // const dates: Date[] = [];
    // const priceHistoryIndex: number[] = [];
    // for (let i = 0; i < portfolio.price_history.length; i++) {
    //     let date = new Date();
    //     date.setDate(date.getDate() + i);
    //     dates.push(date);
    //     priceHistoryIndex.push(i);
    // }
    // console.log('@@dates: ', dates);

    // let res: any = dates.map((date: Date, index: number) => {
    //     return date.getUTCMonth();
    // });
    // console.log('@@res: ', res);

    // TODO: dhoward -- dummy code - remove when done
    // let selectedChartData = selectChartData(dates, priceHistoryIndex);
    // let labels = generateXAxisLabels(dates);
    // console.log('@@asdf', selectedChartData);
    // console.log('@@fdsa', labels);
    // END TODO: dhoward -- dummy code - remove when done

    return (
        <React.Fragment>
            <Typography variant="h2" gutterBottom>
                Portfolio Builder
            </Typography>
            <Typography variant="body2" gutterBottom>
                {text}
            </Typography>
                { portfolio.priceHistory.length > 0 && (
                    // <LineChart
                    // // TODO: dhoward -- we can hardcode the same number of values for the display on x-axis as exists in the data
                    //     xAxis = {[{
                    //         scaleType: 'time',
                    //         // data: generateXAxisLabels(selectChartData(portfolio)),
                    //         // data: generateXAxisLabels(portfolio)
                    //         // tickNumber: 10
                    //         data: portfolio.priceHistory.map((p: PortfolioSnapshot) => p.date)
                    //     }]}
                    //     yAxis={[
                    //         {id: 'price', scaleType: 'linear', label: 'Price'}
                    //     ]}
                    //     series={[
                    //         {
                    //             yAxisKey: 'price', data: portfolio.priceHistory.map((p: PortfolioSnapshot) => p.price),
                    //         },
                    //     ]}
                    //     width={1000}
                    //     height={600}
                    // />



                    // <LineChart
                    //     series={portfolio.priceHistory}
                    //     width={1000}
                    //     height={600}
                    // />
                    <>
                        <Typography variant="h1">
                            {portfolio.priceHistory[portfolio.priceHistory.length - 1].price}
                        </Typography>
                        <Grid container>
                            {
                                portfolio.priceHistory.map((snapshot: PortfolioSnapshot, index:number) => {
                                    return (
                                        <>
                                            <Grid item xs={12}>
                                                {snapshot.price}
                                            </Grid>
                                        </>
                                    );
                                })}
                        </Grid>
                    </>
                )}
            
            <Form handleSubmit={handleSubmit}>
                <FormTextInput
                    id={'principalAmount'}
                    label={'Principal Amount'}
                    value={formPrincipalAmount}
                    onChange={(e) => setFormPrincipalAmount(e.target.value)}
                />
                <FormSelectInput
                    label={'Start Year'}
                    menuItems={['2019', '2020', '2021']}
                    value={formStartYear}
                    onChange={(e) => {
                        setFormStartYear(e.target.value);
                    }}
                />
                <FormSelectInput
                    label={'End Year'}
                    menuItems={['2020', '2021', '2022']}
                    value={formEndYear}
                    onChange={(e) => {
                        setFormEndYear(e.target.value);
                    }}
                />
                <FormSelectInput
                    label={'Bench Mark'}
                    menuItems={['S&P 500', 'DJIA', 'NASDAQ']}
                    value={formBenchMark}
                    onChange={(e) => {
                        setFormBenchMark(e.target.value);
                    }}
                />
                <Typography variant="h3" gutterBottom>
                    Select your stocks
                </Typography>
                <div>
                    {stockPicks.map((stockPick: StockPick, index: number) => {
                        return (
                            <Grid key={index} container>
                                <Grid item xs={8}>
                                    <FormTextInput
                                        id={`tickerInput_${index}`}
                                        label={'Ticker Symbol'}
                                        value={stockPick.ticker}
                                        onChange={(e) => {
                                            handleTickerChange(e.target.value, index);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <FormTextInput
                                        id={`tickerPercent_${index}`}
                                        label={'Percent'}
                                        value={stockPick.percent}
                                        onChange={(e) => {
                                            handlePercentChange(e.target.value, index);
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        );
                    })}
                </div>
            </Form>
        </React.Fragment>
    )
};
