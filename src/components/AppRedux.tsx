import React, {useCallback} from 'react';
import './App.css';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {RootState} from "../state/store";
import {useAppDispatch, useAppSelector} from "../state/hooks";
import {todolistsActions} from "../state/todolists-reducer";
import {shallowEqual} from "react-redux";
import {ToDoList} from "./ToDoList";


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


const AppRedux = React.memo(function () {
    console.log('App rendered')

    const todoLists = useAppSelector((state: RootState) => state.todolists, shallowEqual) as TodoListType[]
    const tasks = useAppSelector((state: RootState) => state.tasks, shallowEqual) as TasksStateType
    const dispatch = useAppDispatch()

    const addTodoList = useCallback((title: string) => {
        dispatch(todolistsActions.addTodoListAC(title))
    },[dispatch])

    const todoListsComponents = todoLists.map(t => {
        const props = {
            todoListID: t.id,
            title: t.title,
            tasks: tasks[t.id],
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
})

export default AppRedux;
