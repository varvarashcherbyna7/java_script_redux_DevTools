import './styles.css'
// import { createStore } from "./redux_custom/createStore";
import {rootReducer} from "./redux_custom/rootReducer";
import {applyMiddleware, createStore, compose} from "redux";
import {DECREMENT, INCREMENT} from "./types";
import {asyncIncrement, changeTheme, decrement, increment} from "./redux_custom/action";
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const counter = document.getElementById('counter');
const addBtn = document.getElementById('add');
const subBtn = document.getElementById('sub');
const asyncBtn = document.getElementById('async');
const themeBtn = document.getElementById('theme');

//свой middleware
// function logger(state) {
//     return function (next){
//         return function (action) {
//             console.log('Prev State', state.getState());
//             console.log('Action', action);
//             const newState = next(action)
//             console.log('Prev State', newState);
//             return newState
//         }
//     }
// }

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk, logger),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ))
    ;

//window.store = store

addBtn.addEventListener('click', () => {
    store.dispatch(increment())
})

subBtn.addEventListener('click', () => {
    store.dispatch(decrement())
})

asyncBtn.addEventListener('click', () => {
    store.dispatch(asyncIncrement())
})

themeBtn.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('light')
        ? 'dark'
        : 'light'
    store.dispatch(changeTheme(newTheme))
    // document.body.classList.toggle('dark')
})

store.subscribe(() => {
    const state = store.getState();
    counter.textContent = state.counter.count;
    document.body.className = state.theme.value;

    [addBtn, subBtn, themeBtn, asyncBtn].forEach(btn => {
        btn.disabled = state.theme.disabled
    })
})

//данного типа нет, вернется начаьный стейт (для отображения каунтера)
store.dispatch({type: 'INIT_APPLICATION'})
