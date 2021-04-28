import React,{useState, useEffect} from 'react';
import DashBoardCard from './DashBoardCard'
import axios from 'axios'

 
function DashBoard(props) {
    let [nameToDomainData, setNameToDomain] = useState({})
    let [newsData, setNewsData] = useState({})
    let [stockData, setStockData] = useState({})
    let [stockPriceDailyData, setStockPriceDailyData] = useState({})

    useEffect(()=>{
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
    },[])

    return (
        <div className='dashBoardGrid'>
            <div className='col-2'>
                <DashBoardCard cardType={'companyInfo'} nameToDomainData={nameToDomainData} stockData={stockData}></DashBoardCard>
            </div>
            <div className='col-2'>
                <DashBoardCard cardType={'stock'} stockData={stockData} stockPriceDailyData={stockPriceDailyData}/>
            </div>
            <div className='col-1'>
                <DashBoardCard/>
            </div>
            <div className='col-1'>
                <DashBoardCard/>
            </div>
            <div className='col-3'>
                <DashBoardCard cardType={'news'} newsData={newsData}></DashBoardCard>
            </div>

        </div>
    );
}

export default DashBoard;