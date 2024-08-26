import React from 'react'
import Header from "../components/header/Header"
import MainText from "../components/mainText/MainText"
import NameInput from "../components/input/NameInput"
import InputGroup from "../components/input/InputGroup"
import SelectTeacher from "../components/selectTeacher/SelectTeacher.jsx"


class SecondPage extends React.Component {
    render() {
        return (
            <>
                <Header />
                <MainText m="-20px 0px 45px 0px" />
                <div className="container">
                    <NameInput name="Введите номер группы" />
                    <InputGroup name="М8О-308Б-21" type_input="group" my_id="for_group" />
                </div>
                <div className="container">
                    <NameInput name="Введите ФИО преподавателя" />
                    <SelectTeacher name="Иванов Иван Иванович" />
                </div>
                <div className="container">
                    <NameInput name="Введите номер аудитории" />
                    <InputGroup name="ГУК Б-304" type_input="class" my_id="for_class" />
                </div>
            </>
        )
    }
}


export default SecondPage;
