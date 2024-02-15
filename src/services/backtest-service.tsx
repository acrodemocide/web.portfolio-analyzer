import axios from 'axios';

// TODO: dhoward -- come up with a better return object to handle more data.
//  For now, we're just going to return the price history.
export type Portfolio = {
    price_history: number[];
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
        const snapshots = response.data.snapshots;
        const price_history: number[] = [];
        for (let key in snapshots) {
            price_history.push(snapshots[key]);
        }
        return { price_history };
    });
};
