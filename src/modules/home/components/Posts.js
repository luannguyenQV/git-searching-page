import React from 'react'

export default ({users}) => {
  return (
    <ul>
      {
        users && users.map((user, i) => 
          <li key={i}>
            <img src={user.avatar_url} />
          </li>
        )
      }
    </ul>
  )
}