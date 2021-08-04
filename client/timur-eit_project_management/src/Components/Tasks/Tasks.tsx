import './style.scss'
import Modal from 'Components/Modal_custom'
import {NewTask} from './NewTask'

interface Props {
    [property: string]: any
}

interface IProject {
    id: number,
    name: string,
    code: string
}

const Tasks: React.FC<Props> = (props) => {

    const {
        title,
        tasksList,
        // fetchProjectList,
        // addProjectList,
        // updateProjectList,
        // removeProjectList
    } = props

    // ! hard code for testing
    const testProjectData = {
        'id': 21,
        // 'name': '',
        // 'code': '',
    }
    // ! hard code for testing

    // console.log(projectList)

    return (
        <div className='tasks-container'>
            {/* <button onClick={() => fetchProjectList()}>Get all projects</button>
            <button onClick={() => addProjectList(testProjectData)}>Add new project</button>
            <button onClick={() => updateProjectList(testProjectData)}>Update Project</button>
            <button onClick={() => removeProjectList(testProjectData)}>Delete Project</button> */}
            <Modal
                defaultOpen={false}
                children={
                    <NewTask
                        title='Новая задача'
                        // formData={newProjectFormData}
                    />
                }
            />
            <h1>
                {title}
            </h1>
            <div className='projects-list'>
                {/* {projectList && projectList.map((item: IProject): React.ReactElement<'div'> => { */}
                {/* {tasksList.map((item: IProject): React.ReactElement<'div'> => {

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
                            <button>Редактировать</button>
                            <button onClick={() => console.log(item.name, item.id)}>Удалить</button>
                        </div>
                    )

                })} */}
            </div>
        </div>
    )
}

export default Tasks