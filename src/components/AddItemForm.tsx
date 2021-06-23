import React, {useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddCircleOutline} from "@material-ui/icons";

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
        if (props.addItem) {
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
            <TextField
                label={'Title'}
                onChange={addNewTaskText}
                value={newItemTitle}
                onKeyPress={addNewItemTextByEnter}
                error={error}
                helperText={error && 'Title required'}
            />
            <IconButton onClick={addItem} color={'secondary'} style={{opacity: 0.5}}>
                <AddCircleOutline/>
            </IconButton>
        </div>
    )
}