import {FilterTasksType, TodoListType} from "../components/App";
import {v1} from "uuid";
import {PropertiesType} from "./tasks-reducer";

export enum TODOLISTS_ACTIONS {
    DELETE_TODOLIST = 'todolists/DELETE_TODOLIST',
    ADD_TODOLIST = 'todolists/ADD_TODOLIST',
    CHANGE_TODOLIST_FILTER = 'todolists/CHANGE_TODOLIST_FILTER',
    CHANGE_TODOLIST_TITLE = 'todolists/CHANGE_TODOLIST_TITLE',
}


// export type ActionType = ReturnType<typeof deleteTodoListAC>
//   | ReturnType<typeof addTodoListAC>
//   | ReturnType<typeof changeTodoListFilterAC>
//   | ReturnType<typeof changeTodoListTitleAC>

export type TodolistsActionType = ReturnType<PropertiesType<typeof todolistsActions>>

export const todoListsReducer = (state: TodoListType[] = [], action: TodolistsActionType): TodoListType[] => {
    switch (action.type) {
        case TODOLISTS_ACTIONS.ADD_TODOLIST:
            const newTodoList: TodoListType = {
                ...action.payload,
                filter: 'all',
            }
            return [...state, newTodoList]
        case TODOLISTS_ACTIONS.DELETE_TODOLIST:
            return state.filter(t => t.id !== action.payload.id)
        case TODOLISTS_ACTIONS.CHANGE_TODOLIST_FILTER:
        case TODOLISTS_ACTIONS.CHANGE_TODOLIST_TITLE:
            return state.map(tl => tl.id === action.payload.id ? {...tl, ...action.payload} : tl)
        default:
            return state
    }
}

export const todolistsActions = {
    deleteTodoListAC: (id: string) => ({
        type: TODOLISTS_ACTIONS.DELETE_TODOLIST,
        payload: {id} as TodoListType
    } as const),
    addTodoListAC: (title: string) => ({
        type: TODOLISTS_ACTIONS.ADD_TODOLIST,
        payload: {title, id: v1()} as TodoListType
    } as const),
    changeTodoListFilterAC: (id: string, filter: FilterTasksType) => ({
        type: TODOLISTS_ACTIONS.CHANGE_TODOLIST_FILTER,
        payload: {id, filter} as TodoListType
    } as const),
    changeTodoListTitleAC: (id: string, title: string) => ({
        type: TODOLISTS_ACTIONS.CHANGE_TODOLIST_TITLE,
        payload: {id, title} as TodoListType
    } as const),
}

