import {TODO_ADD, TODOS_LOAD, REPLACE_TODO, REMOVE_TODO} from './todo'

const MESSAGE_SHOW = 'MESSAGE_SHOW'
export const showMessage = (message) => ({type: MESSAGE_SHOW, data: message})

export default (state='', action) => {
    switch(action.type){
        case MESSAGE_SHOW:
            return action.data
        case TODO_ADD:
        case TODOS_LOAD:
        case REPLACE_TODO:
        case REMOVE_TODO:
            return ''
        default:
            return state
    }
}
