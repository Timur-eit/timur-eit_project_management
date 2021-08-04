import {connect} from 'react-redux'
import Projects from './Projects'
import {
    projectListSelector,
    fetchProjectList,
    addProjectList,
    updateProjectList,
    removeProjectList
} from 'ducks/project'

export default connect(state => ({
    projectList: projectListSelector(state),
}), {
    fetchProjectList,
    addProjectList,
    updateProjectList,
    removeProjectList
})(Projects)