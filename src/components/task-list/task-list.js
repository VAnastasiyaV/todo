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

	componentDidUpdate(prevProps) {
		if(prevProps.onEditiong !== this.props.onEditiong && Boolean(this.props.onEditiong)) {
			this.nameInput.focus();
		}
	}

	onLabelChange = (e) => {
		this.setState({
			label: e.target.value,
			idI: e.target.id,
		})
	}

	handleKeyDown = (e) => {
		if (e.keyCode === 27) {
			this.cancelLabelChange()
		}
	  };

	cancelLabelChange = () => {
		this.setState({
			label: '',
			idI: ''
		});
		this.props.onItemEditiong(false, this.props.onEditiong)
	}

	handleClickOutside = (e) => {		
		if (Number(e.target.id) !== Number(this.props.onEditiong)) {
			this.cancelLabelChange()
		}
	}

	onSubmit = (e) => {
		const {label, idI} = this.state;
		e.preventDefault();
		if(idI === '') {return this.cancelLabelChange();}
		return this.props.onItemEditiong(label, idI);
	}

	render() {
		const {
			tasks, onDeleted, onToggleDone,
			onEditClick, toWorkClick, 
			toStopClick, 
		} = this.props;

		if (tasks.length === 0) {
			return <div key="1" className='empty'><p>No task found</p></div>
		}

		const elements = tasks.map((item) => {
			const {
				id, edit, forInp, filterAll, ...itemProps
			} = item;
			
			document.addEventListener("mousedown", this.handleClickOutside);

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
						toWorkClick={(e) => toWorkClick(e, id) }
						toStopClick={() => toStopClick(id) }
					/>
					<form onSubmit={this.onSubmit}>
						<input
							type="text"
							id={id}
							className={classNameInp}
							onChange={this.onLabelChange}
							onKeyDown={this.handleKeyDown}
							value={labelInp}
							ref={edit 
								? ((input) => { this.nameInput = input;}) 
								: (() => {}) }
							required
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
