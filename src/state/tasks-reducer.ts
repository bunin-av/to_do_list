import {TaskType} from "../components/App";
import {v1} from "uuid";
import {TasksStateType} from "../components/App_useReducer";
import {ADD_TODOLIST, addTodoListAC, DELETE_TODOLIST, deleteTodoListAC} from "./todolists-reducer";

const DELETE_TASK = 'DELETE_TASK'
const ADD_TASK = 'ADD_TASK'
const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS'
const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE'

export type ActionType = ReturnType<typeof deleteTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof changeTaskStatusAC>
  | ReturnType<typeof changeTaskTitleAC>
  | ReturnType<typeof addTodoListAC>
  | ReturnType<typeof deleteTodoListAC>



export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case ADD_TASK: {
            const tasks: TaskType[] = state[action.payload.todoListID]
            const id = action.payload.todoListID
            const newTask: TaskType = {id: v1(), ...action.payload, isDone: false}
            return {
                ...state,
                [id]: [...tasks, newTask],
            }
        }
        case DELETE_TASK: {
            const tasks: TaskType[] = state[action.payload.todoListID]
            const id = action.payload.todoListID
            return {
                ...state,
                [id]: tasks.filter(t => t.id !== action.payload.id)
            }
        }
        case CHANGE_TASK_TITLE:
        case CHANGE_TASK_STATUS: {
            const tasks: TaskType[] = state[action.payload.todoListID]
            const id = action.payload.todoListID
            return {
                ...state,
                [id]: tasks.map(t => (t.id === action.payload.id)
                  ? {...t, ...action.payload} : t)
            }
        }
        case ADD_TODOLIST: {
            const id = action.payload.id
            return {
                ...state,
                [id]: []
            }
        }
        case DELETE_TODOLIST:{
            const id = action.payload.id
            const copy = {...state}
            delete copy[id]
            return copy
        }
        default:
            return state
    }
}

export const deleteTaskAC = (id: string, todoListID: string) => ({
    type: DELETE_TASK,
    payload: {id, todoListID}
}) as const

export const addTaskAC = (title: string, todoListID: string) => ({
    type: ADD_TASK,
    payload: {title, todoListID}
}) as const

export const changeTaskStatusAC = (id: string, isDone: boolean, todoListID: string) => ({
    type: CHANGE_TASK_STATUS,
    payload: {id, isDone, todoListID}
}) as const

export const changeTaskTitleAC = (id: string, title: string, todoListID: string) => ({
    type: CHANGE_TASK_TITLE,
    payload: {id, title, todoListID}
}) as const