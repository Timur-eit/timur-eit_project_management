import {connect} from 'react-redux'
import Tasks from './Tasks'
import {
    // projectListSelector,
    // fetchProjectList,
    // addProjectList,
    // updateProjectList,
    // removeProjectList
} from 'ducks/project'

export default connect(state => ({
    // projectList: projectListSelector(state),
}), {
    // fetchProjectList,
    // addProjectList,
    // updateProjectList,
    // removeProjectList
})(Tasks)