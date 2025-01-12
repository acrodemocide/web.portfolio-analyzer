import axios from 'axios';

export type PortfolioSnapshot = {
    date: Date,
    price: number
}

export type Portfolio = {
    priceHistory: PortfolioSnapshot[];
    benchmark: PortfolioSnapshot[];
};

export type BackTestRequest = {
    stocks: {
        [ticker: string]: number
    },
    strategy: string,
    initial_value: number,
    start_date: Date,
    end_date: Date,
    benchmark_ticker: string,
};

export const BacktestPortfolio = (request: BackTestRequest): Promise<Portfolio> => {
    return axios.post('http://localhost:8000/stocks/backtest/', request).then((response) => {
        let portfolio = {
            priceHistory: [] as PortfolioSnapshot[],
            benchmark: [] as PortfolioSnapshot[],
        };
        for (let key in response.data.snapshots) {
            let snapshot: PortfolioSnapshot = {
                date: new Date(key),
                price: response.data.snapshots[key],
            };

            portfolio.priceHistory.push(snapshot);
        }
        for (let key in response.data.benchmark) {
            let snapshot: PortfolioSnapshot = {
                date: new Date(key),
                price: response.data.benchmark[key],
            };

            portfolio.benchmark.push(snapshot);
        }

        portfolio.priceHistory.sort((a: PortfolioSnapshot, b: PortfolioSnapshot) => {
            return a.date.getTime() - b.date.getTime();
        });

        return portfolio;
    });
};
