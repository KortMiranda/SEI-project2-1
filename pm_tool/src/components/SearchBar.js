import React from 'react';
import {Link} from 'react-router-dom'
import SearchSuggestion from './SearchSuggestion'

function SearchBar({keyword, getKeyword, submitKeyword, corpSuggestion, getData}) {
    return (
        <div className="searchBarContainer">
            <input type="text" name="search" id="searchBar" placeholder='Search here' value={keyword} onChange={getKeyword} onKeyPress={submitKeyword}/>

            <SearchSuggestion keyword={keyword} corpSuggestion={corpSuggestion} getData={getData}/>
        </div>
    );
}

export default SearchBar;