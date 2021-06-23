import {FilterTasksType, TodoListType} from "../components/App";
import {v1} from "uuid";

export const DELETE_TODOLIST = 'DELETE_TODOLIST'
export const ADD_TODOLIST = 'ADD_TODOLIST'
const CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER'
const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE'

export type ActionType = ReturnType<typeof deleteTodoListAC>
  | ReturnType<typeof addTodoListAC>
  | ReturnType<typeof changeTodoListFilterAC>
  | ReturnType<typeof changeTodoListTitleAC>

export const todoListsReducer = (state: TodoListType[], action: ActionType): TodoListType[] => {
    switch (action.type) {
        case ADD_TODOLIST:
            const newTodoList: TodoListType = {
                ...action.payload,
                filter: 'all',
            }
            return [...state, newTodoList]
        case DELETE_TODOLIST:
            return state.filter(t => t.id !== action.payload.id)
        case CHANGE_TODOLIST_FILTER:
        case CHANGE_TODOLIST_TITLE:
            return state.map(tl => tl.id === action.payload.id ? {...tl, ...action.payload} : tl)
        default:
            return state
    }
}

export const deleteTodoListAC = (id: string) => ({
    type: DELETE_TODOLIST,
    payload: {id} as TodoListType
}) as const

export const addTodoListAC = (title: string) => ({
    type: ADD_TODOLIST,
    payload: {title, id: v1()} as TodoListType
}) as const

export const changeTodoListFilterAC = (id: string, filter: FilterTasksType) => ({
    type: CHANGE_TODOLIST_FILTER,
    payload: {id, filter} as TodoListType
}) as const

export const changeTodoListTitleAC = (id: string, title: string) => ({
    type: CHANGE_TODOLIST_TITLE,
    payload: {id, title} as TodoListType
}) as const