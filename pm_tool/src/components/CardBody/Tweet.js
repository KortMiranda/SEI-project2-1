import React from 'react';
import Flags from 'country-flag-icons/react/3x2'


function Tweet({text}) {
    return (
        <>
            <Flags.US title="United States" className="..."/>
            <p>{text}</p>
        </>
    );
}

export default Tweet;