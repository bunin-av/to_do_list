import React, {useState} from "react";
import {FilterTasksType, TaskType} from "./App";


type ToDoListPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterTasksType
    removeTask: (taskId: string) => void
    changeTasksFilter: (filter: FilterTasksType) => void
    addTask: (taskTitle: string) => void
    tickTask: (taskId: string, tickTask: boolean) => void
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
            props.addTask(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError(true)
        }
        //
        // const newTask = newTaskTitle.trim()
        // if (!newTask) return
        // props.addTask(newTask)
        // setNewTaskTitle('')
    }
    const setClass = (value: string) => props.filter === value ? 'activeButton' : ''


    const taskElement = props.tasks.map(t => {
        return (
          <li key={t.id}>
              <input type="checkbox"
                     checked={t.isDone}
                     onChange={(e) => props.tickTask(t.id, e.currentTarget.checked)}
              />
              <span className={t.isDone ? 'completedTask' : ''}>{t.title}</span>
              <button onClick={() => props.removeTask(t.id)}>x</button>
          </li>
        )
    })

    return (
      <div>
          <h3>{props.title}</h3>
          <div>
              <input onChange={addNewTaskText}
                     value={newTaskTitle}
                     onKeyPress={addNewTaskTextByEnter}
                     className={error ? 'error' : ''}
              />
              <button onClick={addTask}>+</button>
              <div className='errorMessage'>{error ? 'Title required' : ''}</div>
          </div>
          <div>
              <ul>
                  {taskElement}
              </ul>
          </div>
          <div>
              <button onClick={() => props.changeTasksFilter('all')} className={setClass('all')}>All</button>
              <button onClick={() => props.changeTasksFilter('active')} className={setClass('active')}>Active</button>
              <button onClick={() => props.changeTasksFilter('completed')} className={setClass('completed')}>Completed</button>
          </div>
      </div>
    )
}

export default ToDoList;