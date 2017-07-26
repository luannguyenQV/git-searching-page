import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/posts.css'

export default ({users, totalCount}) => {
  return (
    <div className='posts'>
      {
        totalCount > 1 && <div className='search-result'>
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
    </div>
  )
}


