import React from 'react'
import SearchResult from './SearchResult'
import "../SearchBar/SearchBar.css"

const ResultsList = ({results, clearSearch}) => {



  return (
    <div className='results-list'>
{
results.map((result, id) => {
  return <SearchResult result={result} key={id} clearSearch={clearSearch} />;
})


}

    </div>
  )
}

export default ResultsList
