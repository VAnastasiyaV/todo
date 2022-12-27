import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import Timer from '../timer';
import './task.css';

export default class Task extends Component {

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
        )
    }
}

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