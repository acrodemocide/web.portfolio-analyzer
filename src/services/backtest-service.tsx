import axios from 'axios';

export type PortfolioSnapshot = {
    date: Date,
    price: number
}

export type Portfolio = {
    priceHistory: PortfolioSnapshot[]
};

export type BackTestRequest = {
    stocks: {
        [ticker: string]: number
    },
    strategy: string
};

export const BacktestPortfolio = (request: BackTestRequest): Promise<Portfolio> => {
    return axios.post('http://localhost:8000/stocks/backtest/', request).then((response) => {
        let portfolio = {
            priceHistory: [] as PortfolioSnapshot[]
        };
        for (let key in response.data.snapshots) {
            let snapshot: PortfolioSnapshot = {
                date: new Date(key),
                price: response.data.snapshots[key],
            };

            portfolio.priceHistory.push(snapshot);
            
        }

        portfolio.priceHistory.sort((a: PortfolioSnapshot, b: PortfolioSnapshot) => {
            return a.date.getTime() - b.date.getTime();
        });

        return portfolio;
    });
};
