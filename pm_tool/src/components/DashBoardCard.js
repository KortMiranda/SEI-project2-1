import React,{useState, useEffect} from 'react';
import CardHeader from './CardHeader'
import CardFooter from './CardFooter'
import PaginationCard from './CardBody/PaginationCard'
import CompanyInfo from './CardBody/CompanyInfo'
import Stock from './CardBody/Stock'
import Keywords from './CardBody/Keywords'
import Competitors from './CardBody/Competitors'

function DashBoardCard(props) {
    let [contentPerPage, setContentPerPage] = useState(0);
    let [page, setPage] = useState(1);
    let [totalPage, setTotalPage] = useState(1);

    useEffect(()=>{
        if(props.cardType === 'news'){
            setContentPerPage(2)
            setTotalPage((props.newsData.length)/contentPerPage)
        }
        if(props.cardType === 'tweets'){
            setContentPerPage(2)
            setTotalPage((props.tweets.length)/contentPerPage)
        }
    },[props])

    return (
        <div id={(props.cardType==='tweets')?'tweetBoard':''} className={(props.cardType!=='companyInfo')?'dashBoardCard':'dashBoardCardPlain'}>
                <CardHeader cardType={props.cardType}></CardHeader>
                <div className='cardBody'>
                
                {(props.cardType==='news')?<PaginationCard type={props.cardType} contentPerPage={contentPerPage} page={page} data={props.newsData}/>:null}

                {(props.cardType==='companyInfo')?<CompanyInfo nameToDomainData={props.nameToDomainData} stockData={props.stockData} />:null}

                {(props.cardType==='stock')?<Stock stockData={props.stockData} stockPriceDailyData={props.stockPriceDailyData} />:null}

                {(props.cardType==='userKeywords')?<Keywords relatedKeywords={props.relatedKeywords} />:null}

                {(props.cardType==='competitors')?<Competitors competitors={props.competitors} />:null}

                {(props.cardType==='tweets')?<PaginationCard type={props.cardType} contentPerPage={contentPerPage} page={page} data={props.tweets} tweetAnalysis={props.tweetAnalysis}/>:null}

            </div>
            {(props.cardType==='companyInfo'||props.cardType==='stock')?null:<CardFooter page={page} setPage={setPage} totalPage={totalPage}></CardFooter>}
        </div>
    );
}

export default DashBoardCard;