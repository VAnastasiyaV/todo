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
			this.createTaskItem('Completed task',1,1),
			this.createTaskItem('Editing task',0,2),
			this.createTaskItem('Active task',0,0),
		],
		workTimerOn: false,
		onEdition: false
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

	componentDidUpdate(prevProps, prevState) {
		const { workTimerOn } = this.state;
		if (prevState.workTimerOn !== workTimerOn && workTimerOn) {
			this.workTimer = setInterval(() => this.updateWorkTimer(), 1000)
		};
		if (prevState.workTimerOn !== workTimerOn && !workTimerOn) {
			clearInterval(this.workTimer);
			clearTimeout(this.taskTimer);
		}
	}

	componentWillUnmount() {
		clearInterval(this.timer);
		clearInterval(this.workTimer);
		clearTimeout(this.taskTimer);
	}

	timerOn = () => {
		const newArr = this.state.taskData.filter((el) => el.inWorking === true);
		if (!newArr.length) {
			this.setState({workTimerOn: false})
		} else {
			this.setState({workTimerOn: true})
		}
	};

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

	addItem = (text, min, sec) => {
		const newItem = this.createTaskItem(text, min, sec)
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
		
		this.setState(({ taskData }) => ({
			taskData: this.ChangeProperty(taskData, id, 'edit', false ),
		}));
		if (text) {
			this.setState(({ taskData }) => ({
				taskData: this.ChangeProperty(taskData, id, 'label', text ),
			}));
			this.setState(({ taskData }) => ({
				taskData: this.ChangeProperty(taskData, id, 'forInp', text ),
			}))
		};		
		this.setState({ onEdition: false })
	}

	onToggleDone = (id) => {
		this.setState(({ taskData }) => ({
			taskData: this.toggleProperty(taskData, id, 'done'),
		}))
	};

	EditiongItem = (id) => {
		if (!this.state.onEdition) {
			this.setState(({ taskData }) => ({
				taskData: this.toggleProperty(taskData, id, 'edit'),
			}));
			this.setState({ onEdition: id })
		}
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

	StartWorkTimer = (e, id) => {
		// console.log(e.target);
		const idx = this.state.taskData.findIndex((el) => el.id === Number(id));
		if (this.state.taskData[idx].timeInWork.minutes === 0 
			&& this.state.taskData[idx].timeInWork.seconds === 0) return;
		this.setState(({ taskData }) => ({
			taskData: this.ChangeProperty(taskData, id, 'inWorking', true ),
		}));
		this.taskTimer = setTimeout(() => {
			this.timerOn();
		  }, 0);
	}
	
	stopWorkTimer = (id) => {
		this.setState(({ taskData }) => ({
			taskData: this.ChangeProperty(taskData, id, 'inWorking', false ),
		}))
	}
	
	updateWorkTimer() {
		this.setState(({ taskData }) => {
			const newArr = taskData.map((task) => {
				let newTask;
				const minutes = parseInt(task.timeInWork.minutes, 10);
				const seconds = parseInt(task.timeInWork.seconds, 10);
				if (minutes === 0 && seconds === 0) {
					newTask = { 
						...task, 
						inWorking: false 
					} 
				} else if (task.inWorking) {
					const workTimSec = (seconds > 0) 
						? (seconds - 1)
						: '59';
					let workTimeMin; 
					if(seconds === 0 && minutes > 0) workTimeMin = (minutes - 1);
					else {
						workTimeMin = (minutes > 0) ? minutes : 0;
					}
					newTask = { 
						...task, 
						timeInWork: {minutes: workTimeMin, 
							seconds: workTimSec} 
					}
				} else {
					newTask = task;
				}
				return newTask;
			})
			return {
				taskData: newArr,
			}
		})
	}

	toggleProperty(arr, id, propName) {
		const idx = arr.findIndex((el) => el.id === Number(id));
		const oldItem = arr[idx];
		const newItem = { ...oldItem, [propName]: !oldItem[propName] };
		return [
			...arr.slice(0, idx),
			newItem,
			...arr.slice(idx + 1)]
	}

	ChangeProperty(arr, id, propName, value) {
		const idx = arr.findIndex((el) => el.id === Number(id));
		const newItem = { ...arr[idx], [propName]: value };
		return [
			...arr.slice(0, idx),
			newItem,
			...arr.slice(idx + 1)];
	}
	
	updateTimer() {
		this.setState(({ taskData }) => {
			const newArr = taskData.map((el) => {
				const updetingTime = formatDistanceToNow(
					el.createdDate,
				);
				const newEl = { ...el, timeFromCreated: updetingTime };

				return newEl;
			})
			return {
				taskData: newArr,
			}
		})
	}

	createTaskItem(label, min, sec) {
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
			inWorking: false,
			timeInWork: {minutes: min, seconds: sec},
		}
	}

	render() {
		const { taskData, onEdition } = this.state;
		const doneCount = taskData
			.filter((el) => el.done).length;
			
		return (
			<section className="todoapp">
				<NewTaskForm onItemAdded={this.addItem} />
				<section className="main">
					<TaskList
						onEditiong={onEdition}
						tasks={taskData}
						onDeleted={this.deleteItem}
						onToggleDone={this.onToggleDone}
						onEditClick={this.EditiongItem}
						onItemEditiong={this.editItem}
						toWorkClick={this.StartWorkTimer}
						toStopClick={this.stopWorkTimer}
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