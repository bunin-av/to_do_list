import React, {ChangeEvent} from "react";
import {FilterTasksType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Backspace} from "@material-ui/icons";
import {todolistsActions} from "../state/todolists-reducer";
import {useAppDispatch} from "../state/hooks";
import {tasksActions} from "../state/tasks-reducer";


type ToDoListPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterTasksType
    todoListID: string
}

function ToDoList({props}: { props: ToDoListPropsType }) {
    const dispatch = useAppDispatch()

    const removeTodoList = (todoListID: string) => {
        dispatch(todolistsActions.deleteTodoListAC(todoListID))
    }
    const changeTodoListTitle = (title: string) => {
        dispatch(todolistsActions.changeTodoListTitleAC(props.todoListID, title))
    }
    const changeTodoListFilter = (todoListID: string, filter: FilterTasksType) => {
        dispatch(todolistsActions.changeTodoListFilterAC(todoListID, filter))
    }
    const addTask = (taskTitle: string) => {
        dispatch(tasksActions.addTaskAC(taskTitle, props.todoListID))
    }
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(tasksActions
          .changeTaskStatusAC(e.currentTarget.value, e.currentTarget.checked, props.todoListID))
    }
    const removeTask = (taskId: string, todoListID: string) => {
        dispatch(tasksActions.deleteTaskAC(taskId, todoListID))
    }


    const setClass = (value: string) => props.filter === value ? 'contained' : 'outlined'


    const taskElements = props.tasks.map(t => {
        const changeTaskTitle = (title: string) => dispatch(tasksActions.changeTaskTitleAC(t.id, title, props.todoListID))

        return (
          <li key={t.id}>
                <span className={t.isDone ? 'completedTask' : ''}>
                    <Checkbox
                      checked={t.isDone}
                      value={t.id}
                      onChange={changeTaskStatus}
                      size={'small'}
                    />
                    <EditableSpan
                      title={t.title}
                      changeItemTitle={changeTaskTitle}
                    />
                </span>
              <IconButton
                onClick={() => removeTask(t.id, props.todoListID)}
                size={'small'}
              >
                  <Backspace style={{width: "15px"}} color={'primary'}/>
              </IconButton>
          </li>
        )
    })

    return (
      <div>
          <h3>
              <EditableSpan title={props.title} changeItemTitle={changeTodoListTitle}/>
              <IconButton
                onClick={() => removeTodoList(props.todoListID)}
                size={'small'}
              >
                  <Backspace color={'primary'}/>
              </IconButton>
          </h3>
          <AddItemForm addItem={addTask}/>
          <div>
              <Button
                variant={setClass('all')}
                color={'primary'}
                size={'small'}
                onClick={() => changeTodoListFilter(props.todoListID, 'all')}
                style={{margin: "10px 5px"}}
              >All
              </Button>
              <Button
                variant={setClass('active')}
                color={'primary'}
                size={'small'}
                onClick={() => changeTodoListFilter(props.todoListID, 'active')}
                style={{margin: "10px 5px"}}
              >Active
              </Button>
              <Button
                variant={setClass('completed')}
                color={'primary'}
                size={'small'}
                onClick={() => changeTodoListFilter(props.todoListID, 'completed')}
                style={{margin: "10px 5px"}}
              >Completed
              </Button>
          </div>
          <div>
              <ul>
                  {taskElements}
              </ul>
          </div>
      </div>
    )
}

export default ToDoList;