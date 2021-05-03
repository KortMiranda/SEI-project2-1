import React,{useState, useEffect} from 'react';
import DashBoardCard from './DashBoardCard'
 
function DashBoard({
    nameToDomainData,
    newsData,
    stockData,
    stockPriceDailyData,
    bingData,
    competitors,
    tweets,
    tweetAnalysis
}) {

    return (
        <div className='dashBoardGrid'>
            {/* {console.log(bingData)} */}
            {/* {console.log(competitors)} */}
            <div className='col-3'>
                <DashBoardCard cardType={'companyInfo'} nameToDomainData={nameToDomainData} stockData={stockData}></DashBoardCard>
            </div>
            <div className='col-3'>
                <DashBoardCard cardType={'stock'} stockData={stockData} stockPriceDailyData={stockPriceDailyData}/>
            </div>
            <div className='col-3'>
                <DashBoardCard cardType={'news'} newsData={newsData}></DashBoardCard>
            </div>
            <div className='col-3'>
                <DashBoardCard cardType={'tweets'} tweets={tweets} tweetAnalysis={tweetAnalysis}></DashBoardCard>
            </div>
            <div className='col-3'>
                <DashBoardCard cardType={'competitors'} competitors={competitors}/>
            </div>
            <div className='col-3'>
                <DashBoardCard cardType={'userKeywords'} relatedKeywords={bingData.relatedSearches}/>
            </div>

        </div>
    );
}

export default DashBoard;