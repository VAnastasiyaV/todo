import React, { useState, useEffect, useRef } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import Task from '../task';
import './task-list.css';

function TaskList({  tasks, onDeleted, onToggleDone,
    onEditClick, toWorkClick, 
    toStopClick, onItemEditiong, onEditiong }) {

    const defaultTask = {
        label: '',
        idI: '',
    };
    
    const [taskData, setTaskData] = useState(defaultTask);
    const inputRef = useRef();

    useEffect(() => {
        if (onEditiong) {
            inputRef.current.focus();
            const editiongTask = tasks.filter((task) => Boolean(task.edit) === true);
            setTaskData({ ...taskData,
                label:  editiongTask[0].label,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onEditiong])

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside, false);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside, false);
        };
    });

    const onLabelChange = (e) => {
        setTaskData({
            label: e.target.value,
            idI: e.target.id,
        })
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 27) {
            cancelLabelChange();
        }
	  };

    const cancelLabelChange = () => {
        setTaskData(defaultTask);
        onItemEditiong(false, onEditiong);
    }

    const handleClickOutside = (e) => {  	
        if (Number(e.target.id) !== Number(onEditiong)) {
            cancelLabelChange();
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (taskData.idI === '') {return cancelLabelChange();}
        onItemEditiong(taskData.label, taskData.idI);
        return setTaskData(defaultTask);		
    }

    if (tasks.length === 0) {
        return <div key="1" className='empty'><p>No task found</p></div>
    }
            
    const elements = tasks.map((item,index) => {
        const {
            id, edit, forInp, filterAll, ...itemProps
        } = item;

        let classNameInp = 'hidden';
        let classNameLi = '';
        const labelInp = taskData.label;

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
                    id={id}
                    index={index}
                    onDeleted={() => onDeleted(id)}
                    onToggleDone={() => onToggleDone(id)}
                    onEditClick={() => onEditClick(id)}
                    toWorkClick={(e) => toWorkClick(e, id) }
                    toStopClick={() => toStopClick(id) }
                />
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        id={id}
                        className={classNameInp}
                        onChange={onLabelChange}
                        onKeyDown={handleKeyDown}
                        value={labelInp}
                        ref={edit
                            ? inputRef
                            : (() => {}) 
                        }
                    />
                </form>
            </li>
        );
    });
    
    return (
        <Droppable droppableId='taskList' >
            {(provided) => (
                <div className="todo-list" ref={provided.innerRef} {...provided.droppableProps}>
                    <div className="todo-list">
                        <ul className="todo-list">
                            { elements }
                        </ul> 	
                    </div>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>	
    );
}

export default TaskList;

TaskList.defaultProps = {
    edit: false,
    filterAll: false,
};

TaskList.propTypes = { 
    edit: (props, propName, componentName) => {
        const value = props[propName];
        if (typeof value === 'boolean') {
            return null;
        }
        return new Error(`${componentName}: ${propName} must be a boolean`)
    },

    filterAll: (props, propName, componentName) => {
        const value = props[propName];
        if (typeof value === 'boolean') {
            return null;
        }
        return new Error(`${componentName}: ${propName} must be a boolean`)
    }
};
