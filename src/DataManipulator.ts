import {ServerRespond} from './DataStreamer';

export interface Row {
  ratio: number;
  upper_bound: number;
  lower_bound: number;
  trigger_alert?: number;
  price_abc: number;
  price_def: number;
  timestamp: Date;
}



export class DataManipulator {
    static generateRow(serverRespond: ServerRespond[]): Row {
        const priceABC = (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price) / 2;
        const priceDEF = (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price) / 2;
        const ratio = priceABC / priceDEF;
        const upperBound = 1 + 0.05;
        const lowerBound = 1 - 0.05;
        return {
            price_abc: priceABC,
            price_def: priceDEF,
            ratio,
            timestamp: serverRespond[0].timestamp > serverRespond[1].timestamp ?
                serverRespond[0].timestamp : serverRespond[1].timestamp,
            upper_bound: upperBound,
            lower_bound: lowerBound,
            trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio : undefined,
        };
    }

    // Helper function to calculate the average price
    static calculateAveragePrice(stockData: number[]): number {
        const sum = stockData.reduce((total, price) => total + price, 0);
        return sum / stockData.length;
    }

    // Helper function to calculate the 12 month historical average ratio
    // @ts-ignore
    static calculateHistoricalRatioAverage(): number {
        // Implement the logic to calculate the historical average ratio
        // based on the historical data
    }
}