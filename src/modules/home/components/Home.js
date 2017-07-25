import React, { Component } from 'react'
import Header from '../../../common/components/Header'
import SearchBar from '../../../common/components/SearchBar'
import Posts from './Posts'
import { getParameterByName } from '../../../common/utils/utils'
import '../styles/home.css'

export default class Home extends Component {
  componentDidMount() {
    const { onGotoPage, isFetching } = this.props
    const searchTerm = getParameterByName('q', this.props.location.search)
    const page = getParameterByName('page', this.props.location.search)
    if (searchTerm && !isFetching) {
      if (page) {
        onGotoPage(searchTerm, page)
      }
      else {
        onGotoPage(searchTerm, 1)
      }
    }
  }

  handlePageClick(data) {
    const { history, searchValue, onGotoPage } = this.props
    onGotoPage(searchValue, ~~data.selected + 1)
    history.push(`?q=${searchValue}&page=${~~data.selected + 1}`)
  }

  render () {
    const { totalCount, onSearch, users, isFetching, searchValue, history } = this.props

    return (
      <section>
        <Header />
        <SearchBar 
          onSearch={(value) => onSearch(value)}
          history={history}
          searchValue={searchValue}
        />
        <div className='my-container'>
          {
            isFetching 
            ? <p>Loading....</p>
            : (users && <Posts 
              users={users} 
              handlePageClick={(data) => this.handlePageClick(data)}
              totalCount={totalCount}
            />)
          }
        </div>
      </section>
    )
  }
}
