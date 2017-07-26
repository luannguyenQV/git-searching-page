import React from 'react'

export default ({ user, reposes }) => (
  <div className='reposes'>
    <div className='search-result'>
      <strong>{user.login}</strong> has {user.public_repos} reposes:
    </div>
    {
      reposes && reposes.map((repos, id) => 
        <div className='repos' key={id}>
          <h4>
            <a href={repos.html_url} target='_blank'>{repos.name}</a>
          </h4>
          <div className='repos-info'>
            {repos.description && <p>{repos.description}</p>}
          </div>
        </div>
      )
    }
  </div>
)