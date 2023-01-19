import React, { useState, useEffect, useRef } from 'react';

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
            
    const elements = tasks.map((item) => {
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
        <ul className="todo-list">
            { elements }
        </ul> 		
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



// import React, { Component, useState } from 'react';

// import Task from '../task';
// import './task-list.css';

// export default class TaskList extends Component {

//     state = {
//         label: '',
//         idI: '',
//     }

//     componentDidUpdate(prevProps) {
//         if(prevProps.onEditiong !== this.props.onEditiong && Boolean(this.props.onEditiong)) {
//             this.nameInput.focus();
//         }
//     }

//     onLabelChange = (e) => {
//         this.setState({
//             label: e.target.value,
//             idI: e.target.id,
//         })
//     }

//     handleKeyDown = (e) => {
//         if (e.keyCode === 27) {
//             this.cancelLabelChange()
//         }
// 	  };

//     cancelLabelChange = () => {
//         this.setState({
//             label: '',
//             idI: ''
//         });
//         this.props.onItemEditiong(false, this.props.onEditiong)
//     }

//     handleClickOutside = (e) => {		
//         if (Number(e.target.id) !== Number(this.props.onEditiong)) {
//             this.cancelLabelChange()
//         }
//     }

//     onSubmit = (e) => {
//         const {label, idI} = this.state;
//         e.preventDefault();
//         if(idI === '') {return this.cancelLabelChange();}
//         this.props.onItemEditiong(label, idI);
//         return this.setState({
//             label: '',
//             idI: ''
//         });
		
//     }

//     render() {
//         const {
//             tasks, onDeleted, onToggleDone,
//             onEditClick, toWorkClick, 
//             toStopClick, 
//         } = this.props;

//         if (tasks.length === 0) {
//             return <div key="1" className='empty'><p>No task found</p></div>
//         }

//         const elements = tasks.map((item) => {
//             const {
//                 id, edit, forInp, filterAll, ...itemProps
//             } = item;
			
//             document.addEventListener("mousedown", this.handleClickOutside);

//             let classNameInp = 'hidden';
//             let classNameLi = '';
//             let labelInp;

//             if (this.state.label === '') {
//                 labelInp = forInp
//             } else labelInp = this.state.label;

//             if (edit) {
//                 classNameLi = 'editing';
//                 classNameInp = 'edit';
//             }

//             if (filterAll) {
//                 classNameLi = 'hidden';
//             }

//             return (
//                 <li key={id} className={classNameLi}>
//                     <Task
//                         {...itemProps}
//                         onDeleted={() => onDeleted(id)}
//                         onToggleDone={() => onToggleDone(id)}
//                         onEditClick={() => onEditClick(id)}
//                         toWorkClick={(e) => toWorkClick(e, id) }
//                         toStopClick={() => toStopClick(id) }
//                     />
//                     <form onSubmit={this.onSubmit}>
//                         <input
//                             type="text"
//                             id={id}
//                             className={classNameInp}
//                             onChange={this.onLabelChange}
//                             onKeyDown={this.handleKeyDown}
//                             value={labelInp}
//                             ref={edit 
//                                 ? ((input) => { this.nameInput = input;}) 
//                                 : (() => {}) }
//                             required
//                         />
//                     </form>
//                 </li>
//             );
//         });

//         return (
//             <ul className="todo-list">
//                 { elements }
//             </ul> 		
//         );
//     }
// }

// TaskList.defaultProps = {
//     edit: false,
//     filterAll: false,
// };

// TaskList.propTypes = { 
//     edit: (props, propName, componentName) => {
//         const value = props[propName];
//         if (typeof value === 'boolean') {
//             return null;
//         }
//         return new Error(`${componentName}: ${propName} must be a boolean`)
//     },

//     filterAll: (props, propName, componentName) => {
//         const value = props[propName];
//         if (typeof value === 'boolean') {
//             return null;
//         }
//         return new Error(`${componentName}: ${propName} must be a boolean`)
//     }
// };
