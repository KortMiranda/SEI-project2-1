import React from 'react';
import ArrowLeft from './icon/ArrowLeft'
import ArrowRight from './icon/ArrowRight'

function CardFooter({page,setPage,totalPage}) {
    const navToPrevPage =()=>{
        if(page>1){
            setPage(page-1)
        }
    }
    const navToNextPage =()=>{
        if(page<totalPage){
            setPage(page+1)
        }
    }
    return (
        <div className='flex justify-center items-center cardFooter'>
            
            <button onClick={navToPrevPage}><ArrowLeft/></button>
            <p>{`${page} of ${totalPage}`}</p>
            <button onClick={navToNextPage}><ArrowRight/></button>
            
        </div>
    );
}

export default CardFooter;