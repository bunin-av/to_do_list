import React, {useCallback, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddCircleOutline} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo(function (props: AddItemFormPropsType) {
    console.log('AddItemForm rendered')

    const [newItemTitle, setNewItemTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const addNewTaskText = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItemTitle(e.target.value)
        setError(false)
    }, [])

    const addItem = useCallback(() => {
        if (props.addItem) {
            if (newItemTitle.trim()) {
                props.addItem(newItemTitle.trim())
                setNewItemTitle('')
            } else {
                setError(true)
            }
        }
    }, [props, newItemTitle])

    const addNewItemTextByEnter = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && addItem()
    }, [addItem])

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
})