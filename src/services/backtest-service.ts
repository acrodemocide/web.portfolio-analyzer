import axios from 'axios';

export type Portfolio = {
    price_history: number[];
};

export const BacktestPortfolio = (): Promise<Portfolio> => {
    const body = {
        businessName: 'Tesla',
        ticker: 'T',
        price: '145.23'
    };
    return axios.post('http://localhost:8000/stocks/backtest/', body).then((response) => {
        return response.data;
    });
};
