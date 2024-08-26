import React from 'react'
import './oneLesson.css'
import Change from "../../img/change.png"
import Delete from "../../img/delete.png"
import { my_storage } from '../../storage/storage.js'

var flag = true;
class OneLesson extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickDelete = this.handleClickDelete.bind(this);
        this.handleClickChange = this.handleClickChange.bind(this);
    }
    handleClickChange(event) {
            var modal = document.getElementById("myModal");
            modal.getElementsByClassName("button__insert")[0].style.display = "none";
            modal.style.visibility = "hidden";
            var modalChange = document.getElementsByClassName("modal__change")[0];
            modalChange.style.visibility = "visible";
            var array = document.getElementsByClassName("static__select");
            var day_index = modalChange.getAttribute("id_block");
            var lesson_index = event.target.getAttribute('id_lesson_change');
            const lesson_id = localStorage[`id_${day_index}_${lesson_index}`];
            fetch(`http://127.0.0.1:8000/lessons/${lesson_id}`)
            .then(response => response.json())
            .then(data => {
                modalChange.setAttribute('id_lesson_change', lesson_index)
                array[0].innerHTML = data['subject'];
                array[1].innerHTML = data['lesson_type'];
                array[2].innerHTML = data['group'];
                array[3].innerHTML = data['teacher'];
                if (flag === true) {
                    let select = document.getElementById("time");
                    my_storage.time.forEach(function (v, k) {
                        var option = document.createElement("option");
                        option.value = k;
                        option.innerHTML = v;
                        select.appendChild(option);
                    });
                    let select_two = document.getElementById("class");
                    fetch('http://127.0.0.1:8000/api/classes')
                        .then(response => response.json())
                        .then(data => {
                            data.forEach(function (item) {
                                var option = document.createElement("option");
                                option.value = item[1];
                                option.innerHTML = item[0];
                                select_two.appendChild(option);
                            });
                            flag = false;
                        });
                }
            });
    }
    handleClickDelete(event) {
        var modal = document.getElementById("myModal");
        modal.getElementsByClassName("button__insert")[0].style.display = "none";
        modal.style.visibility = "hidden";
        var modalDelete = document.getElementsByClassName("modal__delete")[0];
        modalDelete.style.visibility = "visible";
        document.getElementsByClassName("delete__yes")[0].setAttribute('id_lesson_delete', event.target.getAttribute('id_lesson_delete'));
    }
    render() {
        return (
            <div className="one__lesson" >
                <div className="hight__line">
                    <div className="table"></div>
                    <div className="type__lesson"></div>
                    <div className="two__button">
                        <button className="change__lesson" onClick={this.handleClickChange}><img className="picture__change" src={Change} alt="change" width="20px"></img></button>
                        <button className="delete__lesson" onClick={this.handleClickDelete}><img className="picture__delete" src={Delete} alt="delete" width="20px"></img></button>
                    </div>
                </div>
                <div className="lower__line"></div>
            </div>
        )
    }
}

export default OneLesson;