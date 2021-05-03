import React,{useState, useEffect} from 'react';

function NewsItem({headline, description, source, prvImg, pubDate}) {

    return (
        <>
            <div className="newsItem">
                <div className={(prvImg!==null)?'w-9/12':'w-full'}>
                    
                    <h1 className="newsHeadLine">{headline}</h1>
                    <div className="flex items-center my-2">
                        {(source[0].thumbnail!==undefined)?<img className="w-6 h-6 object-cover rounded-sm" src={source[0].image.thumbnail.contentUrl} alt={source[0].name}/>:null}
                        <span className="text-xs mr-2">{source[0].name}</span>
                        <span className="text-xs">{pubDate.slice(0,10)}</span>
                    </div>
                    <p className={`newsBody ${(prvImg!=='')?'w-9/12':'w-full'}`}>{description}</p>
                </div>
                {(prvImg!==null)?<img className="w-32 h-32 object-cover rounded-lg" src={prvImg} alt={headline}/>:null}
            </div>
            </>
    
    );
}

export default NewsItem;