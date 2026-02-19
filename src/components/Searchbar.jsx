function SearchBar({ setInputText }) {
    const inputHandler = (e) => {
        const lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    }

    return (
        <div className="topnav">
            <div className="search-container">
                <input type="text" placeholder="Search.." name="search" onChange={inputHandler}/>
                <button type="submit"><i className="fa fa-search"></i></button>
            </div>
        </div>
    );
  }

export default SearchBar;
