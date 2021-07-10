import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Backspace} from "@material-ui/icons";
import React, {ChangeEvent, useCallback} from "react";
import {tasksActions} from "../state/tasks-reducer";
import {useAppDispatch} from "../state/hooks";

type TaskProps = {
    taskId: string
    title: string
    todoListID: string
    isDone: boolean
}

export const Task = React.memo(function (props: TaskProps) {
    console.log("Task rendered")

    const dispatch = useAppDispatch()

    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(tasksActions
            .changeTaskStatusAC(e.currentTarget.value, e.currentTarget.checked, props.todoListID))
    }, [dispatch, props.todoListID])
    const removeTask = useCallback((taskId: string, todoListID: string) => {
        dispatch(tasksActions.deleteTaskAC(taskId, todoListID))
    }, [dispatch])
    const changeTaskTitle = useCallback((title: string) => {
        dispatch(tasksActions.changeTaskTitleAC(props.taskId, title, props.todoListID))
    }, [dispatch, props.taskId, props.todoListID])

    return (
        <li>
            <span className={props.isDone ? 'completedTask' : ''}>
                <Checkbox
                    checked={props.isDone}
                    value={props.taskId}
                    onChange={changeTaskStatus}
                    size={'small'}
                />
                 <EditableSpan
                     title={props.title}
                     changeItemTitle={changeTaskTitle}
                 />
                </span>
            <IconButton
                onClick={() => removeTask(props.taskId, props.todoListID)}
                size={'small'}
            >
                <Backspace style={{width: "15px"}} color={'primary'}/>
            </IconButton>
        </li>
    )
})