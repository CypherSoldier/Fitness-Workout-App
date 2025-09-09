import React, { useState} from 'react';

function SearchBar({ setInputText }) {
    const inputHandler = (e) => {
        const lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    }

    return (
        <div class="topnav">
            <div class="search-container">
                <input type="text" placeholder="Search.." name="search" onChange={inputHandler}/>
                <button type="submit"><i class="fa fa-search"></i></button>
            </div>
        </div>
    );
  }

export default SearchBar;
