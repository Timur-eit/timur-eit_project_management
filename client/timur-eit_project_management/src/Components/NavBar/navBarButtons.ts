export interface INavBarButtons {
    [buttonName: string]: {
        name: string,
        path: string,
    }
}

export const navBarButtons: INavBarButtons = {
    projects: {
        name: 'Проекты',
        path: '/projects'
    },
    tasks: {
        name: 'Задачи',
        path: '/tasks'
    }
}