import React, { Component } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import './app.css';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

export default class App extends Component {

	maxId = 100;

	state = {
		taskData: [
			this.createTaskItem('Completed task'),
			this.createTaskItem('Editing task'),
			this.createTaskItem('Active task'),
		],
	};

	static defaultProps = {
		updateInterval: 60000,
	}

	static propTypes = {
		updateInterval: (props, propName, componentName) => {
			const value = props[propName];
			if (typeof value === 'number' && !Number.isNaN(Number(value))) {
				return null;
			}
			return new Error(`${componentName}: ${propName} must be a number`)
		},
	}

	componentDidMount() {
		const { updateInterval } = this.props;
		this.timer = setInterval(() => this.updateTimer(), updateInterval)
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	clearCompleted = () => {
		this.setState(({ taskData }) => {
			const newArr = taskData.filter((el) => el.done === false)
			return {
				taskData: newArr,
			}
		})
	};

	deleteItem = (id) => {
		this.setState(({ taskData }) => {
			const idx = taskData.findIndex((el) => el.id === id);
			const newArray = [
				...taskData.slice(0, idx),
				...taskData.slice(idx + 1)]
			return {
				taskData: newArray,
			}
		})
	}

	addItem = (text) => {
		const newItem = this.createTaskItem(text)

		this.setState(({ taskData }) => {
			const newArray = [
				...taskData,
				newItem]
			return {
				taskData: newArray,
			}
		})
	}

	editItem = (text, id) => {
		this.setState(({ taskData }) => {
			const idx = taskData.findIndex((el) => el.id === Number(id));
			const newItem = { ...taskData[idx], label: text, edit: false };
			const newArray = [
				...taskData.slice(0, idx),
				newItem,
				...taskData.slice(idx + 1)];
			return {
				taskData: newArray,
			}
		})
	}

	onToggleDone = (id) => {
		this.setState(({ taskData }) => ({
			taskData: this.toggleProperty(taskData, id, 'done'),
		}))
	};

	EditiongItem = (id) => {
		this.setState(({ taskData }) => ({
			taskData: this.toggleProperty(taskData, id, 'edit'),
		}))
	};

	showAll = () => {
		this.setState(({ taskData }) => ({
			taskData: this.showItems(taskData, false, false),
		}))
	};

	showActive = () => {
		this.setState(({ taskData }) => ({
			taskData: this.showItems(taskData, true, false),
		}))
	};

	showCompleted = () => {
		this.setState(({ taskData }) => ({
			taskData: this.showItems(taskData, false, true),
		}))
	};

	showItems = (arr, status1, status2) => {
		const newArr = arr.map((el) => {
			let newEl;
			if (el.done) {
				newEl = { ...el, filterAll: status1 }
			} else {
				newEl = { ...el, filterAll: status2 }
			}
			return newEl;
		})
		return newArr
	}

	toggleProperty(arr, id, propName) {
		const idx = arr.findIndex((el) => el.id === id);
		const oldItem = arr[idx];
		const newItem = { ...oldItem, [propName]: !oldItem[propName] };
		return [
			...arr.slice(0, idx),
			newItem,
			...arr.slice(idx + 1)]
	}

	updateTimer() {
		this.setState(({ taskData }) => {
			const newArr = taskData.map((el) => {
				const updetingTime = formatDistanceToNow(
					el.createdDate,
					{ includeSeconds: true },
				);
				const newEl = { ...el, timeFromCreated: updetingTime };

				return newEl;
			})
			return {
				taskData: newArr,
			}
		})
	}

	createTaskItem(label) {
		return {
			label,
			forInp: label,
			createdDate: new Date(),
			timeFromCreated: formatDistanceToNow(
				new Date(),
				{ includeSeconds: true },
			),
			edit: false,
			done: false,
			filterAll: false,
			id: this.maxId++,
		}
	}

	render() {
		const { taskData } = this.state;
		const doneCount = taskData
			.filter((el) => el.done).length;
		return (
			<section className="todoapp">
				<NewTaskForm onItemAdded={this.addItem} />
				<section className="main">
					<TaskList
						tasks={taskData}
						onDeleted={this.deleteItem}
						onToggleDone={this.onToggleDone}
						onEditClick={this.EditiongItem}
						onItemEditiong={this.editItem}
					/>
					<Footer
						done={doneCount}
						showingAll={this.showAll}
						showingActive={this.showActive}
						showingCompleted={this.showCompleted}
						clearingCompleted={this.clearCompleted}
					/>
				</section>
			</section>
		)
	}
}