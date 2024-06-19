import { Portfolio, PortfolioSnapshot } from '../services/backtest-service';

const NUMBER_OF_TICKS = 10;

export const selectChartData = (portfolio: Portfolio): Portfolio => {
    let dataIncrement: number = Math.floor(portfolio.priceHistory.length / NUMBER_OF_TICKS);
    let selectedPriceHistory: PortfolioSnapshot[] = portfolio.priceHistory.filter(
        (p: PortfolioSnapshot, i: number) => i % dataIncrement === 0);

    let selectedPortfolio: Portfolio = {
        priceHistory: [...selectedPriceHistory],
    }

    console.log('@@selectedPortfolio: ', selectedPortfolio);

    return selectedPortfolio
    
    // return {
    //     priceHistory: [...selectedPriceHistory],
    // };
}

export const generateXAxisLabels = (portfolio: Portfolio): Date[] => {
    // let strDates: string[] = portfolio.priceHistory.map(
    //     (p: PortfolioSnapshot) => `${p.date.getMonth()}.${p.date.getFullYear()}`)

    // console.log('@@strDates: ', strDates);
    // return strDates;
    return portfolio.priceHistory.map((p: PortfolioSnapshot) => p.date);
}

export const getPriceHistory = (portfolio: Portfolio): number[] => {
    let priceHistory: number[] = portfolio.priceHistory.map((p: PortfolioSnapshot) => p.price);
    console.log('@@priceHistory: ', priceHistory);
    return priceHistory
}