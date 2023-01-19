import React, { useState, useEffect, useCallback, useRef } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import './app.css';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

function App({ updateInterval }) {

    const timerRef = useRef();
    let taskTimer = null;

    const createTaskItem = (label, min, sec, newId) => ({
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
        id: newId + 1,
        inWorking: false,
        timeInWork: {minutes: min, seconds: sec},
    })    

    const [todos, setTodos] = useState({
        taskData: [
            createTaskItem('Completed task',1,1,100),
            createTaskItem('Editing task',0,2, 101),
            createTaskItem('Active task',0,0,102),
        ],
        workTimerOn: false,
        onEdition: false
    });

    useEffect(() => {
        let workTimer = null;
        if (todos.workTimerOn) {
            workTimer = setInterval(() => updateWorkTimer(), 1000)
            
        };
        return () => clearInterval(workTimer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [todos.workTimerOn]);

    const startTimer = useCallback(() => {
        timerRef.current = setInterval(() => {
            setTodos((todos) => {
                const newArr = todos.taskData.map((el) => {
                    const updetingTime = formatDistanceToNow(
                        el.createdDate,
                    );
                    const newEl = { ...el, timeFromCreated: updetingTime };
                    return newEl;
                });
                return {
                    ...todos,
                    taskData: newArr }});
     
        }, updateInterval);
    }, [timerRef, updateInterval]);
    const clearTimer = useCallback(() => clearInterval(timerRef.current), [timerRef]);

    useEffect(() => {
        startTimer();
        return () => clearTimer();
    }, [ startTimer, clearTimer]);

    // useEffect(() => {
    //     timer = setInterval(() => updateTimer(), updateInterval);
    //     return () => clearInterval(timer);
    // }, [])
    
    useEffect(() => () => {
        clearTimeout(taskTimer);
    }, [taskTimer])
    
    const timerOn = () => {
        setTodos((todos) => {
            const newArr = todos.taskData.filter((el) => el.inWorking === true);
            if (!newArr.length) {
                return ({...todos, workTimerOn: false})
            } 
            return ({...todos, workTimerOn: true})
        })
    };

    const clearCompleted = () => {
        const newArr = todos.taskData.filter((el) => el.done === false);
        setTodos({...todos, taskData: newArr})
    };

    const deleteItem = (id) => {
        setTodos((todos) => {
            const newArr = todos.taskData.filter((el) => el.id !== id)
            return {...todos, taskData: newArr}
        })
    }

    const addItem = (text, min, sec) => {
        setTodos((todos) => {   
            const arrayId = [];
            todos.taskData.forEach((task) => arrayId.push(task.id));
            const newId = arrayId.reduce((x, y) => Math.max(x, y));
            const newItem = createTaskItem(text, min, sec, newId);
            const newArray = [...todos.taskData, newItem];
            return {...todos, taskData: newArray}
        })
    }

    const editItem = (text, id) => { 
        setTodos((todos) => {
            if (text) {
                const idx = todos.taskData.findIndex((el) => Number(el.id) === Number(id));
                const newItem = { ...todos.taskData[idx], 'label': text, 'forInp': text };
                const newArray = [
                    ...todos.taskData.slice(0, idx),
                    newItem,
                    ...todos.taskData.slice(idx + 1)];
                return ({...todos, 
                    taskData: changeProperty(newArray, id, 'edit', false ),
                    onEdition: false})
            } 

            return ({
                ...todos,
                taskData: changeProperty(todos.taskData, id, 'edit', false ),
                onEdition: false })
        })
    }

    const onToggleDone = (id) => {
        setTodos({
            ...todos,
            taskData: toggleProperty(todos.taskData, id, 'done') })
    };

    const editiongItem = (id) => {
        if (!todos.onEdition) {
            setTodos({
                ...todos,
                taskData: toggleProperty(todos.taskData, id, 'edit'),
                onEdition: id })
        }
    };

    const showAll = () => {
        setTodos({
            ...todos,
            taskData: showItems(todos.taskData, false, false) })
    };

    const showActive = () => {
        setTodos({
            ...todos,
            taskData: showItems(todos.taskData, true, false) })
    };

    const showCompleted = () => {
        setTodos({
            ...todos,
            taskData: showItems(todos.taskData, false, true) })
    };

    const showItems = (arr, status1, status2) => {
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

    const startWorkTimer = (e, id) => {
        const idx = todos.taskData.findIndex((el) => el.id === Number(id));
        if (todos.taskData[idx].timeInWork.minutes === 0 
			&& todos.taskData[idx].timeInWork.seconds === 0) return;
        setTodos({
            ...todos,
            taskData: changeProperty(todos.taskData, id, 'inWorking', true ) });
        taskTimer = setTimeout(() => {
            timerOn();
		  }, 0);
    }
	
    const stopWorkTimer = (id) => {
        setTodos((todos) =>  ({
            ...todos,
            taskData: changeProperty(todos.taskData, id, 'inWorking', false ) })        
        )
        taskTimer = setTimeout(() => {
            timerOn();
        }, 0);
    }

    const updateWorkTimer = () => {
        const stoppingTasks = [];
        setTodos((todos) => {
            const newArr = todos.taskData.map((task) => {
                const minutes = task.timeInWork.minutes;
                const seconds = task.timeInWork.seconds;
                let newTask = [];
                if (minutes === '00' && seconds === '00') {
                    newTask = { 
                        ...task, 
                        inWorking: false,
                        timeInWork: {minutes: '00', seconds: '00'}, 
                    };
                    stoppingTasks.push(task.id);
                } else if (task.inWorking) {
                    const d = new Date('01 January 00:00:00');
                    d.setMinutes(minutes, seconds); 
                    const date = new Date(d.getTime() - 1);
                    newTask = { 
                        ...task, 
                        timeInWork: {minutes: date.getMinutes().toString().padStart(2, "0"), 
                            seconds: date.getSeconds().toString().padStart(2, "0")} 
                    }
                } else {
                    newTask = task;
                }
                return newTask;
            });
            if (stoppingTasks.length > 0) { 
                stoppingTasks.forEach((task) => stopWorkTimer(task))
            }
            return {
                ...todos,
                taskData: newArr }});
    }

    const toggleProperty = (arr, id, propName) => {
        const idx = arr.findIndex((el) => Number(el.id) === Number(id));
        const oldItem = arr[idx];
        const newItem = { ...oldItem, [propName]: !oldItem[propName] };
        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)]
    }

    const changeProperty = (arr, id, propName, value) => {
        const idx = arr.findIndex((el) => el.id === Number(id));
        const newItem = { ...arr[idx], [propName]: value };
        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)];
    }
    
    const doneCount = todos.taskData
        .filter((el) => el.done).length;
			
    return (
        <section className="todoapp">
            <NewTaskForm onItemAdded={addItem} />
            <section className="main">
                <TaskList
                    onEditiong={todos.onEdition}
                    tasks={todos.taskData}
                    onDeleted={deleteItem}
                    onToggleDone={onToggleDone}
                    onEditClick={editiongItem}
                    onItemEditiong={editItem}
                    toWorkClick={startWorkTimer}
                    toStopClick={stopWorkTimer}
                />
                <Footer
                    done={doneCount}
                    showingAll={showAll}
                    showingActive={showActive}
                    showingCompleted={showCompleted}
                    clearingCompleted={clearCompleted}
                />
            </section>
        </section>
    )
}

export default App;

App.defaultProps = {
    updateInterval: 20000,
};

App.propTypes = {  
    updateInterval: (props, propName, componentName) => {
        const value = props[propName];
        if (typeof value === 'number' && !Number.isNaN(Number(value))) {
            return null;
        }
        return new Error(`${componentName}: ${propName} must be a number`)
    },
};
