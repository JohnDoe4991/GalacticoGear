import React from 'react'
import SearchResult from './SearchResult'
import "../SearchBar/SearchBar.css"

const ResultsList = ({results, clearSearch}) => {



  return (
    <div className="results-list">
    {results.length === 0 ? (
      <div className="no-results">
        <p>
          Oops! No results
          <br />
          <br />
          Try broadening your search.
        </p>
      </div>
    ) : (
      results.map((result, id) => (
        <SearchResult result={result} key={id} clearSearch={clearSearch} />
      ))
    )}
  </div>
  )
}

export default ResultsList
