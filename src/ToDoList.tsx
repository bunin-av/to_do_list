import React, {useState} from "react";
import {FilterTasksType, TaskType} from "./App";

type ToDoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    changeTasksFilter: (filter: FilterTasksType) => void
    addTask: (taskTitle: string) => void
    tickTask: (taskId: number) => void
}

function ToDoList(props: ToDoListPropsType) {
    const [newTaskText, setNewTaskText] = useState<string>('')

    const addNewTaskText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTaskText(e.target.value)
    }
    const addTask = () => {
        props.addTask(newTaskText)
        setNewTaskText('')
    }

    const taskElement = props.tasks.map(t => {
        return (
          <li key={t.id}>
              <input type="checkbox"
                     checked={t.isDone}
                     onChange={() => props.tickTask(t.id)}
              />
              <span>{t.title}</span>
              <button onClick={() => props.removeTask(t.id)}>x</button>
          </li>
        )
    })

    return (
      <div>
          <h3>{props.title}</h3>
          <div>
              <input onChange={addNewTaskText} value={newTaskText}/>
              <button onClick={addTask}>+</button>
          </div>
          <div>
              <ul>
                  {taskElement}
              </ul>
          </div>
          <div>
              <button onClick={() => props.changeTasksFilter('all')}>All</button>
              <button onClick={() => props.changeTasksFilter('active')}>Active</button>
              <button onClick={() => props.changeTasksFilter('completed')}>Completed</button>
          </div>
      </div>
    )
}

export default ToDoList;