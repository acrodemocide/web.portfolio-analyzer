import axios from 'axios';

// TODO: we need to make this into a portfolio type
export type StockType = {
    businessName: string;
    ticker: string;
    // TODO: dhoward -- determine how we want to indicate intervals (i.e.: yearly, monthly, etc)
    priceHistory: number[];
};

export const BacktestPortfolio = () => {
    const body = {
        businessName: 'Tesla',
        ticker: 'T',
        price: '145.23'
    };
    return axios.post('http://localhost:8000/stocks/backtest/', body).then((response) => {
        return response.data;
    });
};
