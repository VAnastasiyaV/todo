import React, { useState } from 'react';

import './tasks-filter.css';

function TasksFilter({ showingAll, showingActive, showingCompleted }) {

    const [classNames, setClassNames] = useState({
        classNameAll: 'selected',
        classNameActive: '',
        classNameCompleted: ''
    })

    const onClickBtnAll = () => {
        setClassNames({
            classNameAll: 'selected',
            classNameActive: '',
            classNameCompleted: '',
        })
        showingAll();
    }

    const onClickBtnActive = () => {
        setClassNames({
            classNameAll: '',
            classNameActive: 'selected',
            classNameCompleted: '',
        })
        showingActive();
    }

    const onClickBtnCompleted = () => {
        setClassNames({
            classNameAll: '',
            classNameActive: '',
            classNameCompleted: 'selected',
        })
        showingCompleted();
    }

    return (
        <ul className="filters">
            <li>
                <button
                    type="button"
                    className={classNames.classNameAll}
                    onClick={onClickBtnAll}
                >
                    All
                </button>
            </li>
            <li>
                <button
                    type="button"
                    className={classNames.classNameActive}
                    onClick={onClickBtnActive}
                >
                    Active
                </button>
            </li>
            <li>
                <button
                    type="button"
                    className={classNames.classNameCompleted}
                    onClick={onClickBtnCompleted}
                >
                    Completed
                </button>
            </li>
        </ul>
    )
}

export default TasksFilter;



