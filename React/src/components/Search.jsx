import React from "react";
import axios from 'axios';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';



const Search = React.memo(( props ) => {

    const [searchQuery, setSearchQuery] = useState('');
    // const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
        //   console.log("Here",props.user_id)      
          const response = await axios.get(`${import.meta.env.VITE_ROOT}/jobs`, {
            params: {
              searchQuery: searchQuery,
              user_id: props.user_id
            },
          });

          console.log(response.data)
          props.setData(response.data);
        } catch (error) {
          console.error('Error fetching data', error);
        }
      };

    useEffect(() => {
     fetchData();
  }, [searchQuery,props.recJobs]);

    return(
        <section className="search-container">
                <div>
                    <SearchBar  onSearch ={setSearchQuery}  />
                    {/* <Filter/> */}
                </div>
            <hr></hr>
        </section>
    )
})





function SearchBar ({ onSearch }) {
    const handleSearchChange = (event) => {
        
        onSearch(event.target.value);
    };

    return (
        <div className="search-box">
            <input type="text" placeholder="Search" onChange={handleSearchChange} />
            <img src="/Search_alt.png" alt="search icon" />
        </div>
    );
}



SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};




// Search.jsx

// import React from 'react';

// const Search = ({ onSearch }) => {
//   const handleSearchChange = (event) => {
//     onSearch(event.target.value);
//   };

//   return (
//     <div>
//       <input type="text" placeholder="Search..." onChange={handleSearchChange} />
//     </div>
//   );
// };

// export default Search;

function Filter(){
    return(
        <button className="filter-button">
            <img src = "/Filter.jpg"></img>
        </button>
    )
}

export default Search