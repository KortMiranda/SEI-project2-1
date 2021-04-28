import React,{useState, useEffect} from 'react';
import CardHeader from './CardHeader'
import CardFooter from './CardFooter'
import News from './CardBody/News'
import CompanyInfo from './CardBody/CompanyInfo'
import Stock from './CardBody/Stock'

function DashBoardCard(props) {
    let [contentPerPage, setContentPerPage] = useState(0);
    let [page, setPage] = useState(1);
    let [totalPage, setTotalPage] = useState(1);

    useEffect(()=>{
        if(props.cardType === 'news'){
            setContentPerPage(2)
            setTotalPage((props.newsData.length)/contentPerPage)
        }
    },[props])

    return (
        <div className='dashBoardCard'>
            {(props.cardType==='companyInfo')?null:<CardHeader cardType={props.cardType}></CardHeader>}
            <div className='cardBody'>
                {/* <EComerce></EComerce> */}
                <News contentPerPage={contentPerPage} page={page} newsData={props.newsData}></News>
                {(props.cardType==='companyInfo')?<CompanyInfo nameToDomainData={props.nameToDomainData} stockData={props.stockData} />:null}
                {(props.cardType==='stock')?<Stock stockData={props.stockData} stockPriceDailyData={props.stockPriceDailyData} />:null}
            </div>
            {(props.cardType==='companyInfo')?null:<CardFooter page={page} setPage={setPage} totalPage={totalPage}></CardFooter>}
        </div>
    );
}

export default DashBoardCard;