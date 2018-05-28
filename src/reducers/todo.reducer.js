import { ADD_TODO, REMOVE_TODO, UNDO_TODO, REDO_TODO } from '../actions/todo.actions';

export const initialState = {
    past : [],
    current : [],
    future : []
}

export default function(state = initialState, action){
    switch (action.type) {    
        case ADD_TODO:
            const current = [...state.current, action.payload]
            return Object.assign({}, {
                past : [...state.past, [...state.current]],
                current : current,
                future : []
            });
        case REMOVE_TODO:
            const indexOfItem = state.current.indexOf(action.payload);
            const currentItems = [...state.current.slice(0, indexOfItem), ...state.current.slice(indexOfItem + 1)];

            return Object.assign({}, { 
                past  : [...state.past, [...state.current]],
                current : currentItems,
                future : []
            })
        case UNDO_TODO:
            const lastItem = [...state.past[state.past.length - 1]];
            const past = state.past.slice(0, state.past.length - 1);
            const future = [[...state.current], ...state.future]
            return Object.assign({},{
                past,
                current : lastItem,
                future
            })
        case REDO_TODO:
            return Object.assign({}, {
                past : [...state.past, [...state.current]],
                current : [...state.future[0]],
                future : state.future.slice(1)
            })
        default:
            return state;
    }
}