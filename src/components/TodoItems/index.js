import React from 'react';
import PropTypes from 'prop-types';

const TodoItems = ({items = [], onRemoveItem = () => {}}) => {
    return (
        <div>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        <span>{item.text}</span>
                        <button className="btn btn-link btn-remove" onClick={() => { onRemoveItem (item)}}>
                        remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

TodoItems.propTypes = {
    items : PropTypes.array,
    onRemoveItem : PropTypes.func
}

export default TodoItems;