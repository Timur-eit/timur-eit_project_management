import React, { useMemo } from 'react'
import {projects} from './projectHardCode'
import './style.scss'

interface Props {
    [property: string]: any
}

const Projects: React.FC<Props> = (props) => {

    const {
        title,
        projectList,        
        fetchProjectList,
        addProjectList
    } = props


    const newProject = {
        'name': 'New PROJECT',
        'code': 'ZAQ'
    }

    console.log(projectList)

    const projectsData = useMemo(() => projects, [])
    const projectsIds: Array<string> = useMemo(() => Object.keys(projectsData), [projectsData])

    return (
        <div className='projects-container'>
            <button onClick={() => fetchProjectList()}>Get all projects</button>
            <button onClick={() => addProjectList(newProject)}>Add new project</button>
            <h1>
                {title}
            </h1>
            <div className='projects-list'>
                {projectsIds.map((item): React.ReactElement<'div'> => {
                    const projectId: string = item
                    const projectName: string = projectsData[item].name
                    const projectCode: string = projectsData[item].code


                    return (
                        <div className='project' key={projectId}>
                            <div className='project_title'>
                                <span>{projectName}</span>
                                <span>{projectId}</span>
                            </div>
                            <div className='project_code'>
                                <span>{projectCode}</span>
                            </div>
                            <div className='project_task-button'>
                                Задачи
                                <div></div>
                            </div>
                        </div>
                    )

                })}
            </div>




            <div className='projects'>

            </div>
        </div>
    )
}

export default Projects