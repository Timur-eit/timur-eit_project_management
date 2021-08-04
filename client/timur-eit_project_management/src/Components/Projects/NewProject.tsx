import React from 'react'

interface IProjectFormData {
    name: string,
    params?: string
}

export const newProjectFormData: IProjectFormData[] = [
    {name: 'Название'},
    {name: 'Ключ'}
]

interface NewProjectProps {
    title: string,
    formData: IProjectFormData[],
}

export const NewProject: React.FC<NewProjectProps> = (props) => {

    const {
        title,
        formData
    } = props


    return (
        <div>
            <h2>{title}</h2>
            <form>
                {formData.map((item: any) => {
                    return (
                        <label key={item.name}>
                            {item.name}
                            <input name={item.name} type="text" required />
                            {/* ? название - до 255 символов ? */}

                        </label>
                    )
                })}
                <button type="submit">Создать</button>
            </form>
        </div>
    )
}