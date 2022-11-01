import React, { Component } from 'react';

import './tasks-filter.css';

export default class TasksFilter extends Component {
	state = {
		classNameAll: 'selected',
		classNameActive: '',
		classNameCompleted: '',
	}

	onClickBtnAll = () => {
		this.setState({
			classNameAll: 'selected',
			classNameActive: '',
			classNameCompleted: '',
		})
		this.props.showingAll();
	}

	onClickBtnActive = () => {
		this.setState({
			classNameAll: '',
			classNameActive: 'selected',
			classNameCompleted: '',
		})
		this.props.showingActive();
	}

	onClickBtnCompleted = () => {
		this.setState({
			classNameAll: '',
			classNameActive: '',
			classNameCompleted: 'selected',
		})
		this.props.showingCompleted();
	}

	render() {
		return (
			<ul className="filters">
				<li>
					<button
						type="button"
						className={this.state.classNameAll}
						onClick={this.onClickBtnAll}
					>
						All
					</button>
				</li>
				<li>
					<button
						type="button"
						className={this.state.classNameActive}
						onClick={this.onClickBtnActive}
					>
						Active
					</button>
				</li>
				<li>
					<button
						type="button"
						className={this.state.classNameCompleted}
						onClick={this.onClickBtnCompleted}
					>
						Completed
					</button>
				</li>
			</ul>
		)
	}
}
