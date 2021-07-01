import React from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {RootState} from "../state/store";
import {useAppDispatch, useAppSelector} from "../state/hooks";
import {todolistsActions} from "../state/todolists-reducer";
import {shallowEqual} from "react-redux";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterTasksType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string
    title: string
    filter: FilterTasksType
}
export type TasksStateType = {
    [key: string]: TaskType[]
}


function AppRedux() {
    const todoLists = useAppSelector((state: RootState) => state.todolists, shallowEqual) as TodoListType[]
    const tasks = useAppSelector((state: RootState) => state.tasks, shallowEqual) as TasksStateType
    const dispatch = useAppDispatch()

    const addTodoList = (title: string) => {
        dispatch(todolistsActions.addTodoListAC(title))
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


    const todoListsComponents = todoLists.map(t => {
        const props = {
            todoListID: t.id,
            title: t.title,
            tasks: filterTasks(t),
            filter: t.filter
        }

        return (
          <Grid item key={t.id}>
              <Paper elevation={1} style={{padding: '20px'}}>
                  <ToDoList props={props}/>
              </Paper>
          </Grid>
        )
    })


    return (
      <div className='App'>
          <AppBar position={'static'}>
              <Toolbar style={{justifyContent: "space-between"}}>
                  <IconButton color={"inherit"}>
                      <Menu/>
                  </IconButton>
                  <Typography variant={"h6"}>
                      Todolists
                  </Typography>
                  <Button
                    color={"inherit"}
                    variant={"outlined"}
                  >Login</Button>
              </Toolbar>
          </AppBar>
          <Container fixed>
              <Grid container style={{padding: '10px'}}>
                  <AddItemForm addItem={addTodoList}/>
              </Grid>
              <Grid container spacing={5}>
                  {todoListsComponents}
              </Grid>
          </Container>
      </div>
    );
}

export default AppRedux;
