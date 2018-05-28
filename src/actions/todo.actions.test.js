import { 
    addTodo, ADD_TODO,
    removeTodo, REMOVE_TODO,
    undoTodo , UNDO_TODO,
    redoTodo, REDO_TODO
} from './todo.actions';

describe('Todo actions', () => {
    it('should create add todo action', () => {
        var item = {
            text : 'Test item',
            id : Date.now()
        }
        expect(addTodo(item)).toEqual({
            type : ADD_TODO,
            payload : item
        })
    })

    it('should create remove todo action', () => {
        var item = {
            text : 'Test item',
            id : Date.now()
        }

        expect(removeTodo(item)).toEqual({
            type : REMOVE_TODO,
            payload : item
        })
    })

    it('should create undo todo action', () => {

        expect(undoTodo()).toEqual({
            type : UNDO_TODO
        })
    })

    it('should create redo todo action', () => {
        expect(redoTodo()).toEqual({
            type : REDO_TODO
        })
    })
})