import React, {useState} from "react";

type EditableSpanPropsType = {
    title: string
    changeItemTitle: (taskTitle: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.title)

    const onEditMode = () => setEditMode(true)

    const offEditMode = () => {
        if (title.trim()) {
            setEditMode(false)
            setTitle(title.trim())
            props.changeItemTitle(title.trim())
        } else {
            setEditMode(false)
            setTitle(props.title)
        }
    }

    const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && offEditMode()
    }

    const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (
        editMode
            ? <input value={title}
                     onBlur={offEditMode}
                     autoFocus
                     onChange={changeTitle}
                     onKeyPress={onEnterPress}
            />

            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}