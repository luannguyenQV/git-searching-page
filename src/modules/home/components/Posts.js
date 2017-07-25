import React from 'react'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import '../styles/posts.css'

export default ({users, totalPage, handlePageClick}) => {
  return (
    <div className='posts'>
      {
        users && users.map((user, i) => 
          <div className='user' key={i}>
            <div className='avatar'>
              <Link to={`/user/${user.login}`}>
                <img src={user.avatar_url} />
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
        users && users.length > 0 && <ReactPaginate previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={<a href="">...</a>}
          breakClassName={"break-me"}
          pageCount={totalPage}
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