import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

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
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to buy', filter: 'all'},
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

        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskId)
        setTasks({...tasks})
    }

    const changeTodoListFilter = (filter: FilterTasksType, todoListID: string) => {
        const copy = todoLists.map(tl => tl.id === todoListID ? {...tl, filter} : tl)
        setTodoLists(copy)
    }
    const changeTodoListTitle = (title: string, todoListID: string) => {
        const copy = todoLists.map(tl => tl.id === todoListID ? {...tl, title} : tl)
        setTodoLists(copy)
    }

    const addTask = (taskTitle: string, todoListID: string) => {
        let newTask = {id: v1(), title: taskTitle, isDone: false}
        tasks[todoListID].unshift(newTask)
        setTasks({...tasks})
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todoListID: string) => {
        const copy = {...tasks}
        copy[todoListID] = copy[todoListID].map(t => (t.id === taskId) ? {...t, isDone} : t)
        setTasks({...copy})
    }

    const changeTaskTitle = (taskId: string, title: string, todoListID: string) => {
        const copy = {...tasks}
        copy[todoListID] = copy[todoListID].map(t => (t.id === taskId) ? {...t, title} : t)
        setTasks({...copy})
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

    const addTodoList = (title: string) => {
        const todoListID = v1()
        const newTodoList: TodoListType = {
            id: todoListID,
            title,
            filter: 'all',
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [todoListID]: []})
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
                changeTasksFilter={changeTodoListFilter}
                addTask={addTask}
                tickTask={changeTaskStatus}
                removeTodoList={removeTodoList}
                addTodoList={addTodoList}
                changeTaskTitle={changeTaskTitle}
                changeTodoListTitle={changeTodoListTitle}
            />
        )
    })


    return (
        <div className='App'>
            <AddItemForm addItem={addTodoList}/>
            {todoListsComponents}
        </div>
    );
}

export default App;
