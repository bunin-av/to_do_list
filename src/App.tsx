import React from 'react';
import './App.css';
import ToDoList from "./ToDoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {
    const tasksToLearn: Array<TaskType> = [
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'React', isDone: false},
    ]
    const tasksToBuy: Array<TaskType> = [
        {id: 1, title: 'Milk', isDone: true},
        {id: 2, title: 'Meat', isDone: true},
        {id: 3, title: 'Bread', isDone: false},
    ]
    return (
      <div className="App">
          <ToDoList title={"What to do"} tasks={tasksToLearn}/>
          <ToDoList title={"What to buy"} tasks={tasksToBuy}/>
      </div>
    );
}

export default App;
