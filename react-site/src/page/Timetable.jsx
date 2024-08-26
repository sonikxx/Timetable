import React from 'react'
import Header from "../components/header/Header"
import MainText from "../components/mainText/MainText"
import WhoseTimetable from "../components/whose/WhoseTimetable"
import SelectWeek from "../components/selectWeek/SelectWeek"
import TimetableStudent from "../components/timetable/TimetableStudent"
import Button from "../components/button/Button"

class Timetable extends React.Component {
    render() {
        return (
            <>
                <Header />
                <MainText m="-60px 0px 45px 0px" />
                <WhoseTimetable />
                <SelectWeek />
                <TimetableStudent />
                <Button my_class="button__back" name="вернуться к выбору" />
            </>
        )
    }
}

export default Timetable;
