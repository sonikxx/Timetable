import React from 'react'
import ClearWindow from '../module/ClearWindow'
import FillWindow from '../module/FillWindow'
import './modalChange.css'
import SelectChange from './SelectChange'
import StaticSelect from './StaticSelect'

class ModalChange extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickNo = this.handleClickNo.bind(this);
        this.handleClickYes = this.handleClickYes.bind(this);
    }

    handleClickYes() {
        var modalChange = document.getElementsByClassName("modal__change")[0];
        var selects = modalChange.getElementsByTagName("select");
        const classroom_id = selects[1].value;
        const new_number = +selects[0].value + 1;
        const lesson_id = localStorage[`id_${modalChange.getAttribute("id_block")}_${modalChange.getAttribute("id_lesson_change")}`];
        let response_status = 1;
        if (lesson_id !== "null") {
            fetch(`http://127.0.0.1:8000/update_lesson/${lesson_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    class_id: classroom_id,
                    number: new_number
                }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    response_status = 0;
                }).then(data => {
                if (response_status === 1) {
                    ClearWindow();

                    var id_block_real = modalChange.getAttribute("id_block");
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
                            var modal = document.getElementById("myModal");
                            modal.style.visibility = "visible";
                            if (localStorage.getItem('role') === 'adm') {
                                modal.getElementsByClassName("button__insert")[0].style.display = "block";
                                let buttons = modal.getElementsByClassName("two__button")
                                let counter = 0;
                                for (let i = 0; i < buttons.length; ++i) {
                                    if (localStorage[`id_${id_block_real}_${i}`] !== "null") {
                                        buttons[i - counter].style.display = "block";
                                    } else {
                                        ++counter;
                                    }
                                }
                            }
                            modalChange.style.visibility = "hidden";
                        })
                    });
                } else {
                    alert("Данное время или аудитория уже заняты :(");
                }
            });
        } else {
            response_status = 0;
        }
        //здесь запрос в БД на изменение (можно или нет)
        // ответ от базы данных 1 при успехе (0 при ошибке)

    }

    handleClickNo() {
        var modalDelete = document.getElementsByClassName("modal__change")[0];
        modalDelete.style.visibility = "hidden";
        var modal = document.getElementById("myModal");
        modal.style.visibility = "visible";
        modal.getElementsByClassName("button__insert")[0].style.display = "block";
    }

    render() {
        return (
            <div className="modal__change">
                <div className="modal__content__change">
                    <StaticSelect type="name" title="Название"/>
                    <StaticSelect type="type" title="Тип"/>
                    <StaticSelect type="group" title="Группа"/>
                    <StaticSelect type="teacher" title="Преподаватель"/>
                    <SelectChange type="time" title="Время"/>
                    <SelectChange type="class" title="Аудитория"/>
                    <button type="submit" className="change__yes" id_block="-1"
                            onClick={this.handleClickYes}>сохранить
                    </button>
                    <button className="change__no" onClick={this.handleClickNo}>не применять</button>
                </div>
            </div>
        )
    }
}

export default ModalChange;