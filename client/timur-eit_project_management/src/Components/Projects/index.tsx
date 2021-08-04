import {connect} from 'react-redux'
import Projects from './Projects'
import {IStore} from '../../ducks/interfaces'

import {
    projectListSelector,
    fetchProjectList,
    addProjectList,
    updateProjectList,
    removeProjectList,
    IReducerRecord
} from 'ducks/project'

export default connect((state: IStore<IReducerRecord>) => ({
    projectList: projectListSelector(state),
}), {
    fetchProjectList,
    addProjectList,
    updateProjectList,
    removeProjectList
})(Projects)