import React from 'react'
import TitleModule from '../titleModule/TitleModule'
import Lesson from '../lesson/Lesson'
import FillDate from './FillDate'
import FillDay from './FillDay'
import './module.css'
import ClickWindow from '../timetable/ClickWindow'


class Module extends React.Component {
    constructor(props) {
        super(props);
        // this.state = { value: '' };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        // this.state.value = this.props.id_block;
        ClickWindow(event, this.props);
    }

    render() {
        return (
            <>
                <div onClick={this.handleClick} className="block">
                    <TitleModule />
                    <FillDate />
                    <Lesson time_start="9:00" time_finish="10:30" />
                    <Lesson time_start="10:45" time_finish="12:15" />
                    <Lesson time_start="13:00" time_finish="14:30" />
                    <Lesson time_start="14:45" time_finish="16:15" />
                    <Lesson time_start="16:30" time_finish="18:00" />
                    <FillDay />
                </div >
            </>
        )
    }
}

export default Module;