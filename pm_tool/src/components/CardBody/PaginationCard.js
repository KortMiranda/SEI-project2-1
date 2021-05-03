import React,{useState, useEffect} from 'react';
import NewsItem from './NewsItem'
import Tweet from './Tweet'

function PaginationCard({type, contentPerPage, page, data,tweetAnalysis}) {
    const [newsArray, setNewsArray] = useState([]);
    const [tweetsArray, setTweetsArray] = useState([]);
    const firstArticleIndex = page*contentPerPage-2
    const secondArticleIndex = page*contentPerPage-1

    useEffect(()=>{
        if(data !== undefined){
            if(type==='news'){
                setNewsArray(data)
            }
            if(type==='tweets'){
                setTweetsArray(data)
            }
        }
    },[data])

    let newsItemList = (newsArray.length>1)?
        newsArray.map((item,index)=>{
            return(
                <div key={index} className="cardBodyItem">
                    <NewsItem
                    headline={item.name}
                    description={item.description}
                    source={item.provider}
                    prvImg={(item.image)?item.image.thumbnail.contentUrl:null}
                    pubDate={item['datePublished']}
                    />
                </div>
            )
        })
    :null;
    
    let tweetsList = (tweetsArray.length>1)?
    tweetsArray.map((tweet,index)=>{
        return(
            <div key={tweet.id} className='tweet'>
                <Tweet id={tweet.id} index={index} text={tweet.text} lang={tweet.lang} tweetAnalysis={tweetAnalysis['data']}/>
            </div>
        )
    }):null
    

    return (
        <>
            {(newsItemList!==null)?newsItemList[firstArticleIndex]:null}
            {(newsItemList!==null)?newsItemList[secondArticleIndex]:null}
            {(tweetsList!==null)?tweetsList[firstArticleIndex]:null}
            {(tweetsList!==null)?tweetsList[secondArticleIndex]:null}
        </>
    );
}

export default PaginationCard;