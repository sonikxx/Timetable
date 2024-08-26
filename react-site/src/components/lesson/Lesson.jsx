import React from 'react'
import Time from '../time/Time'
import LessonName from '../lessonName/LessonName'
import './lesson.css'

class Lesson extends React.Component {
    render() {
        return (
            <div className="lesson">
                <Time time_start={this.props.time_start} time_finish={this.props.time_finish} />
                <LessonName />
            </div>
        )
    }
}

export default Lesson;