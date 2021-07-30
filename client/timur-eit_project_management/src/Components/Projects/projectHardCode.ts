interface IProjects {
    [projectId: string]: {
        name: string,
        code: string
    }    
}

export const projects: IProjects = {
    1: {
        name: 'Project',
        code: 'QAZ',
    },
    2: {
        name: 'Project',
        code: 'WSX',
    },
    3: {
        name: 'Project',
        code: 'EDC',
    }
}