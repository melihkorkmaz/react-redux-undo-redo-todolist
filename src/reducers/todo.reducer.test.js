import {  addTodo, removeTodo, undoTodo, redoTodo } from '../actions/todo.actions';
import reducer, { initialState } from './todo.reducer';

describe('Todo reducer', () => {
    it('should retur default state if there is no action', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    })

    it('should add todo item to state', () => {
        const item = { id : Date.now(), text : 'Test TODO item.'};
        const action = addTodo(item);
        const newState = reducer(undefined, action);
        
        //Expection immutal result
        expect(newState).not.toEqual(initialState);
        expect(newState.current.length).toEqual(1);
        expect(newState.current[0]).toEqual(item);
        
        expect(newState.past.length).toEqual(1);
        expect(newState.past[0]).toEqual([]);

        expect(newState.future.length).toEqual(0);
    })

    it('should remove todo item from state', () => {
        const item = { id : Date.now(), text : 'Test TODO item.'};
        const customInitialState = { 
            past : [[]],
            current : [item],
            future : [[]]
        };
        const action = removeTodo(item);
        const newState = reducer(customInitialState, action);

        expect(newState).not.toEqual(customInitialState);
        expect(newState.current.length).toEqual(0);

        expect(newState.past.length).toEqual(2);
        expect(newState.future.length).toEqual(0);
    })

    it('should go back when undo dispatch', () => {
        const prevItem = { text : 'Todo 1', id : Date.now() };
        const currentItem = { text : 'Todo 2', id : Date.now() };
        const customInitialState = {
            past : [[], [prevItem]],
            current : [prevItem, currentItem],
            future : []
        }

        const newState = reducer(customInitialState, undoTodo());

        expect(newState).not.toEqual(customInitialState);
        expect(newState).toEqual({
            past : [[]],
            current : [prevItem],
            future : [[prevItem, currentItem]]
        })
        
        const lastState = reducer(newState, undoTodo());
        expect(lastState).not.toEqual(newState);
        expect(lastState).toEqual({
            past : [],
            current : [],
            future : [[prevItem], [prevItem, currentItem]]
        });
    })

    it('should go forward when redo dispatch', () => {
        const item1 = { text : 'Todo 1', id : Date.now() };
        const item2 = { text : 'Todo 2', id : Date.now() };
        const item3 = { text : 'Todo 3', id : Date.now() };
        const item4 = { text : 'Todo 4', id : Date.now() };

        const customInitialState = {
            past : [[], [item1] ],
            current : [item1, item2],
            future : [[item1, item2, item3], [item1, item2, item3, item4]]
        }

        const newState = reducer(customInitialState, redoTodo());

        expect(newState).not.toEqual(customInitialState);
        expect(newState).toEqual({
            past : [[], [item1], [item1, item2]],
            current : [item1, item2, item3],
            future : [[item1, item2, item3, item4]] 
        });

        const lastState = reducer(newState, redoTodo());
        expect(lastState).not.toEqual(newState);
        expect(lastState).toEqual({
            past : [[], [item1], [item1, item2], [item1, item2, item3]],
            current : [item1, item2, item3, item4],
            future : [] 
        });
    })
})