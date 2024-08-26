import React from 'react'
import './buttonInsert.css'
import { my_storage } from '../../storage/storage.js'


var flag = true;
class ButtonInsert extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        var modal = document.getElementById("myModal");
        modal.getElementsByClassName("button__insert")[0].style.display = "none";
        modal.style.visibility = "hidden";
        var modal_insert = document.getElementsByClassName("modal__insert")[0];
        modal_insert.style.visibility = "visible";
        if (flag === true) {
            fetch('http://127.0.0.1:8000/api/subjects')
                .then(response => response.json())
                .then(data => {
                     const select = document.getElementById("name");
                     data.forEach(function (item) {
                        var option = document.createElement("option");
                        option.value = item[1];  // id предмета
                        option.innerHTML = item[0];  // название предмета
                        select.appendChild(option);
                    });
                });
            const select_type = document.getElementById("type");
            my_storage.type.forEach(function (v, k) {
                var option = document.createElement("option");
                option.value = k;
                option.innerHTML = v;
                select_type.appendChild(option);
            });
            fetch('http://127.0.0.1:8000/api/groups')
                .then(response => response.json())
                .then(data => {
                    const select = document.getElementById("group");
                    data.forEach(function (item) {
                        var option = document.createElement("option");
                        option.value = item[1];  // id предмета
                        option.innerHTML = item[0];  // название предмета
                        select.appendChild(option);
                    });
                });
            fetch('http://127.0.0.1:8000/api/teachers')
                .then(response => response.json())
                .then(data => {
                    const select = document.getElementById("teacher");
                    data.forEach(function (item) {
                        var option = document.createElement("option");
                        option.value = item[1];  // id предмета
                        option.innerHTML = item[0];  // название предмета
                        select.appendChild(option);
                    });
                });
            const select_time = document.getElementById("time_insert");
            my_storage.time.forEach(function (v, k) {
                var option = document.createElement("option");
                option.value = k;
                option.innerHTML = v;
                select_time.appendChild(option);
            });
            fetch('http://127.0.0.1:8000/api/classes')
                .then(response => response.json())
                .then(data => {
                    const select = document.getElementById("class_insert");
                    data.forEach(function (item) {
                        var option = document.createElement("option");
                        option.value = item[1];  // id предмета
                        option.innerHTML = item[0];  // название предмета
                        select.appendChild(option);
                    });
                });
            flag = false;
        }
    }

    render() {
        return (
            <div className="container">
                <button className="button__insert" onClick={this.handleClick}>добавить</button>
            </div>
        )
    }
}

export default ButtonInsert;