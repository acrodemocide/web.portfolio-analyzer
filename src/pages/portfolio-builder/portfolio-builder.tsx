import { Typography, Grid } from '@mui/material';
import { FormSelectInput } from 'components/form/form-fields/form-select-input';
import React from 'react';
import { useState } from 'react';
import { Form } from '../../components/form/form';
import { FormTextInput } from '../../components/form/form-fields/form-text-input';

const handleSubmit = (principalAmount: string, startYear: string, endYear: string, benchMark: string, stockPicks: StockPick[]) => {
    const header = 'Submitted!\n';
    const principalAmountStr = `principalAmount: ${principalAmount}\n`;
    const startYearStr = `startYear: ${startYear}\n`;
    const endYearStr = `endYear: ${endYear}\n`;
    const benchMarkStr = `benchMark: ${benchMark}\n`;

    let stockPicksStr = 'STOCK PICKS:\n';
    stockPicks.forEach((x, index) => {
        let str = `${index} -- Ticker: ${x.ticker === '' ? '[empty]' : x.ticker}, Percent: ${x.percent === '' ? '[empty]' : x.percent}\n`;
        stockPicksStr += str;
    });

    const message = `${header}${principalAmountStr}${startYearStr}${endYearStr}${benchMarkStr}${stockPicksStr}`;

    alert(message);
};

const text =
    'Welcome to the Portfolio Builder. Here you can select a list of ' +
    'stocks that you want to put into your portfolio and designate the ' +
    'percentage each stock makes up of your portfolio. Here you can ' +
    'backtest your picks against historical stock data to determine how ' +
    'well your portfolio would have performed during the period selected. ' +
    'You can choose from a number of benchmarks to compare your portfolio ' +
    'against for that same period.';

interface StockPick {
    ticker: string;
    percent: string;
}

const PortfolioBuilder = () => {
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

    return (
        <React.Fragment>
            <Typography variant="h1" gutterBottom>
                Portfolio Builder
            </Typography>
            <Typography variant="body1" gutterBottom>
                {text}
            </Typography>
            <Form
                handleSubmit={() => {
                    handleSubmit(formPrincipalAmount, formStartYear, formEndYear, formBenchMark, stockPicks);
                }}
            >
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
    );
};

export default PortfolioBuilder;
