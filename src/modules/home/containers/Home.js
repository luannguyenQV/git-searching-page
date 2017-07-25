import { connect } from 'react-redux'
import Home from '../components/Home'
import {
  gitSearch
} from '../actions'

const mapDispatchToProps = dispatch => ({
  onSearch: (searchValue) => {
    dispatch(gitSearch({searchValue, pageNumber: 1}))
  },
  onGotoPage: (searchValue, pageNumber) => {
    dispatch(gitSearch({searchValue, pageNumber}))
  }
})

const mapStateToProps = state => ({
  users: state['home'].users,
  totalCount: state['home'].totalCount,
  searchValue: state['home'].searchValue,
  page: state['home'].page,
  isFetching: state['home'].isFetching
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)