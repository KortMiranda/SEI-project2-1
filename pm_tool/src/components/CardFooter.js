import React from 'react';

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
            <button onClick={navToPrevPage}>Left</button><p>{`${page} of ${totalPage}`}</p><button onClick={navToNextPage}>Right</button>
        </div>
    );
}

export default CardFooter;