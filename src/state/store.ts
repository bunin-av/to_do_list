import {combineReducers, createStore} from "@reduxjs/toolkit";
import {tasksReducer} from "./tasks-reducer";
import {todoListsReducer} from "./todolists-reducer";

const reducers = combineReducers({
    tasks: tasksReducer,
    todolists: todoListsReducer,
})
export const store = createStore(reducers)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

//@ts-ignore
window.store = store