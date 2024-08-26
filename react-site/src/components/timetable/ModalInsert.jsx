import React from 'react'
import ClearWindow from '../module/ClearWindow'
import FillWindow from '../module/FillWindow'
import './modalinsert.css'
import SelectChange from './SelectChange'

class ModalInsert extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickNo = this.handleClickNo.bind(this);
        this.handleClickYes = this.handleClickYes.bind(this);
    }

    handleClickYes() {
        var modalChange = document.getElementsByClassName("modal__change")[0];
        var modalInsert = document.getElementsByClassName("modal__insert")[0];
        var selects = modalInsert.getElementsByTagName("select");
        // localStorage.setItem('change_day', modalChange.getAttribute("id_block"));
        let date = new Date(localStorage['first_day']);  // Создаем объект Date из строки даты
        date.setDate(date.getDate() + Number(modalChange.getAttribute("id_block")));  // Сдвигаем дату
        let newDate = date.toISOString().split('T')[0];
        console.log(newDate);
        let type;
        switch (+selects[1].value) {
            case 0:
                type = 'lecture';
                break;
            case 1:
                type = 'laboratory';
                break;
            case 2:
                type = 'seminar';
                break;
            default:
                type = 'lecture';  // Значение по умолчанию
        }
        console.log(selects[4].value);
        fetch(`http://127.0.0.1:8000/get_learn_day_id/${newDate}`)
            .then(response => response.json())
            .then(data => {
                let lesson = {
                    date_id: data['learn_day_id'],      // Замените на соответствующие значения
                    teacher_id: selects[3].value,   // Замените на соответствующие значения
                    subject_id: selects[0].value,   // Замените на соответствующие значения
                    class_id: selects[5].value,     // Замените на соответствующие значения
                    number: (+selects[4].value + 1).toString(),       // Замените на соответствующие значения
                    type: type,  // Замените на соответствующие значения
                    group_id: selects[2].value
                };
                console.log(lesson);
                return lesson;
            }).then(lesson => {
            fetch('http://127.0.0.1:8000/create_lesson/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(lesson),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    return 1;
                }).then(response_status => {

                if (response_status === 1) {
                    ClearWindow();
                    var modal = document.getElementsByClassName("modal__change")[0];
                    var id_block_real = modal.getAttribute("id_block");
                    const modules = document.getElementsByClassName("block");
                    let url = '';
                    let url_id = '';
                    if (localStorage['type_input'] === 'преподаватель') {
                        const teacher_id = localStorage['object_id'];
                        const start_date = localStorage['first_day'];
                        const end_date = localStorage['last_day'];
                        url = `http://127.0.0.1:8000/lessons/teacher/${teacher_id}/${start_date}/${end_date}`;
                        url_id = `http://127.0.0.1:8000/lessons/teacher/id/${teacher_id}/${start_date}/${end_date}`;
                    } else if (localStorage['type_input'] === 'кабинет') {
                        const classroom_id = localStorage['object_id'];
                        const start_date = localStorage['first_day'];
                        const end_date = localStorage['last_day'];
                        url = `http://127.0.0.1:8000/lessons/classroom/${classroom_id}/${start_date}/${end_date}`;
                        url_id = `http://127.0.0.1:8000/lessons/classroom/id/${classroom_id}/${start_date}/${end_date}`;
                    } else if (localStorage['type_input'] === 'группа') {
                        const group_id = localStorage['object_id'];
                        const start_date = localStorage['first_day'];
                        const end_date = localStorage['last_day'];
                        url = `http://127.0.0.1:8000/lessons/group/${group_id}/${start_date}/${end_date}`;
                        url_id = `http://127.0.0.1:8000/lessons/group/id/${group_id}/${start_date}/${end_date}`;
                    }

                    fetch(url)
                        .then(response => response.json())
                        .then(data => {
                            for (let i = 0; i < modules.length; ++i) {
                                var names = modules[i].getElementsByClassName("name__lesson");
                                for (let j = 0; j < names.length; ++j) {
                                    names[j].innerHTML = data[i][j];
                                }
                            }
                        }).then(data => {
                        fetch(url_id)
                            .then(response => response.json())
                            .then(data => {
                                for (let i = 0; i < modules.length; ++i) {
                                    var names = modules[i].getElementsByClassName("name__lesson");
                                    for (let j = 0; j < names.length; ++j) {
                                        localStorage.setItem(`id_${i}_${j}`, data[i][j]);
                                    }
                                }
                            }).then(data => {
                            FillWindow(id_block_real);
                        }).then(data => {

                                modal = document.getElementById("myModal");
                                modal.style.visibility = "visible";
                                const id_block_real = modalChange.getAttribute("id_block");
                                if (localStorage.getItem('role') === 'adm') {
                                    modal.getElementsByClassName("button__insert")[0].style.display = "block";
                                    let buttons = modal.getElementsByClassName("two__button")
                                    let counter = 0;
                                    for (let i = 0; i < buttons.length; ++i) {
                                        console.log(id_block_real);
                                        if (localStorage[`id_${id_block_real}_${i}`] !== "null") {
                                            buttons[i - counter].style.display = "block";
                                        } else {
                                            ++counter;
                                        }
                                    }
                                }
                                modalInsert.style.visibility = "hidden";
                            }
                        );
                    });
                } else {
                    alert("Данное время или аудитория уже заняты :(");
                }
            });
        });

    }

    handleClickNo() {
        var modalDelete = document.getElementsByClassName("modal__insert")[0];
        modalDelete.style.visibility = "hidden";
        var modal = document.getElementById("myModal");
        modal.style.visibility = "visible";
        modal.getElementsByClassName("button__insert")[0].style.display = "block";
    }

    render() {
        return (
            <div className="modal__insert">
                <div className="modal__content__insert">
                    <SelectChange type="name" title="Название"/>
                    <SelectChange type="type" title="Тип"/>
                    <SelectChange type="group" title="Группа"/>
                    <SelectChange type="teacher" title="Преподаватель"/>
                    <SelectChange type="time_insert" title="Время"/>
                    <SelectChange type="class_insert" title="Аудитория"/>
                    <button type="submit" className="change__yes" id_block="-1"
                            onClick={this.handleClickYes}>сохранить
                    </button>
                    <button className="change__no" onClick={this.handleClickNo}>не применять</button>
                </div>
            </div>
        )
    }
}

export default ModalInsert;