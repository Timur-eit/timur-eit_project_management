import './style.scss'
import Modal from 'Components/Modal_custom'
import {ProjectForm} from './ProjectForm'
import {IProject} from '../../ducks/project'
import {useEffect} from 'react'

interface IProps {
    title: string,
    projectList: IProject[],
    fetchProjectList: any,
    addProjectList: any,
    updateProjectList: any,
    removeProjectList: any
}

// interface IProject {
//     id: number,
//     name: string,
//     code: string
// }

// const Projects: React.FC<Props> = (props) => {
const Projects: React.FC<IProps> = ({
                                        title,
                                        projectList,
                                        fetchProjectList,
                                        addProjectList,
                                        updateProjectList,
                                        removeProjectList
                                    }) => {
    // ! hard code for testing
    const testProjectData = {
        // 'id': 21,
        'name': 'NEW22',
        'code': 'NEW',
    }
    // ! hard code for testing

    useEffect(() => {
        fetchProjectList()
    }, [fetchProjectList])

    return (
        <div className='projects-container'>
            <button onClick={() => fetchProjectList()}>Get all projects</button>
            <button onClick={() => addProjectList(testProjectData)}>Add new project</button>
            <button onClick={() => updateProjectList(testProjectData)}>Update Project</button>
            <button onClick={() => removeProjectList(testProjectData)}>Delete Project</button>
            <Modal
                defaultOpen={false}
                children={
                    <ProjectForm
                        title='Новый Проект'
                        handleSubmit={addProjectList}
                    />
                }
            />
            <h1>
                {title}
            </h1>
            <div className='projects-list'>
                {projectList && projectList.map((item: IProject, key): React.ReactElement<'div'> => {

                    return (
                        <div className='project' key={`${key}_${item.id}`}>
                            <div className='project_title'>
                                <span>{item.name}</span>
                                <span>{item.id}</span>
                            </div>
                            <div className='project_code'>
                                <span>{item.code}</span>
                            </div>
                            <div className='project_task-button'>
                                Задачи
                                <div></div>
                            </div>
                            <button>Редактировать</button>
                            <button onClick={() => console.log(item.name, item.id)}>Удалить</button>
                        </div>
                    )

                })}
            </div>
        </div>
    )
}

export default Projects