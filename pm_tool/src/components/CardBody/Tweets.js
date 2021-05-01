import React,{useState, useEffect} from 'react';
import Tweet from './Tweet'

function Tweets({tweets}) {
    return (
        <div>
            {(JSON.stringify(tweets) !== {})?tweets.map((tweet)=>{
                return(
                    <div key={tweet.id} className='tweet'>
                        <p>{tweet.text}</p>
                    </div>
                )
            }):null}
        </div>
    );
}

export default Tweets;