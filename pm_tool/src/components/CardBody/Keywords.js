import React,{useState,useEffect} from 'react';
import Keyword from './Keyword'

function Keywords({relatedKeywords}) {
    let [keywords,setKeywords] = useState([])

    useEffect(()=>{
        if(relatedKeywords!==undefined){
            setKeywords(relatedKeywords.value)
        }
    },[relatedKeywords])

    let keywordList = (keywords.length>1)?keywords.map((item,index)=>{
        return(
            <div key={index}>
                <Keyword keyword={item.displayText}/>
            </div>
        )
    }):null

    return (
        <div>
            {keywordList}
        </div>
    );
}

export default Keywords;