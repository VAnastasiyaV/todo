import React, { Component } from 'react';
import './new-task-form.css';

export default class NewTaskForm extends Component {
    state = {
        label: '',
        minutes: '',
        seconds: '',
        dataWrong: false
    }

    handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value; 
        const d = new Date('01 January 00:00:00');
        switch(name) {
        case 'minutes':  
            d.setMinutes(value); 
            this.setState({
                [name]: d.getMinutes().toString().padStart(2, "0"),
            });
			  break;
        case 'seconds':  
            d.setSeconds(value);
            this.setState({
                [name]: d.getSeconds().toString().padStart(2, "0"),
            });
			  break;
        default:
            this.setState({
                [name]: value,
            });
		  }
    }

    handleKeyDown = (e) => {
        const { label, minutes, seconds } = this.state;
        if (e.code === 'Enter') {
            const min = minutes === '' ? '00' : minutes; 
            const sec = seconds === '' ? '00' : seconds;
            if (label === '') {
                return (
                    this.setState({
                        dataWrong: true,
                    }))
            }

            e.preventDefault();
            this.props.onItemAdded(label,min,sec);
            return ( 
                this.setState({
                    label: '',
                    minutes: '',
                    seconds: '',
                    dataWrong: false,
                }))
        } return undefined;
    }

    render() {
        const ErMessage = this.state.dataWrong ?
        /* eslint-disable react/no-unescaped-entities */
            <div className='new-todo-form__data-wrong'>
                The field 'What needs to be done?' should be fill.
            </div>
						  : null;

        document.addEventListener("mousedown", this.handleClickOutside);

        return (
            <header className="header">
                <h1>todos</h1>
                {ErMessage}
                <form
                    className="new-todo-form"		
                    onSubmit={this.onSubmit}
                    onKeyDown={this.handleKeyDown}
                >
                    <input
                        type="text"
                        name='label'
                        className="new-todo"
                        onChange={this.handleInputChange}
                        placeholder="What needs to be done?"
                        value={this.state.label}
                        required
                        autoFocus
                    />
                    <input 
                        type="number"
                        name='minutes'						
                        className="new-todo-form__timer" 
                        onChange={this.handleInputChange}		placeholder="Min"
                        value={this.state.minutes}
                    />
                    <input 
                        type="number"
                        name='seconds'
                        className="new-todo-form__timer" 
                        onChange={this.handleInputChange}placeholder="Sec"
                        value={this.state.seconds}
                    />
                </form>
            </header>
        );
    }
}