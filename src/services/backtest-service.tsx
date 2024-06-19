import axios from 'axios';

export type PortfolioSnapshot = {
    date: Date,
    price: number
}

export type Portfolio = {
    priceHistory: PortfolioSnapshot[]
};

export const BacktestPortfolio = (): Promise<Portfolio> => {
    // TODO: dhoward -- this is a placeholder for the actual body
    const body = {
        "stocks": {
            "asdf": 0.25,
            "fdsa": 0.75
        },
        "strategy": "new_algorithm"
    };
    return axios.post('http://localhost:8000/stocks/backtest/', body).then((response) => {
        // const price_history: number[] = [];
        let portfolio = {
            priceHistory: [] as PortfolioSnapshot[]
        };
        for (let key in response.data.snapshots) {
            let snapshot: PortfolioSnapshot = {
                date: new Date(key),
                price: response.data.snapshots[key],
            };

            portfolio.priceHistory.push(snapshot);
            // price_history.push(snapshots[key]);
        }
        // return { price_history };
        console.log('@@portfolio', portfolio);
        return portfolio;
    });
};
