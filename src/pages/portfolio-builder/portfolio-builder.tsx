import { Typography } from '@mui/material';
import { FormSelectInput } from 'components/form/form-fields/form-select-input';
import React from 'react';
import { useState } from 'react';
import { Form } from '../../components/form/form';
import { FormTextInput } from '../../components/form/form-fields/form-text-input';

const handleSubmit = (startYear: string) => {
    const header = 'Submitted!\n';
    const startYearStr = `startYear: ${startYear}\n`;
    const message = `${header}${startYearStr}`;

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
                    handleSubmit(formStartYear);
                }}
            >
                <FormTextInput
                    id={'principalAmount'}
                    label={'Principal Amount'}
                    value={formPrincipalAmount}
                    onChange={(e) => setFormPrincipalAmount(e.target.value)}
                />
                <FormSelectInput
                    id={'id'}
                    label={'Start Year'}
                    menuItems={['2019', '2020', '2021']}
                    value={formStartYear}
                    onChange={(e) => {
                        setFormStartYear(e.target.value);
                    }}
                />
            </Form>
        </React.Fragment>
    );
};

export default PortfolioBuilder;
