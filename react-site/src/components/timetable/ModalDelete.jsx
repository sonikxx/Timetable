import React from 'react'
import ClearWindow from '../module/ClearWindow'
import FillWindow from '../module/FillWindow'
import './modalDelete.css'

class ModalDelete extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickNo = this.handleClickNo.bind(this);
        this.handleClickYes = this.handleClickYes.bind(this);
    }
    handleClickYes() {
        var modalDelete = document.getElementsByClassName("modal__delete")[0];
        modalDelete.style.visibility = "hidden";
        ClearWindow();
        let id_block_real = document.getElementsByClassName("delete__yes")[0].getAttribute('id_block');
        // индекс элемента, который мы удаляем из storage
        let index = document.getElementsByClassName("delete__yes")[0].getAttribute('id_lesson_delete');
        const lesson_id = localStorage[`id_${id_block_real}_${index}`];
        fetch(`http://127.0.0.1:8000/delete_lesson/${lesson_id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        }).then(data => {
            ClearWindow();
            var id_block_real = modalDelete.getAttribute("id_block");
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
            });
            });
        });
    }
    handleClickNo() {
        var modalDelete = document.getElementsByClassName("modal__delete")[0];
        modalDelete.style.visibility = "hidden";
        var modal = document.getElementById("myModal");
        modal.style.visibility = "visible";
        modal.getElementsByClassName("button__insert")[0].style.display = "block";
    }
    render() {
        return (
            <div className="modal__delete" id_block="-1">
                <div className="modal__content__delete">
                    <div className="print">Вы действительно хотите отменить занятие?</div>
                    <button className="delete__yes" id_block="-1" onClick={this.handleClickYes}>да</button>
                    <button className="delete__no" onClick={this.handleClickNo}>нет</button>
                </div>
            </div>
        )
    }
}

export default ModalDelete;