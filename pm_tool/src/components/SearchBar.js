import React from 'react';

function SearchBar(props) {
    return (
        <div className="searchBarContainer">
            <input type="text" name="search" id="searchBar" placeholder='Search here'/>
        </div>
    );
}

export default SearchBar;