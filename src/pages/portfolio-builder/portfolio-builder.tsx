import { Typography } from '@mui/material';
import { FormSelectInput } from 'components/form/form-fields/form-select-input';
import React from 'react';
import { useState } from 'react';
import { Form } from '../../components/form/form';
import { FormTextInput } from '../../components/form/form-fields/form-text-input';

const handleSubmit = (principalAmount: string, startYear: string, endYear: string, benchMark: string, tickerSymbol: string) => {
    const header = 'Submitted!\n';
    const principalAmountStr = `principalAmount: ${principalAmount}\n`;
    const startYearStr = `startYear: ${startYear}\n`;
    const endYearStr = `endYear: ${endYear}\n`;
    const benchMarkStr = `benchMark: ${benchMark}\n`;
    const tickerSymbolStr = `tickerSymbol: ${tickerSymbol}\n`;
    const message = `${header}${principalAmountStr}${startYearStr}${endYearStr}${benchMarkStr}${tickerSymbolStr}`;

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

const PortfolioBuilder = () => {
    const [formPrincipalAmount, setFormPrincipalAmount] = useState('');
    const [formStartYear, setFormStartYear] = useState('');
    const [formEndYear, setFormEndYear] = useState('');
    const [formBenchMark, setFormBenchMark] = useState('');
    const [formTickerSymbol, setFormTickerSymbol] = useState('');

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
                    handleSubmit(formPrincipalAmount, formStartYear, formEndYear, formBenchMark, formTickerSymbol);
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
                <FormTextInput
                    id={'tickerInput'}
                    label={'Ticker Symbol'}
                    value={formTickerSymbol}
                    onChange={(e) => setFormTickerSymbol(e.target.value)}
                />
            </Form>
        </React.Fragment>
    );
};

export default PortfolioBuilder;
