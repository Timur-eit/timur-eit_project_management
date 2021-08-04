import {IProject} from './ducks/project'

interface I {
    readonly id? : number
}

export function deleteItemFromList<A extends I>(list: A[], id: number): A[] {
    return list.filter((f) => f.id !== id)
}

export const modifyListObject = (list: IProject[], object: IProject): IProject[] => {
    return list.map( item => {
        if(item.id === object.id){
            return {...item, ...object}
        }
        return item
    })
}

export const selectItemFromList = (list: IProject[], id: number): IProject | undefined => {
    return list.find(f => f.id === id)
}