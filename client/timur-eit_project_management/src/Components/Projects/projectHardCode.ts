interface IProject {    
    id: number,
    name: string,
    code: string    
}

export const projects: IProject[] = [
    {id: 1, name: 'Project', code: 'QAZ'},
    {id: 2, name: 'Project', code: 'WSX'},
    {id: 3, name: 'Project', code: 'EDC'}
]