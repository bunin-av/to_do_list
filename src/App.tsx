import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterTasksType = 'all' | 'active' | 'completed'


function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
    ])
    let [filter, setFilter] = useState<FilterTasksType>('all')

    const removeTask = (taskId: number) => {
        let filteredTasks = tasks.filter(t => t.id !== taskId)
        setTasks(filteredTasks)
    }
    const changeTasksFilter = (filter: FilterTasksType) => setFilter(filter)
    const filterTasks = () => {
        switch (filter) {
            case "active":
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }

    const addTask = (taskTitle: string) => {
        let newTask = {id: Math.random() * 100, title: taskTitle, isDone: false}
        let newTasks = [...tasks, newTask]
        setTasks(newTasks)
    }
    const tickTask = (taskId: number) => {
        let newTasks = tasks.map(t => {
            if (t.id === taskId) t.isDone = !t.isDone
            return t
        })
        setTasks(newTasks)
    }


    return (
      <div className='App'>
          <ToDoList title={'What to do'}
                    tasks={filterTasks()}
                    removeTask={removeTask}
                    changeTasksFilter={changeTasksFilter}
                    addTask={addTask}
                    tickTask={tickTask}

          />
      </div>
    );
}

export default App;
