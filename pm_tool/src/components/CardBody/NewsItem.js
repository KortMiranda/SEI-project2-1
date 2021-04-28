import React,{useState, useEffect} from 'react';

function NewsItem({headline, abstract, source, prvImg, pubDate}) {
    let [imgURL, setImgURL] = useState('')

    useEffect(()=>{
        if(prvImg!==undefined){
            setImgURL(prvImg.url)
     }
    },[prvImg])

    return (
        
            <div className="newsItem">
                <div className={(imgURL!=='')?'w-9/12':'w-full'}>
                    <div className="flex items-center">
                        <img className="w-6 h-6 object-cover rounded-sm" src='/img/nytLogo.png' alt="NewYorkTimesLogo"/>
                        <span className="text-xs">{source}</span>
                    </div>
                    <h1 className="text-lg font-medium newsHeadLine">{headline}</h1>
                    <span className="text-xs">{pubDate}</span>
                </div>
                {/* <p>{abstract}</p> */}
                {(imgURL!=='')?<img className="w-20 h-20 object-cover rounded-lg" src={`https://static01.nyt.com/${imgURL}`} alt={headline}/>:null}
            </div>
    
    );
}

export default NewsItem;