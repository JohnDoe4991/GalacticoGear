import React from 'react';
import { useHistory } from 'react-router-dom';

const SearchResult = ({ result, clearSearch }) => {
  const { push } = useHistory();

  const goToCurrent = () => {
    push(`/products/${result.id}`);
    clearSearch(); 
  };

  return (
    <div className='search-result' onClick={goToCurrent}>
      {result.title}
    </div>
  );
};

export default SearchResult;
