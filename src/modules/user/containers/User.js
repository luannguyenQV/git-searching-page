import { connect } from 'react-redux'
import User from '../components/User'
import {
  gitSearch
} from '../../home/actions'
import {
  requestUser
} from '../actions'

const mapDispatchToProps = dispatch => ({
  onFetchUserOnPage: ({ userName, pageNumber }) => {
    dispatch(requestUser({ userName, pageNumber: pageNumber }))
  },
  onSearch: (searchValue) => {
    dispatch(gitSearch({searchValue, pageNumber: 1}))
  }
})

const mapStateToProps = state => ({
  user: state['user'].user,
  reposes: state['user'].reposes,
  isFetching: state['user'].isFetching,
  didInvalidate: state['user'].didInvalidate
})

export default connect(mapStateToProps, mapDispatchToProps)(User)
