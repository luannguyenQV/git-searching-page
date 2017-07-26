import React from 'react'

export default ({ user }) => (
  <div className='profile'>
    <div className='avatar'>
      <a href={user.html_url} target='_blank'>
        <img 
          src={user.avatar_url} 
          alt={user.login}
        />
      </a>
    </div>
    <div className='info'>
      <h1><a href={user.html_url} target='_blank'>{user.login}</a> - {user.name}</h1>
      <div className='detail-info'>
        {user.email && <p>{user.email}</p>}
        {user.location && <p>{user.location}</p>}
        {user.bio && <p>{user.bio}</p>}
      </div>
      <div className='detail-info'>
        <p>repos: <span className='badge'>{user.public_repos}</span>
        </p>
        <p>followers: <span className='badge'>{user.followers}</span>
        </p>
        <p>following: <span className='badge'>{user.following}</span>
        </p>
      </div>
    </div>
  </div>
)