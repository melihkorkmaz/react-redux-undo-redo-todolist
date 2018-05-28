import React from 'react';
import PropTypes from 'prop-types';

const UndoRedoButtons = ({onUndoClicked, onRedoClicked, isUndoDisabled = false, isRedoDisabled = false}) => {
    return (
        <div>
            <button className='btn btn-sm btn-undo-redo' onClick={onUndoClicked} disabled={isUndoDisabled}>Undo</button>
            <button className='btn btn-sm btn-undo-redo' onClick={onRedoClicked} disabled={isRedoDisabled}>Redo</button>
        </div>
    )
}

UndoRedoButtons.propTypes = {
    onUndoClicked : PropTypes.func.isRequired,
    onRedoClicked : PropTypes.func.isRequired,
    isUndoDisabled : PropTypes.bool,
    isRedoDisabled : PropTypes.bool
}

export default UndoRedoButtons;