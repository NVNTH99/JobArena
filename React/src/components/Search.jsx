import React from "react";

function Search(){
    return(
        <section className="search-container">
            <div>
                <SearchBar/>
                {/* <Filter/> */}
            </div>
            <hr></hr>
        </section>
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

function Filter(){
    return(
        <button className="filter-button">
            <img src = "/Filter.jpg"></img>
        </button>
    )
}

export default Search