import React, { Component } from 'react'
import ReactPaginate from 'react-paginate'
import Header from '../../../common/components/Header'
import Footer from '../../../common/components/Footer'
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
    const totalPage = Math.ceil(totalCount / 30)
    // Because search return only first 1000 result:
    let realTotalPage = 33
    if (totalCount < 1000) {
      realTotalPage = Math.ceil(totalCount / 30)
    }

    return (
      <section>
        <Header />
        <SearchBar 
          onSearch={(value) => onSearch(value)}
          history={history}
          searchValue={searchValue}
        />
        <div className='my-container my-body'>
          {
            isFetching 
            ? <div className='loading'>Loading....</div>
            : (users && <Posts 
              totalCount={totalCount}
              users={users} 
              handlePageClick={(data) => this.handlePageClick(data)}
            />)
          }
          { 
            totalPage > 1 && <div className='pagination-container'>
              <ReactPaginate previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={<a href=''>...</a>}
                breakClassName={'break-me'}
                pageCount={realTotalPage}
                marginPagesDisplayed={2}
                pageRangeDisplayed={4}
                onPageChange={(data) => this.handlePageClick(data)}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'} />
            </div>
          }
        </div>
        <Footer />
      </section>
    )
  }
}
