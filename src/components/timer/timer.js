import React from 'react';

import './timer.css';

function Timer({ toWorkClick, toStopClick, timeInWork }) {

    return(
        <span className="description">
            <button type='button' 
                className="icon icon-play"
                onClick={toWorkClick} />
            <button type='button' 
                className="icon icon-pause"
                onClick={toStopClick} />
            {timeInWork.minutes}:{timeInWork.seconds}
        </span>
    )
}

export default Timer;
        
    

