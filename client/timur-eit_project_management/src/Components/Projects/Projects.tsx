import './style.scss'
import Modal from 'Components/Modal_custom'
import {NewProject, newProjectFormData} from './NewProject'
interface Props {
    [property: string]: any
}

interface IProject {
    id: number,
    name: string,
    code: string
}

const Projects: React.FC<Props> = (props) => {

    const {
        title,
        projectList,
        fetchProjectList,
        addProjectList
    } = props

    // hard code for testing
    const newProject = {
        'name': 'New PROJECT',
        'code': 'FGH'
    }

    console.log(projectList)

    return (
        <div className='projects-container'>
            <button onClick={() => fetchProjectList()}>Get all projects</button>
            <button onClick={() => addProjectList(newProject)}>Add new project</button>
            <Modal
                defaultOpen={false}
                children={
                    <NewProject
                        title='Новый Проект'
                        formData={newProjectFormData}
                    />
                }
            />
            <h1>
                {title}
            </h1>
            <div className='projects-list'>
                {projectList && projectList.map((item: IProject): React.ReactElement<'div'> => {

                    return (
                        <div className='project' key={item.id}>
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
                        </div>
                    )

                })}
            </div>
        </div>
    )
}

export default Projects