import React from 'react'
import Module from '../module/Module'
import OneLesson from '../module/OneLesson'
import ButtonInsert from '../module/ButtonInsert'
import ClickWindow from './ClickWindow'
import ModalDelete from './ModalDelete'
import ModalChange from './ModalChange'
import ModalInsert from './ModalInsert'
import './timetable.css'

class TimetableStudent extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        ClickWindow(event, this.props);
    }
    render() {
        return (
            <>
                <div className="module__wrapper">
                    <Module id_block="0" />
                    <Module id_block="1" />
                    <Module id_block="2" />
                    <Module id_block="3" />
                    <Module id_block="4" />
                    <Module id_block="5" />
                </div>
                <div id="myModal" className="modal" onClick={this.handleClick}>
                    <div className="modal__content">
                        <span className="close" onClick={this.handleClick}>&times;</span>
                        <div className="modal__title"></div>
                        <OneLesson />
                        <OneLesson />
                        <OneLesson />
                        <OneLesson />
                        <OneLesson />
                        <ButtonInsert />
                    </div>
                </div>
                <ModalDelete />
                <ModalChange />
                <ModalInsert />

            </>
        )
    }
}

export default TimetableStudent;