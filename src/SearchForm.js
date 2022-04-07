import React from 'react';
import {useGlobalContext} from './context'

const SearchForm = () => {

  const {query, setQuery, error} = useGlobalContext();

  return (
    <div>
      
      <form className='search-form' onSubmit={e=>e.preventDefault}>
        <h2>search movies</h2>
        <input className='form-input' type="text"
               value={query}
               onChange={(e)=>setQuery(e.target.value)}
        />
       { error.show && <div className="error">{error.msg}</div>}
      </form>
    </div>
  )
}

export default SearchForm