import React, { Component } from 'react'
import '../styles/header.css'

export default class SearchBar extends Component {
  render() {
    const { onSearch } = this.props

    return (
      <section className='searchBar'>
        <input ref='searchInput' />
        <input
          type='button'
          value='Search'
          onClick={() => this.refs.searchInput.value && onSearch(this.refs.searchInput.value)} 
        />
      </section>
    )
  }
}
