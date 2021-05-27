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


type TodoListType = {
    id: string
    title: string
    filter: FilterTasksType
}

type TasksStateType = {
    [key: string]: TaskType[]
}


function App() {
    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListID_1, title: 'What to learn', filter: 'active'},
        {id: todoListID_2, title: 'What to buy', filter: 'completed'},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListID_1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Cheese', isDone: false},
            {id: v1(), title: 'Potato', isDone: false},
        ],

    })

    const removeTask = (taskId: string, todoListID: string) => {
        tasks[todoListID].filter(t => t.id !== taskId)
        setTasks(tasks)
    }
    const changeTasksFilter = (filter: FilterTasksType, todoListID: string) => {
        const copy = todoLists.map(tl => tl.id === todoListID ? {...tl, filter} : tl)
        setTodoLists(copy)
    }

    const addTask = (taskTitle: string, todoListID: string) => {
        let newTask = {id: v1(), title: taskTitle, isDone: false}
        tasks[todoListID].unshift(newTask)
        setTasks(tasks)
    }
    const tickTask = (taskId: string, isDone: boolean, todoListID: string) => {
        tasks[todoListID].map(t => (t.id === taskId) ? {...t, isDone} : t)
        setTasks(tasks)
    }

    const filterTasks = (todoList: TodoListType) => {
        switch (todoList.filter) {
            case "active":
                return tasks[todoList.id].filter(t => !t.isDone)
            case "completed":
                return tasks[todoList.id].filter(t => t.isDone)
            default:
                return tasks[todoList.id]
        }
    }

    const removeTodoList = (todoListID: string) => {
        const newTodoLists = todoLists.filter(t => t.id !== todoListID)
        setTodoLists(newTodoLists)
    }


    const todoListsComponents = todoLists.map(t => {
        return (
          <ToDoList
            todoListID={t.id}
            key={t.id}
            title={t.title}
            tasks={filterTasks(t)}
            removeTask={removeTask}
            filter={t.filter}
            changeTasksFilter={changeTasksFilter}
            addTask={addTask}
            tickTask={tickTask}
            removeTodoList={removeTodoList}
          />
        )
    })


    return (
      <div className='App'>
          {todoListsComponents}
      </div>
    );
}

export default App;
