import React from 'react'

export default ({ reposes }) => (
  <div className='reposes'>
    {
      reposes && reposes.map((repos, id) => 
        <div className='repos' key={id}>
          <h4>{repos.name}</h4>
        </div>
      )
    }
  </div>
)