import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Form } from '../components/form/form';
import { FormTextInput } from '../components/form/form-fields/form-text-input';
import { FormSelectInput } from '../components/form/form-fields/form-select-input';
import { BackTestRequest, BacktestPortfolio, Portfolio, PortfolioSnapshot } from '../services/backtest-service';
import { LineChart } from '@mui/x-charts/LineChart';
import { TextField, Button, Box, InputAdornment } from '@mui/material';
import { ButtonPrimary } from '../components/buttons/button-primary';

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

    const initialStockPicks: StockPick[] = [{
        ticker: '',
        percent: ''
    }];

    const benchMarkMenuItems: string[] = ['None', 'S&P 500', 'DJIA', 'NASDAQ 100']

    const [formPrincipalAmount, setFormPrincipalAmount] = useState('');
    const [formattedPrincipalAmount, setFormattedPrincipalAmount] = useState('');
    const [formBenchMark, setFormBenchMark] = useState(benchMarkMenuItems[0]);
    const [stockPicks, setStockPicks] = useState(initialStockPicks);
    const [portfolio, setPortfolio] = useState({ priceHistory: [] as PortfolioSnapshot[] } as Portfolio);
    const [calculatedBenchmark, setCalculatedBenchmark] = useState('');
    const [formStartDate, setFormStartDate] = useState(new Date());
    const [formEndDate, setFormEndDate] = useState(new Date());
    const [totalPercentage, setTotalPercentage] = useState(0);

    const handleTickerChange = (ticker: string, index: number) => {
        let stockPick: StockPick = stockPicks[index];
        stockPicks[index] = { ...stockPick, ticker };
        setStockPicks([...stockPicks]);
    };

    const handlePercentChange = (percent: string, index: number) => {
        let stockPick: StockPick = stockPicks[index];
        stockPicks[index] = { ...stockPick, percent };
        setStockPicks([...stockPicks]);
        updateTotalPercentage([...stockPicks]);
    };

    const updateTotalPercentage = (picks: StockPick[]) => {
        const total = picks.reduce((sum, stock) => {
            const percentValue = parseFloat(stock.percent) || 0;
            return sum + percentValue;
        }, 0);
        setTotalPercentage(total);
    };

    const addStock = () => {
        setStockPicks([...stockPicks, { ticker: '', percent: '' }]);
    };

    const removeStock = (index: number) => {
        const updatedStocks = [...stockPicks];
        updatedStocks.splice(index, 1);
        setStockPicks(updatedStocks);
        updateTotalPercentage(updatedStocks);
    };

    const convertBenchmarkToTicker = (benchmark: string) => {
        switch(benchmark) {
            case 'S&P 500':
                return 'SPY';
            case 'DJIA':
                return 'DIA';
            case 'NASDAQ 100':
                return 'QQQ';
            case 'None':
                return '';
            default:
                return '';
        }
    }

    const formatAsDollars = (value: string): string => {
        let numericValue = value.replace(/[^0-9.]/g, '');
        const decimalPointCount = (numericValue.match(/\./g) || []).length;
        if (decimalPointCount > 1) {
            const parts = numericValue.split('.');
            numericValue = parts[0] + '.' + parts.slice(1).join('');
        }
        if (numericValue === '') {
            return '';
        }
        const number = parseFloat(numericValue);
        if (!isNaN(number)) {
            const parts = numericValue.split('.');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return parts.join('.');
        }
        return numericValue;
    };

    const handlePrincipalAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        const numericValue = rawValue.replace(/[^0-9.]/g, '');
        setFormPrincipalAmount(numericValue);
        setFormattedPrincipalAmount(formatAsDollars(numericValue));
    };

    const handleSubmit = () => {
        const filteredStockPicks = stockPicks.filter((x) => x.ticker !== '' && x.percent !== '');
        const backTestRequest: BackTestRequest = {
            stocks: {},
            strategy: 'buy_and_hold',
            initial_value: parseFloat(formPrincipalAmount),
            start_date: formStartDate,
            end_date: formEndDate,
            benchmark_ticker: convertBenchmarkToTicker(formBenchMark),
        }
        filteredStockPicks.forEach((x) => {
            backTestRequest.stocks[x.ticker] = parseFloat(x.percent) / 100.0;
        });
        BacktestPortfolio(backTestRequest).then((response) => {
            setPortfolio(response);
            setCalculatedBenchmark(formBenchMark);
        });
    };

    return (
        <React.Fragment>
            <Typography variant="h2" gutterBottom>
                Portfolio Builder
            </Typography>
            <Typography variant="body2" gutterBottom>
                {text}
            </Typography>
            
            <Form 
                handleSubmit={handleSubmit}
                disabled={totalPercentage !== 100}
                disabledTooltip="Portfolio allocation must equal exactly 100% before saving"
            >
                <FormTextInput
                    id={'principalAmount'}
                    label={'Principal Amount'}
                    value={formattedPrincipalAmount}
                    onChange={handlePrincipalAmountChange}
                    startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                    }
                />
                <TextField
                    sx={{marginBottom: '10px'}}
                      label="Select Start Date"
                      type="date"
                      value={formStartDate}
                      onChange={(e: any) => setFormStartDate(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                <TextField
                    sx={{marginBottom: '10px'}}
                      label="Select End Date"
                      type="date"
                      value={formEndDate}
                      onChange={(e: any) => setFormEndDate(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                <FormSelectInput
                    label={'Bench Mark'}
                    menuItems={benchMarkMenuItems}
                    value={formBenchMark}
                    onChange={e =>  setFormBenchMark(e.target.value)}
                />
                <Typography variant="h3" gutterBottom>
                    Select your stocks
                </Typography>
                
                <Box sx={{ 
                    mb: 2, 
                    p: 1, 
                    border: '1px solid', 
                    borderColor: totalPercentage === 100 ? 'success.main' : 
                                totalPercentage > 100 ? 'error.main' : 
                                'warning.main',
                    borderRadius: 1,
                    bgcolor: 'background.paper',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Typography variant="body1">
                        Total allocation: {totalPercentage}%
                    </Typography>
                    <Typography variant="body2" color={
                        totalPercentage === 100 ? 'success.main' : 
                        totalPercentage > 100 ? 'error.main' : 
                        'warning.main'
                    }>
                        {totalPercentage === 100 ? 'Perfect!' : 
                         totalPercentage > 100 ? 'Over 100%' : 
                         'Under 100%'}
                    </Typography>
                </Box>
                
                <div>
                    {stockPicks.map((stockPick: StockPick, index: number) => {
                        return (
                            <Grid key={index} container spacing={2} alignItems="center" sx={{ mb: 2 }}>
                                <Grid item xs={6} sm={7}>
                                    <FormTextInput
                                        id={`tickerInput_${index}`}
                                        label={'Ticker Symbol'}
                                        value={stockPick.ticker}
                                        onChange={(e) => {
                                            handleTickerChange(e.target.value, index);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={4} sm={3}>
                                    <FormTextInput
                                        id={`tickerPercent_${index}`}
                                        label={'Percent'}
                                        value={stockPick.percent}
                                        onChange={(e) => {
                                            if (!isNaN(parseFloat(e.target.value)) || e.target.value === '') {
                                                handlePercentChange(e.target.value, index);
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Button 
                                        variant="outlined" 
                                        color="error" 
                                        onClick={() => removeStock(index)}
                                        disabled={stockPicks.length <= 1}
                                    >
                                        Remove
                                    </Button>
                                </Grid>
                            </Grid>
                        );
                    })}
                </div>

                <Box sx={{ mt: 2, mb: 3 }}>
                    <ButtonPrimary onClick={addStock}>
                        Add Stock
                    </ButtonPrimary>
                </Box>
            </Form>
            { portfolio.priceHistory.length > 0 && (
                <div style={{marginLeft: '30px'}}>
                    <LineChart
                        sx={{padding:'15px'}}
                        xAxis = {[{
                            scaleType: 'time',
                            data: portfolio.priceHistory.map((p: PortfolioSnapshot) => p.date)
                        }]}
                        yAxis={[
                            {id: 'price', scaleType: 'linear', label: 'Price'}
                        ]}
                        series={[
                            {
                                yAxisKey: 'price', data: portfolio.priceHistory.map((p: PortfolioSnapshot) => p.price), color: 'blue', showMark: false, label: 'Portfolio',
                            },
                            {
                                yAxisKey: 'price', data: portfolio.benchmark.map((p: PortfolioSnapshot) => p.price), color: 'red', showMark: false, label: calculatedBenchmark === 'None' ? undefined : `${calculatedBenchmark}`,
                            }
                        ]}
                        width={1300}
                        height={600}
                    />
                </div>
                )}
        </React.Fragment>
    )
};
