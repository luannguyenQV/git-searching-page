import React from 'react'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import '../styles/posts.css'

export default ({users, totalCount, handlePageClick}) => {
  // Because search return only first 1000 result:
  const realTotalPage = Math.ceil(1000 / 30)
  const totalPage = Math.ceil(totalCount / 30)
  return (
    <div className='posts'>
      {
        totalCount > 1 && <div className=''>
          Result: {totalCount}
        </div>
      }
      {
        users && users.map((user, i) => 
          <div className='user' key={i}>
            <div className='avatar'>
              <Link to={`/user/${user.login}`}>
                <img 
                  src={user.avatar_url} 
                  alt={user.login}
                />
              </Link>
            </div>
            <div className='user-info'>
              <Link to={`/user/${user.login}`}>
                {user.login}
              </Link>
            </div>
          </div>
        )
      }
      { 
        totalPage > 1 && <ReactPaginate previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={<a href="">...</a>}
          breakClassName={"break-me"}
          pageCount={realTotalPage}
          marginPagesDisplayed={2}
          pageRangeDisplayed={4}
          onPageChange={(data) => handlePageClick(data)}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"} />
      }
    </div>
  )
}