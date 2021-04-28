import React from 'react';
import Logo from './Logo'
import SearchBar from './SearchBar'
import Menu from './Menu'

function Header(props) {
    return (
        <header className="header">
            <div className="logoAndSearchBar">
                <Logo></Logo>
                <SearchBar></SearchBar>
            </div>
            <Menu></Menu>
        </header>
    )
}

export default Header;