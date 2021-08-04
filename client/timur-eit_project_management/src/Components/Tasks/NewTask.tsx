import React from 'react'

interface IFormTaskData {
    [name: string]: {
        inputName: string,
        type: string,
        options?: Array<string>,
        rows?: number,
    }    
}

export const newTaskFormData: IFormTaskData = {
    name: {
        inputName: 'Название', type: 'input'
    },
    status: {
        inputName: 'Статус', type: 'select', options: ['', '', '']
    },
    type: {
        inputName: 'Тип задачи', type: 'select', options: ['', '', '']
    },
    description: {
        inputName: 'Описание',type: 'textarea', rows: 4
    }    
}    


interface NewTaskProps {
    title: string,
    // formData: IFormTaskData[],
}

export const NewTask: React.FC<NewTaskProps> = (props) => {

    const {
        title,
        // formData
    } = props


    return (
        <div>
            <h2>{title}</h2>
            <form>
                <label>
                    {newTaskFormData.name}
                    <input name={newTaskFormData.name.inputName} type="text" required />
                    {/* ? название - до 255 символов ? */}
                </label>

                <label>
                    {newTaskFormData.status}
                    <select name={newTaskFormData.status.inputName} required>
                        {/* {newTaskFormData.status.options.map(option => <option>{option}</option>)} */}
                    </select>
                    {/* ? название - до 255 символов ? */}
                </label>
                
                <button type="submit">Создать</button>
            </form>
        </div>
    )
}