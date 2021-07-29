export interface INavBarButtons {
    [buttonName: string]: {
        name: string,
        path: string,
    }
}

export const navBarButtons: INavBarButtons = {
    projects: {
        name: 'Проекты',
        path: '/'
    },
    tasks: {
        name: 'Задачи',
        path: '/tasks'
    }
}