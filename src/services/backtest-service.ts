import axios from 'axios';

export const BacktestPortfolio = () => {
    const body = {
        businessName: 'Tesla',
        ticker: 'T',
        price: '145.23'
    };
    return axios.post('http://localhost:8000/stocks/backtest/', body).then((response) => {
        return response.data;
    });
    // return [];
};
