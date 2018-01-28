import React, {Component} from 'react';
import {connect} from 'react-redux'
import {updateCurrent, saveTodo} from '../reducers/todo'

class TodoForm extends Component {
    handleChange = (e) => {
        const value = e.target.value;
        this.props.updateCurrent(value);
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.saveTodo(this.props.currentTodo)
    }

    render() {
        const {currentTodo} = this.props;

        return (
            <form onSubmit={this.handleSubmit}>
              <input type="text" value={currentTodo} onChange={this.handleChange}/>
            </form>
        );
    }
}

export default connect(
    (state) => ({currentTodo: state.todo.currentTodo}),
    {updateCurrent, saveTodo}
)(TodoForm)
