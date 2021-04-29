import React from 'react';
import StockGraph from './StockGraph'
function Stock({stockData, stockPriceDailyData}) {

    return (
        <div className="stockGraph">
            {/* {console.log(stockData)} */}
            <span>{stockData['Symbol']}</span>
            <h1>{stockData['Name']}</h1>
           <StockGraph stockPriceDailyData={stockPriceDailyData}></StockGraph>
        </div>
    );
}

export default Stock;