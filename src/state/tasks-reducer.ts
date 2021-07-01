import {TaskType} from "../components/App";
import {v1} from "uuid";
import {TasksStateType} from "../components/App_useReducer";
import {TODOLISTS_ACTIONS, todolistsActions} from "./todolists-reducer";

export enum TASKS_ACTIONS {
    DELETE_TASK = 'tasks/DELETE_TASK',
    ADD_TASK = 'tasks/ADD_TASK',
    CHANGE_TASK_STATUS = 'tasks/CHANGE_TASK_STATUS',
    CHANGE_TASK_TITLE = 'tasks/CHANGE_TASK_TITLE'
}


// export type ActionType = ReturnType<typeof deleteTaskAC>
//   | ReturnType<typeof addTaskAC>
//   | ReturnType<typeof changeTaskStatusAC>
//   | ReturnType<typeof changeTaskTitleAC>
//   | ReturnType<typeof addTodoListAC>
//   | ReturnType<typeof deleteTodoListAC>

export type TasksActionType = ReturnType<PropertiesType<typeof tasksActions>>
  | ReturnType<typeof todolistsActions.deleteTodoListAC>
  | ReturnType<typeof todolistsActions.addTodoListAC>

export const tasksReducer = (state: TasksStateType={}, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case TASKS_ACTIONS.ADD_TASK: {
            const tasks: TaskType[] = state[action.payload.todoListID]
            const id = action.payload.todoListID
            const newTask: TaskType = {id: v1(), ...action.payload, isDone: false}
            return {
                ...state,
                [id]: [...tasks, newTask],
            }
        }
        case TASKS_ACTIONS.DELETE_TASK: {
            const tasks: TaskType[] = state[action.payload.todoListID]
            const id = action.payload.todoListID
            return {
                ...state,
                [id]: tasks.filter(t => t.id !== action.payload.id)
            }
        }
        case TASKS_ACTIONS.CHANGE_TASK_TITLE:
        case TASKS_ACTIONS.CHANGE_TASK_STATUS: {
            const tasks: TaskType[] = state[action.payload.todoListID]
            const id = action.payload.todoListID
            return {
                ...state,
                [id]: tasks.map(t => (t.id === action.payload.id)
                  ? {...t, ...action.payload} : t)
            }
        }
        case TODOLISTS_ACTIONS.ADD_TODOLIST: {
            const id = action.payload.id
            return {
                ...state,
                [id]: []
            }
        }
        case TODOLISTS_ACTIONS.DELETE_TODOLIST: {
            const id = action.payload.id
            const copy = {...state}
            delete copy[id]
            return copy
        }
        default:
            return state
    }
}

export const tasksActions={
    deleteTaskAC: (id: string, todoListID: string) => ({
        type: TASKS_ACTIONS.DELETE_TASK,
        payload: {id, todoListID}
    }) as const,
    addTaskAC: (title: string, todoListID: string) => ({
        type: TASKS_ACTIONS.ADD_TASK,
        payload: {title, todoListID}
    }) as const,
    changeTaskStatusAC: (id: string, isDone: boolean, todoListID: string) => ({
        type: TASKS_ACTIONS.CHANGE_TASK_STATUS,
        payload: {id, isDone, todoListID}
    }) as const,
    changeTaskTitleAC: (id: string, title: string, todoListID: string) => ({
        type: TASKS_ACTIONS.CHANGE_TASK_TITLE,
        payload: {id, title, todoListID}
    }) as const,
}


export type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never