import React, {useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [newItemTitle, setNewItemTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const addNewTaskText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItemTitle(e.target.value)
        setError(false)
    }

    const addItem = () => {
        if(props.addItem){
            if (newItemTitle.trim()) {
                props.addItem(newItemTitle.trim())
                setNewItemTitle('')
            } else {
                setError(true)
            }
        }
    }

    const addNewItemTextByEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && addItem()
    }

    return (
        <div>
            <input onChange={addNewTaskText}
                   value={newItemTitle}
                   onKeyPress={addNewItemTextByEnter}
                   className={error ? 'error' : ''}
                   onBlur={addItem}
            />
                <button onClick={addItem} className='addButton'>+</button>
            <div className='errorMessage'>{error ? 'Title required' : ''}</div>
        </div>
    )
}