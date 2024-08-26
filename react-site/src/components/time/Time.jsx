import React from 'react'
import './time.css'

class Time extends React.Component {
    render() {
        return (
            <div className="time">{this.props.time_start} {this.props.time_finish}</div>
        )
    }
}

export default Time;