import React,{useState,useEffect} from 'react';
import Competitor from './Competitor'

function Competitors({competitors}) {
    let [compName, setCompName]= useState();
    useEffect(()=>{
        if(JSON.stringify(competitors)!=='{}'){
            let tempCompName =[];
            competitors.forEach((item,index)=>{
                let vs = 'vs'
                let word = item.query.slice(item.query.indexOf(vs)+vs.length).trim()
                tempCompName.push(word)
            })
            setCompName(tempCompName)
        }
    },[competitors])

    let competitorList = (compName!== undefined)?
    compName.map((item,index)=>{
        return(
            <div key={index}>
                <Competitor compName={item}/>
            </div>
        )
    }):null
    return (
        <div>
            {competitorList}
        </div>
    );
}

export default Competitors;