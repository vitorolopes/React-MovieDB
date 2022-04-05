import React from 'react';
import Movies from './Movies'
import SearchForm from './SearchForm'

const Home = () => {
  return (
    <div>
        <SearchForm/>
        <Movies/>
    </div>
  )
}

export default Home