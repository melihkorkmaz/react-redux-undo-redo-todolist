import React from 'react';
import PropTypes from 'prop-types';


class TodoForm extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            todoText: ""
        }
    }

    onTextChange(e) {
        this.setState({
            todoText: e.target.value
        })
    }

    onAddClicked(e) {
        e.preventDefault();
        this.props.onAdd({
            text: this.state.todoText,
            id: Date.now()
        });
        this.setState({ todoText: '' })
    }

    render() {
        return (
            <div >
                <form className="input-group mb-3" onSubmit={this.onAddClicked.bind(this)}>
                    <input type="text" className="form-control" placeholder="Write your task..." value={this.state.todoText} onChange={this.onTextChange.bind(this)} />
                    <div className="input-group-append">
                        <button type="submit" className="btn btn-primary">Add Todo</button>
                    </div>
                </form>
            </div>
        )
    }
}


TodoForm.propTypes = {
    onAdd: PropTypes.func.isRequired
}

export default TodoForm;