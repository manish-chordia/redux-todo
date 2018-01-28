import {getTodos, createTodo, updateTodo, removeTodo} from '../lib/todoServices'
import {showMessage} from './messages'

const initState = {
    todos: [],
    currentTodo: ''
};

const CURRENT_UPDATE = 'CURRENT_UPDATE';
export const TODO_ADD = 'TODO_ADD';
export const TODOS_LOAD = 'TODOS_LOAD'
export const REPLACE_TODO = 'REPLACE_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'

export const addTodo = (todo) => ({type: TODO_ADD, data: todo})
export const updateCurrent = (value) => ({type: CURRENT_UPDATE, data: value})
const loadTodos = (todos) => ({type: TODOS_LOAD, data: todos})
const replaceTodo = (todo) => ({type: REPLACE_TODO, data: todo})
const discardTodo = (id) => ({type: REMOVE_TODO, data: id})

export const saveTodo = (name) => {
    return (dispatch) => {
        dispatch(showMessage('Saving Todo'))
        createTodo(name)
            .then(todo => dispatch(addTodo(todo)))
    }
}

export const fetchTodos = () => {
    return (dispatch) => {
        dispatch(showMessage('Loading Todos'))
        getTodos()
            .then(todos => dispatch(loadTodos(todos)))
    }
}

export const toggleTodo = (id) => {
    return (dispatch, getState) => {
        dispatch(showMessage('Updating Todo'))
        const todo = getState().todo.todos.filter(todo => (todo.id === id))[0]
        const toggledTodo = {...todo, isComplete: !todo.isComplete}
        updateTodo(toggledTodo)
            .then(res => dispatch(replaceTodo(res)))
    }
}

export const deleteTodo = (id) => {
    return (dispatch) => {
        dispatch(showMessage('Deleting Todo'))
        removeTodo(id)
            .then(dispatch(discardTodo(id)))
    }
}

export const getVisibleTodos = (todos, filter) => {
    switch(filter) {
        case 'active':
            return todos.filter(todo => !todo.isComplete)
        case 'completed':
            return todos.filter(todo => todo.isComplete)
        default:
            return todos;
    }
}

export default (state=initState, action) => {
    switch(action.type){
        case TODO_ADD:
            return {...state, currentTodo: '', todos: state.todos.concat(action.data)};
        case TODOS_LOAD:
            return {...state, todos: action.data}
        case CURRENT_UPDATE:
            return {...state, currentTodo: action.data}
        case REPLACE_TODO:
            return {...state, todos: state.todos.map(todo => {
                return todo.id === action.data.id ? action.data : todo
            })}
        case REMOVE_TODO:
            return {...state,
                todos: state.todos.filter(todo => todo.id !== action.data)
            }
        default:
            return state;
    }
};
