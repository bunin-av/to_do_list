import React, {useCallback} from "react";
import {FilterTasksType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Backspace} from "@material-ui/icons";
import {todolistsActions} from "../state/todolists-reducer";
import {useAppDispatch} from "../state/hooks";
import {tasksActions} from "../state/tasks-reducer";
import {Task} from "./Task";


type ToDoListPropsType = {
    title: string
    tasks: TaskType[]
    filter: FilterTasksType
    todoListID: string
}

export const ToDoList = React.memo(function ({props}: { props: ToDoListPropsType }) {
    console.log('Todolist rendered')

    const dispatch = useAppDispatch()
    let tasks = [...props.tasks]

    if (props.filter === "active") {
        tasks = tasks.filter(t => !t.isDone)
    }
    if (props.filter === "completed") {
        tasks = tasks.filter(t => t.isDone)
    }

    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(todolistsActions.deleteTodoListAC(todoListID))
    }, [dispatch])
    const changeTodoListTitle = useCallback((title: string) => {
        dispatch(todolistsActions.changeTodoListTitleAC(props.todoListID, title))
    }, [dispatch, props.todoListID])
    const changeTodoListFilter = useCallback((todoListID: string, filter: FilterTasksType) => {
        dispatch(todolistsActions.changeTodoListFilterAC(todoListID, filter))
    }, [dispatch])
    const addTask = useCallback((taskTitle: string) => {
        dispatch(tasksActions.addTaskAC(taskTitle, props.todoListID))
    }, [dispatch, props.todoListID])

    const onAllClickHandler = useCallback(() => changeTodoListFilter(props.todoListID, 'all'),[changeTodoListFilter,props.todoListID])
    const onCompletedClickHandler = useCallback(() => changeTodoListFilter(props.todoListID, 'completed'),[changeTodoListFilter,props.todoListID])
    const onActiveClickHandler = useCallback(() => changeTodoListFilter(props.todoListID, 'active'),[changeTodoListFilter,props.todoListID])

    const setClass = (value: string) => props.filter === value ? 'contained' : 'outlined'

    const taskElements = tasks.map(t =>
        <Task taskId={t.id} todoListID={props.todoListID} title={t.title} isDone={t.isDone} key={t.id}/>)

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeItemTitle={changeTodoListTitle}/>
                <IconButton
                    onClick={() => removeTodoList(props.todoListID)}
                    size={'small'}
                >
                    <Backspace color={'primary'}/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                <Button
                    variant={setClass('all')}
                    color={'primary'}
                    size={'small'}
                    onClick={onAllClickHandler}
                    style={{margin: "10px 5px"}}
                >All
                </Button>
                <Button
                    variant={setClass('active')}
                    color={'primary'}
                    size={'small'}
                    onClick={onActiveClickHandler}
                    style={{margin: "10px 5px"}}
                >Active
                </Button>
                <Button
                    variant={setClass('completed')}
                    color={'primary'}
                    size={'small'}
                    onClick={onCompletedClickHandler}
                    style={{margin: "10px 5px"}}
                >Completed
                </Button>
            </div>
            <ul>
                {taskElements}
            </ul>
        </div>
    )
})
