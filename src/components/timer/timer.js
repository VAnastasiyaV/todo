import React, { Component } from 'react';

import './timer.css';

export default class Timer extends Component {

    render(){
        const {
            toWorkClick, toStopClick, timeInWork
        } = this.props;

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
}
        
    

