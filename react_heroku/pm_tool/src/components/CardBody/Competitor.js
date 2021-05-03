import React from 'react';

function Competitor({compName}) {
    return (
        <>
            <button className="competitorKeywords" >{compName}</button>
        </>
    );
}

export default Competitor;