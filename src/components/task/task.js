import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import Timer from '../timer';
import './task.css';

function Task({ label, timeFromCreated, onDeleted,
    onToggleDone, done, onEditClick,
    toWorkClick, toStopClick, id, index, ...itemProps }) {

    let classNames = 'view';

    if (done) {
        classNames += ' completed';
    }

    return (
        <Draggable draggableId={`${id}`} index={index} key={id}>
            {(provided) => (
                <div 
                    className={classNames}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <label>
                        <input
                            className="toggle"
                            type="checkbox"
                            onChange={onToggleDone}
                        />

                        <span className="title">
                            {label}
                        </span>
                    </label>
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
            )}
        </Draggable>
    )
}

export default Task;

Task.defaultProps = {
    done: false,
};

Task.propTypes = {  
    done: (props, propName, componentName) => {
        const value = props[propName];
        if (typeof value === 'boolean') {
            return null;
        }
        return new Error(`${componentName}: ${propName} must be a boolean`)
    },
};