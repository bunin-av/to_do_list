import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterTasksType = 'all' | 'active' | 'completed'


function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
    ])
    let [filter, setFilter] = useState<FilterTasksType>('all')


    //вне компоненты
    // export const deleteAffair = (affairs: Array<AffairType>, _id: number): Array<AffairType> => {
    //     return affairs.filter(a => a._id !== _id)
    // }
    //внутри компоненты 
    // const deleteAffairCallback = (_id: number) => setAffairs(deleteAffair(affairs, _id))
    const removeTask = (taskId: string) => {
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
        let newTask = {id: v1(), title: taskTitle, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }
    const tickTask = (taskId: string, isDone: boolean) => {
        let newTasks = tasks.map(t => (t.id === taskId) ? {...t, isDone} : t)
        setTasks(newTasks)
    }


    return (
      <div className='App'>
          <ToDoList title={'What to do'}
                    tasks={filterTasks()}
                    removeTask={removeTask}
                    filter={filter}
                    changeTasksFilter={changeTasksFilter}
                    addTask={addTask}
                    tickTask={tickTask}
          />
      </div>
    );
}

export default App;
