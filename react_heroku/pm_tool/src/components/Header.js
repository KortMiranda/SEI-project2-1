import React from 'react';
import Logo from './Logo'
import SearchBar from './SearchBar'
import Menu from './Menu'

function Header({keyword, getKeyword, submitKeyword, corpSuggestion, getData}) {
    return (
        <header className="header">
            <div className="logoAndSearchBar">
                {/* <Logo></Logo> */}
                <SearchBar keyword={keyword} getKeyword={getKeyword} submitKeyword={submitKeyword} corpSuggestion={corpSuggestion} getData={getData}></SearchBar>
            </div>
            <Menu></Menu>
        </header>
    )
}

export default Header;