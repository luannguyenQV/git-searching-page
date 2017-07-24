import React, { Component } from 'react'
import Header from '../../../common/components/Header'
import SearchBar from '../../../common/components/SearchBar'
import Posts from './Posts'
import Picker from './Picker'
import { options } from '../../../common/utils/options'
import '../styles/home.css'

export default class Home extends Component {
  render () {
    const { onSearch, users, isFetching, selectedReddit } = this.props

    return (
      <section>
        <Header />
        <SearchBar onSearch={(value) => onSearch(value)}/>
        {
          isFetching 
          ? <p>Loading....</p>
          : (users && <Posts users={users} />)
        }
      </section>
    )
  }
}
