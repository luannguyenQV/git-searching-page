import { connect } from 'react-redux'
import Home from '../components/Home'
import {
  gitSearch
} from '../actions'

const mapDispatchToProps = dispatch => ({
  onSearch: (searchValue) => {
    dispatch(gitSearch(searchValue))
  }
})

const mapStateToProps = state => ({
  users: state['home'].users,
  searchValue: state['home'].searchValue,
  isFetching: state['home'].isFetching
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)