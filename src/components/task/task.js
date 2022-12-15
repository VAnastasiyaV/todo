import React, { Component } from 'react';

import Timer from '../timer';
import './task.css';

export default class Task extends Component {
	static propTypes = {
		done: (props, propName, componentName) => {
			const value = props[propName];
			if (typeof value === 'boolean') {
				return null;
			}
			return new Error(`${componentName}: ${propName} must be a boolean`)
		},
	}

	static defaultProps = {
		done: false,
	}

	render() {
		const {
			label, timeFromCreated, onDeleted,
			onToggleDone, done, onEditClick,
			toWorkClick, toStopClick, ...itemProps
		} = this.props;

		let classNames = 'view';

		if (done) {
			classNames += ' completed';
		}

		return (
			<div className={classNames}>
				<input
					className="toggle"
					type="checkbox"
					onChange={onToggleDone}
				/>
				<label>
					<span className="title">
						{label}
					</span>
					< Timer 
						{...itemProps}
						toWorkClick={toWorkClick}
						toStopClick={toStopClick} 
					/>
					<span className="created">
						created
						{' '}
						{timeFromCreated}
						{' '}
						ago
					</span>
				</label>
				<button
					type="button"
					className="icon icon-edit"
					onClick={onEditClick}
				/>
				<button
					type="button"
					className="icon icon-destroy"
					onClick={onDeleted}
				/>
			</div>
		)
	}
}
