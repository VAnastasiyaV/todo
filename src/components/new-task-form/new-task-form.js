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
		// if (name === 'seconds' && ) {}
		this.setState({
			[name]: e.target.value,
		})
	}

// www = (e) => {
// 	e.target.setCustomValidity('Username')
// }

	handleKeyDown = (e) => {
		const { label, minutes, seconds } = this.state;
		if (e.code === 'Enter') 
        {
			if (Math.round(minutes)/minutes !== 1 
				|| minutes > 99
				|| minutes < 0 
				|| label === ''
				|| seconds === '' 
				|| minutes === ''
				|| Math.round(seconds)/seconds !== 1 
				|| seconds > 59 
				|| seconds < 0 ) {
				return (
					this.setState({
						dataWrong: true,
					}),
					console.log(minutes,seconds,label))
			}
            e.preventDefault();
			// console.log(this.state.dataWrong)
			this.props.onItemAdded(label,minutes,seconds);
			this.setState({
				label: '',
				minutes: '',
				seconds: '',
				dataWrong: false,
			})
        } 
		// e.preventDefault();
		// this.props.onItemAdded(this.state.label);
		// this.setState({
		// 	label: '',
		// })
		
	}

	handleClickOutside = (e) => {
		console.log(e);
		if (e.target.name !== "label"
			&& e.target.name !== "minutes"
			&& e.target.name !== "seconds") {
			this.setState({
				label: '',
				minutes: '',
				seconds: '',
				dataWrong: false,
			})
		}
	}

	// onSubmit = (e) => {
	// 	e.preventDefault();
		// this.props.onItemAdded(this.state.label);
		// this.setState({
		// 	label: '',
		// })
	// 	console.log('ok')
	// }

	render() {
		const ErMessage = this.state.dataWrong 
						  ? <div className='new-todo-form__data-wrong'>
								All fields should be fill. Field "min" should only contain whole numbers from 0 till 99.  Field "sec" should only contain whole numbers from 0 till 59.  
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
						required
						onInvalid={this.www}
						title="should only contain numbers from 0 till 99"
						min="0"
						max="99"
						step='1'
						/>
          			<input 
						type="number"
						name='seconds'
						className="new-todo-form__timer" 
						onChange={this.handleInputChange}placeholder="Sec"
						value={this.state.seconds}
						required
						title="should only contain numbers from 0 till 59"
						min="0"
						max="59"
						step='1'
						/>
				</form>
			</header>
		);
	}
}