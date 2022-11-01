import React, { Component } from 'react';
import './new-task-form.css';

export default class NewTaskForm extends Component {
	state = {
		label: '',
	}

	onLabelChange = (e) => {
		this.setState({
			label: e.target.value,
		})
	}

	onSubmit = (e) => {
		e.preventDefault();
		this.props.onItemAdded(this.state.label);
		this.setState({
			label: '',
		})
	}

	render() {
		return (
			<header className="header">
				<h1>todos</h1>
				<form
					onSubmit={this.onSubmit}
				>
					<input
						type="text"
						className="new-todo"
						onChange={this.onLabelChange}
						placeholder="What needs to be done?"
						value={this.state.label}
						autoFocus
					/>
				</form>
			</header>
		);
	}
}
