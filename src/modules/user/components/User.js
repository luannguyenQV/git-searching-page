import React, { Component } from 'react'
import Header from '../../../common/components/Header'
import SearchBar from '../../../common/components/SearchBar'
import '../styles/user.css'

export default class User extends Component {
  componentDidMount() {
    const { onFetchUser } = this.props
    const name = this.props.match.params.name
    onFetchUser(name)
  }

  render () {
    const { user } = this.props
    return (
      <section>
        <Header />
        <div className='container user-detail'>
          {
            user 
            ? <div className='profile'>
              <div className='avatar'>
                <img src={user.avatar_url} />
              </div>
              <div className='info'>
                <h1>{user.login}</h1>
              </div>
            </div>
            : <div>loading</div>
          }
        </div>
      </section>
    )
  }
}
