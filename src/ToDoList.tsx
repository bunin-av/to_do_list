import React, {ChangeEvent} from "react";
import {FilterTasksType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


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

function ToDoList(props: ToDoListPropsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.todoListID)
    }

    const setClass = (value: string) => `button ${props.filter === value ? 'activeButton' : ''}`
    const changeStatus = (e: ChangeEvent<HTMLInputElement & HTMLUListElement>) => {
        props.tickTask(e.currentTarget.value, e.currentTarget.checked, props.todoListID);
    }

    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListID)


    const taskElements = props.tasks.map(t => {
        const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.todoListID)

        return (
            <li
                key={t.id}
                className={`taskTitle list ${t.isDone ? 'completedTask' : ''}`}
            >
                <input
                    type="checkbox"
                    checked={t.isDone}
                    value={t.id}
                    onChange={changeStatus}
                />
                <EditableSpan
                    title={t.title}
                    changeItemTitle={changeTaskTitle}
                />
                <button
                    onClick={() => props.removeTask(t.id, props.todoListID)}
                    className='deleteButton'
                >x
                </button>
            </li>
        )
    })

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeItemTitle={changeTodoListTitle}/>
                <button onClick={() => props.removeTodoList(props.todoListID)}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                <button
                    onClick={() => props.changeTasksFilter('all', props.todoListID)}
                    className={setClass('all')}>All
                </button>
                <button
                    onClick={() => props.changeTasksFilter('active', props.todoListID)}
                    className={setClass('active')}>Active
                </button>
                <button
                    onClick={() => props.changeTasksFilter('completed', props.todoListID)}
                    className={setClass('completed')}>Completed
                </button>
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