interface ITask {
    readonly id?: number,
    name?: string,
    description: string,
    status: string,
    type: string,
    project_id: number,
}

export const projects: ITask[] = [
    {
        id: 1,
        name: 'Task Name 1',
        description: 'description text',
        status: 'status text',
        type: 'type text',        
        project_id: 111,
    },
    {
        id: 2,
        name: 'Task Name 2',
        description: 'description text',
        status: 'status text',
        type: 'type text',        
        project_id: 222,
    }
    
]