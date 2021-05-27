import React, {ChangeEvent, useState} from "react";
import {FilterTasksType, TaskType} from "./App";


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
}

function ToDoList(props: ToDoListPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const addNewTaskText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.target.value)
        setError(false)
    }
    const addNewTaskTextByEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim()) {
            props.addTask(newTaskTitle.trim(), props.todoListID)
            setNewTaskTitle('')
        } else {
            setError(true)
        }
    }
    const setClass = (value: string) => `button ${props.filter === value ? 'activeButton' : ''}`
    const changeStatus = (e: ChangeEvent<HTMLInputElement & HTMLUListElement>) => {
        props.tickTask(e.target.value, e.target.checked, props.todoListID);
    }

    const taskElements = props.tasks.map(t => {
        return (
          <li key={t.id} className='list'>
              <input type="checkbox"
                     checked={t.isDone}
                     value={t.id}
                // changeStatus={(e) => props.tickTask(t.id, e.currentTarget.checked)}
              />
              <span className={`taskTitle ${t.isDone ? 'completedTask' : ''}`}>{t.title}</span>
              <button onClick={() => props.removeTask(t.id, props.todoListID)} className='deleteButton'>x</button>
          </li>
        )
    })

    return (
      <div>
          <h3>
              {props.title}
              <button onClick={() => props.removeTodoList(props.todoListID)}>x</button>
          </h3>

          <div>
              <input onChange={addNewTaskText}
                     value={newTaskTitle}
                     onKeyPress={addNewTaskTextByEnter}
                     className={error ? 'error' : ''}
              />
              <button onClick={addTask} className='addButton'>+</button>
              <div className='errorMessage'>{error ? 'Title required' : ''}</div>
          </div>
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
              <ul onChange={changeStatus}>
                  {taskElements}
              </ul>
          </div>
      </div>
    )
}

export default ToDoList;