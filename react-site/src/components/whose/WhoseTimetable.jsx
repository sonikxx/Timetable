import React from 'react'
import "./whoseTimetable.css"

class WhoseTimetable extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="whoseTimetable"> {localStorage.getItem('type_input')} {localStorage.getItem('user_input')} </div>
            </div>
        );
    }
}

export default WhoseTimetable;