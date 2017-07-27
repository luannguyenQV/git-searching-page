import React, { Component } from 'react'
import ReactPaginate from 'react-paginate'
import Header from '../../../common/components/Header'
import Footer from '../../../common/components/Footer'
import SearchBar from '../../../common/components/SearchBar'
import UserDetail from './UserDetail'
import ListReposes from './ListReposes'
import { getParameterByName } from '../../../common/utils/utils'
import '../styles/user.css'

export default class User extends Component {
  componentDidMount() {
    const { onFetchUserOnPage } = this.props
    const name = this.props.match.params.name
    const page = getParameterByName('page', this.props.location.search)
    onFetchUserOnPage({ userName: name, pageNumber: page })
  }

  handlePageClick(data) {
    const { user, history, onFetchUserOnPage } = this.props
    onFetchUserOnPage({ userName: user.login, pageNumber: ~~data.selected + 1 })
    history.push(`${user.login}?page=${~~data.selected + 1}`)
  }

  render () {
    const { 
      user,
      reposes,
      history,
      searchValue,
      onSearch,
      didInvalidate
    } = this.props
    let totalPage = 0
    if (user) {
      totalPage = Math.ceil(user.public_repos / 30)
    }

    return (
      <section>
        <Header />
        <SearchBar 
          onSearch={(value) => onSearch(value)}
          history={history}
          searchValue={searchValue}
        />
        <div className='my-container my-body user-detail'>
          {
            !didInvalidate ?
              user ? <div>
                  <UserDetail user={user} />
                  <ListReposes 
                    user={user}
                    reposes={reposes} 
                  />
                </div> 
                : <div>Loading...</div>
            : <div>
              <p>Data not found.</p>
            </div>
          }
          { 
            totalPage > 1 && <div className='pagination-container'>
              <ReactPaginate previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={<a href=''>...</a>}
                breakClassName={'break-me'}
                pageCount={totalPage}
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
