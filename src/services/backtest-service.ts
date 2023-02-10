import axios from 'axios';
import { Dayjs } from 'dayjs';

export type PriceSnapshot = {
    price: number;
    dateTime: Dayjs;
};

export type Stock = {
    businessName: string;
    ticker: string;
    priceHistory: PriceSnapshot[];
};

export type Portfolio = {
    stocks: Stock[];
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
