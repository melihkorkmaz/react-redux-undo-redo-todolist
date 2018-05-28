export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const UNDO_TODO = 'UNDO_TODO';
export const REDO_TODO = 'REDO_TODO';

export function addTodo(item) {
    return {
        type: ADD_TODO,
        payload: item
    }
}

export function removeTodo(item) {
    return {
        type: REMOVE_TODO,
        payload: item
    }
}

export function undoTodo(){
    return { type : UNDO_TODO }
}

export function redoTodo(){
    return { type : REDO_TODO}
}