import React, { Component } from 'react'
import '../styles/searchBar.css'

export default class SearchBar extends Component {
  constructor (props) {
    super(props)

    this.state = { 
      searchValue: ''
    }
  }

  _handleKeyPress = (e) => {
    const { onSearch, history } = this.props

    if (e.key === 'Enter') {
      e.preventDefault()
      history.push(`/?q=${this.refs.searchInput.value}`)
      this.refs.searchInput.value && onSearch(this.refs.searchInput.value)
    }
  }

  handleChange = e => {
    this.setState({ searchValue: e.target.value })
  }

  componentWillReceiveProps(nextProps) {
    const { searchValue } = nextProps
    if (searchValue !== this.props.searchValue) {
      this.setState({ searchValue: searchValue })
    }
  }

  render() {
    const { onSearch, history } = this.props

    return (
      <section className='my-search-container'>
        <div className='my-container my-search'>
          <input 
            autoFocus='true'
            className='search-input' 
            ref='searchInput'
            onKeyPress={(e) => this._handleKeyPress(e)}
            value={this.state.searchValue}
            onChange={this.handleChange}
          />
          <input
            className='search-button'
            type='button'
            value='SEARCH'
            onClick={() => {
              this.refs.searchInput.value && onSearch(this.refs.searchInput.value)
              history.push(`/?q=${this.refs.searchInput.value}`)
            }}
          />
        </div>
      </section>
    )
  }
}
