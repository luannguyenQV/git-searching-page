import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/posts.css'

export default ({users}) => {
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
            <div className='info'>
              <a>{user.login}</a>
            </div>
          </div>
        )
      }
    </div>
  )
}