import React, { Component } from 'react'
import Header from '../../../common/components/Header'
import UserDetail from './UserDetail'
import ListReposes from './ListReposes'
import '../styles/user.css'

export default class User extends Component {
  componentDidMount() {
    const { onFetchUser } = this.props
    const name = this.props.match.params.name
    onFetchUser(name)
  }

  render () {
    const { 
      user,
      reposes,
      didInvalidate
    } = this.props

    return (
      <section>
        <Header />
        <div className='my-container user-detail'>
          {
            !didInvalidate ?
              user ? <div>
                  <UserDetail user={user} />
                  <ListReposes reposes={reposes} />
                </div> 
                : <div>Loading...</div>
            : <div>
              <p>Data not found.</p>
            </div>
          }
        </div>
      </section>
    )
  }
}
