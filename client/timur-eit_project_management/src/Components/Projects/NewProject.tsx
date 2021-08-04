import React from 'react'

interface IFormData {
    name: string,
    params?: string
}

export const newProjectFormData: IFormData[] = [
    {name: 'Название'},
    {name: 'Ключ'}
]

interface NewProjectProps {
    title: string,
    formData: IFormData[],
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