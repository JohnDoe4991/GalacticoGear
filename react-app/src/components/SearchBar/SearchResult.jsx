import React from 'react'
import "../SearchBar/SearchBar.css"
import { useHistory, useParams } from 'react-router-dom'

const SearchResult = ({result}) => {
    const {push} = useHistory();

    const goToCurrent = () => {
        return push(`/products/${result.id}`);
     };



  return (
    <div className='search-result' onClick={goToCurrent}>
        {result.title}
    </div>
  )
}

export default SearchResult
