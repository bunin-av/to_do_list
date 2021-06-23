import React, {ChangeEvent} from "react";
import {FilterTasksType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Backspace} from "@material-ui/icons";


type ToDoListPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterTasksType
    todoListID: string
    removeTask: (taskId: string, todoListID: string) => void
    changeTasksFilter: (filter: FilterTasksType, todoListID: string) => void
    addTask: (taskTitle: string, todoListID: string) => void
    tickTask: (taskId: string, tickTask: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    addTodoList: (title: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

function ToDoList({props}: { props: ToDoListPropsType }) {

    const addTask = (title: string) => {
        props.addTask(title, props.todoListID)
    }


    const setClass = (value: string) => props.filter === value ? 'contained' : 'outlined'
    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.tickTask(e.currentTarget.value, e.currentTarget.checked, props.todoListID);
    }

    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListID)


    const taskElements = props.tasks.map(t => {
        const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.todoListID)

        return (
            <li key={t.id}>
                <span className={t.isDone ? 'completedTask' : ''}>
                    <Checkbox
                        checked={t.isDone}
                        value={t.id}
                        onChange={changeStatus}
                        size={'small'}
                    />
                    <EditableSpan
                        title={t.title}
                        changeItemTitle={changeTaskTitle}
                    />
                </span>
                <IconButton
                    onClick={() => props.removeTask(t.id, props.todoListID)}
                    size={'small'}
                >
                    <Backspace style={{width: "15px"}} color={'primary'}/>
                </IconButton>
            </li>
        )
    })

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeItemTitle={changeTodoListTitle}/>
                <IconButton
                    onClick={() => props.removeTodoList(props.todoListID)}
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
                    onClick={() => props.changeTasksFilter('all', props.todoListID)}
                    style={{margin: "10px 5px"}}
                >All
                </Button>
                <Button
                    variant={setClass('active')}
                    color={'primary'}
                    size={'small'}
                    onClick={() => props.changeTasksFilter('active', props.todoListID)}
                    style={{margin: "10px 5px"}}
                >Active
                </Button>
                <Button
                    variant={setClass('completed')}
                    color={'primary'}
                    size={'small'}
                    onClick={() => props.changeTasksFilter('completed', props.todoListID)}
                    style={{margin: "10px 5px"}}
                >Completed
                </Button>
            </div>
            <div>
                <ul>
                    {taskElements}
                </ul>
            </div>
        </div>
    )
}

export default ToDoList;