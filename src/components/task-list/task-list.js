import React, { Component } from 'react';

import Task from '../task';
import './task-list.css';

export default class TaskList extends Component {
	state = {
		label: '',
		idI: '',
	}

	static defaultProps = {
		edit: false,
		filterAll: false,
	}

	componentDidMount() {
		this.nameInput.focus();
	}

	onLabelChange = (e) => {
		this.setState({
			label: e.target.value,
			idI: e.target.id,
		})
	}

	onSubmit = (e) => {
		e.preventDefault();
		this.props.onItemEditiong(this.state.label, this.state.idI);
	}

	render() {
		const {
			tasks, onDeleted, onToggleDone,
			onEditClick,
		} = this.props;

		const elements = tasks.map((item) => {
			const {
				id, edit, forInp, filterAll, ...itemProps
			} = item;

			let classNameInp = 'hidden';
			let classNameLi = '';
			let labelInp;

			if (this.state.label === '') {
				labelInp = forInp
			} else labelInp = this.state.label;
			if (edit) {
				classNameLi = 'editing';
				classNameInp = 'edit';
			}

			if (filterAll) {
				classNameLi = 'hidden';
			}

			return (
				<li key={id} className={classNameLi}>
					<Task
						{...itemProps}
						onDeleted={() => onDeleted(id)}
						onToggleDone={() => onToggleDone(id)}
						onEditClick={() => onEditClick(id)}
					/>
					<form onSubmit={this.onSubmit}>
						<input
							type="text"
							id={id}
							className={classNameInp}
							onChange={this.onLabelChange}
							value={labelInp}
							ref={(input) => { this.nameInput = input; }}
						/>
					</form>
				</li>
			);
		});

		return (
			<ul className="todo-list">
				{ elements }
			</ul>
		);
	}
}
