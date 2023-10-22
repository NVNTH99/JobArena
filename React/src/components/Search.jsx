import React from "react";

function Search(){
    return(
        <div className="search-container">
            <SearchBar/>
        </div>
    )
}
function SearchBar(){
    return(
        <div className="search-box">
            <input type="text" placeholder="Search"></input>
            <img src = "/Search_alt.png"></img>
        </div>
    )
}

export default Search