import React from 'react';
import {Link} from 'react-router-dom'

function CardHeader({cardType}) {
    return (
        <div className='cardHeader'
            style={{
                display:(cardType==='companyInfo'||cardType==='stock')?'none':'flex'
            }}
        >
            {(cardType==='competitors')?<h5>Competitors</h5>:null}
            {(cardType==='userKeywords')?<h5>Related keywords</h5>:null}
            {(cardType==='news')?<h5>News</h5>:null}
            {(cardType==='tweets')?<h5>Tweets</h5>:null}
            <Link className="seeAll">See all</Link>
        </div>
    );
}

export default CardHeader;