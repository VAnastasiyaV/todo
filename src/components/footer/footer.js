import React from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../tasks-filter'
import './footer.css';

function Footer({
    done, showingAll, showingActive,
    showingCompleted, clearingCompleted,
}) {
   
    return (
        <footer className="footer">
            <span className="todo-count">
                {done}
                {' '}
                items left
            </span>
            <TasksFilter
                showingAll={() => showingAll()}
                showingActive={() => showingActive()}
                showingCompleted={() => showingCompleted()}
            />
            <button
                type="button"
                className="clear-completed"
                onClick={() => clearingCompleted()}
            >
                Clear completed
            </button>
        </footer>
    )
}

export default Footer;

Footer.defaultProps = {
    done: 0,
    showingAll: () => {},
    showingActive: () => {},
    showingCompleted: () => {},
    clearingCompleted: () => {},
};

Footer.propTypes = {
    done: PropTypes.number,
    showingAll: PropTypes.func,
    showingActive: PropTypes.func,
    showingCompleted: PropTypes.func,
    clearingCompleted: PropTypes.func,
}
