import React from 'react'

export default ({ user }) => (
  <div className='profile'>
    <div className='avatar'>
      <img 
        src={user.avatar_url} 
        alt={user.login}
      />
    </div>
    <div className='info'>
      <h1>{`${user.login} - ${user.name}`}</h1>
      <div className='detail-info'>
        {user.email && <p>{user.email}</p>}
        {user.location && <p>{user.location}</p>}
        {user.bio && <p>{user.bio}</p>}
      </div>
      <div className='detail-info'>
        {
          user.public_repos && <p>repos
            <span className='badge'>{user.public_repos}</span>
          </p>
        }
        {
          user.followers && <p>followers
            <span className='badge'>{user.followers}</span>
          </p>
        }
        {
          user.following && <p>following
            <span className='badge'>{user.following}</span>
          </p>
        }
      </div>
    </div>
  </div>
)