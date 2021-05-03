import React from 'react';
import StockGraph from './StockGraph'
function Stock({stockData, stockPriceDailyData}) {

    return (
        <div className="stockGraph">
            <h2 className="stockSymbol">{stockData['Symbol']}</h2>
            <h1>{stockData['Name']}</h1>
           <StockGraph stockPriceDailyData={stockPriceDailyData}></StockGraph>
        </div>
    );
}

export default Stock;