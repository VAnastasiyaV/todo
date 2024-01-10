import React, { useState } from 'react';
import './new-task-form.css';

function NewTaskForm({ onItemAdded }) {
    const [newTask, setNewTask] = useState({
        label: '',
        minutes: '',
        seconds: '',
        dataWrong: false
    });

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value; 
        const d = new Date('01 January 00:00:00');
        
        switch(name) {
        case 'minutes':  
            d.setMinutes(value); 
            setNewTask({...newTask, minutes: d.getMinutes().toString().padStart(2, "0")})
			  break;
        case 'seconds':  
            d.setSeconds(value);
            setNewTask({...newTask, seconds: d.getSeconds().toString().padStart(2, "0")})
			  break;
        default:
            setNewTask({...newTask, label: value})
		  }
    }
    /* eslint-disable-next-line consistent-return */
    const handleKeyDown = (e) => {
        if (e.code === 'Enter') {
            const min = newTask.minutes === '' ?  '00' : newTask.minutes;
            const sec = newTask.seconds === '' ?  '00' : newTask.seconds;
            
            if (newTask.label === '') {
                return (
                    setNewTask({...newTask, dataWrong: true}))
            };

            onItemAdded(newTask.label, min, sec);

            return ( 
                setNewTask({
                    label: '',
                    minutes: '',
                    seconds: '',
                    dataWrong: false,
                }))
        }
        
    }

    const ErMessage = newTask.dataWrong 
        /* eslint-disable react/no-unescaped-entities */
        ? <div className='new-todo-form__data-wrong'>
            The field 'What needs to be done?' should be fill.
        </div>
        : null;

    return (
        <header className="header">
            <h1>todos</h1>
            {ErMessage}
            <form
                className="new-todo-form"		
                onKeyDown={handleKeyDown}
            >
                <input
                    type="text"
                    name='label'
                    className="new-todo"
                    onChange={handleInputChange}
                    placeholder="What needs to be done?"
                    value={newTask.label}
                    required
                    autoFocus
                />
                <input 
                    type="number"
                    name='minutes'						
                    className="new-todo-form__timer" 
                    onChange={handleInputChange}		
                    placeholder="Min"
                    value={newTask.minutes}
                />
                <input 
                    type="number"
                    name='seconds'
                    className="new-todo-form__timer" 
                    onChange={handleInputChange}
                    placeholder="Sec"
                    value={newTask.seconds}
                />
            </form>
        </header>
    );
}

export default NewTaskForm;