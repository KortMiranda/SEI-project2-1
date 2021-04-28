import React,{useState, useEffect} from 'react';
import NewsItem from './NewsItem'

function News({contentPerPage, page, newsData}) {
    const [newsArray, setNewsArray] = useState([]);
    const firstArticleIndex = page*contentPerPage-2
    const secondArticleIndex = page*contentPerPage-1

    useEffect(()=>{
        if(newsData !== undefined){
            setNewsArray(newsData)
        }
    },[newsData])

    let newsItemList = (newsArray.length>1)?
        newsArray.map((item,index)=>{
            return(
                <div key={index}>
                    <NewsItem
                    headline={item.headline.main}
                    abstract={item.abstract}
                    source={item.source}
                    prvImg={item.multimedia[45]}
                    pubDate={item['pub_date']}
                    />
                </div>
            )
        })
    :null;
        
    

    return (
        <>
            {(newsItemList!==null)?newsItemList[firstArticleIndex]:null}
            {(newsItemList!==null)?newsItemList[secondArticleIndex]:null}
        </>
    );
}

export default News;