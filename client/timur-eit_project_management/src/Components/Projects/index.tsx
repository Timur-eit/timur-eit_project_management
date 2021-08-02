import {connect} from 'react-redux'
import Projects from './Projects'
import {
    projectListSelector,
    fetchProjectList
} from 'ducks/project'

export default connect(state => ({
    projectList: projectListSelector(state),
}), {
    fetchProjectList
})(Projects)