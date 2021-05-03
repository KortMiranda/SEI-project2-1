import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom'
function SearchSuggestion({keyword, corpSuggestion, getData}) {
    const [bestMatches, setBestMatches] = useState([])

    useEffect(()=>{
        setBestMatches(corpSuggestion.bestMatches)
    },[corpSuggestion])

    const matchList =(bestMatches!==undefined)?
    bestMatches.map((item, index)=>{
        return(
            <div key={index} className='suggestionItem'>
                <Link to={{
                            pathname: "/result",
                            search: `?keyword=${keyword}&symbol=${item['1. symbol']}`,
                        }}
                        onClick={
                            (e)=>{
                                getData(e);
                            }
                        }
                >
                <div>
                    <span className='companyName'>{item['2. name']}</span>
                    <span className='symbol'>{item['1. symbol']}</span>
                </div>
                <span className='region'>{item['4. region']}</span>
                </Link>
            </div>
        )
    }):null
    return (
        <div className='suggestionBox'>
            {matchList}
        </div>
    );
}

export default SearchSuggestion;