import React,{useState, useEffect} from 'react';
import DashBoardCard from './DashBoardCard'
import axios from 'axios'

 
function DashBoard(props) {
    let [nameToDomainData, setNameToDomain] = useState({})
    let [newsData, setNewsData] = useState({})
    let [stockData, setStockData] = useState({})
    let [stockPriceDailyData, setStockPriceDailyData] = useState({})
    let [bingData, setBingData] = useState({})
    let [competitors, setCompetitors] = useState({})

    useEffect(()=>{
        axios.get('/competitors')
        .then(res=>res.data)
        .then(data=>data.suggestionGroups[0].searchSuggestions)
        .then(searchSuggestions=>setCompetitors(searchSuggestions))
        axios.get('/nameToDomain')
        .then(res=>setNameToDomain(res.data))
        axios.get('/stock')
        .then(res=>setStockData(res.data))
        axios.get('/stockPriceDaily')
        .then(res=>setStockPriceDailyData(res.data))
        axios.get('/news')
        .then(res=>res.data)
        .then(data=>data.response)
        .then(dataResponse=>setNewsData(dataResponse.docs))
        axios.get('/searchKeywords')
        .then(res=>setBingData(res.data))
    },[])

    return (
        <div className='dashBoardGrid'>
            {/* {console.log(bingData)} */}
            {/* {console.log(competitors)} */}
            <div className='col-2'>
                <DashBoardCard cardType={'companyInfo'} nameToDomainData={nameToDomainData} stockData={stockData}></DashBoardCard>
            </div>
            <div className='col-2'>
                <DashBoardCard cardType={'stock'} stockData={stockData} stockPriceDailyData={stockPriceDailyData}/>
            </div>
            <div className='col-1'>
                <DashBoardCard cardType={'userKeywords'} relatedKeywords={bingData.relatedSearches}/>
            </div>
            <div className='col-1'>
                <DashBoardCard cardType={'competitors'} competitors={competitors}/>
            </div>
            <div className='col-3'>
                <DashBoardCard cardType={'news'} newsData={newsData}></DashBoardCard>
            </div>

        </div>
    );
}

export default DashBoard;