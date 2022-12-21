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
		this.setState({
			[name]: e.target.value,
		})
	}

	handleKeyDown = (e) => {
		const { label, minutes, seconds } = this.state;
		let min = 0;
		let sec = 0;
		if (e.code === 'Enter') {

			if (minutes <= 0 || minutes === '') {
				min = 0;
			} else { 
				min = minutes > 99 ? 99 : Math.round(minutes) 
			};

			if (seconds <= 0 || seconds === '') {
				sec = 0;
			} else { 
				sec = seconds > 59 ? 59 : Math.round(seconds) 
			};
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