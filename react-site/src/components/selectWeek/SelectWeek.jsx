import React from 'react'
import SendWeek from "./SendWeek.jsx"
import "./selectWeek.css"

class SelectWeek extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
         fetch('http://127.0.0.1:8000/api/weeks')
        .then(response => response.json())
        .then(data => {
            const week = data[event.target.value];
            localStorage.setItem('week', week);
            const first_day = week.split(" ")[0];
            const last_day = week.split(" ")[2];

            const convertDate = (date) => {
                const [day, month, year] = date.split(".");
                return `20${year}-${month}-${day}`;
            }
            console.log(first_day);
            console.log(last_day);
            localStorage.setItem('first_day', convertDate(first_day));
            localStorage.setItem('last_day', convertDate(last_day));
            const titles = document.getElementsByClassName("title");
            var parts = first_day.split(".");
            var dt = new Date(parseInt(parts[2], 10) + 2000, parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
            for (let i = 0; i < titles.length; ++i) {
                const days = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"]
                const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
                titles[i].innerHTML = days[dt.getDay()] + ", " + dt.getDate() + " " + months[dt.getMonth()];
                dt.setDate(dt.getDate() + 1);
            }
            const modules = document.getElementsByClassName("block");
         let url = '';
         let url_id = '';
         if(localStorage['type_input'] === 'преподаватель') {
            const teacher_id = localStorage['object_id'];
            const start_date = localStorage['first_day'];
            const end_date = localStorage['last_day'];
            url = `http://127.0.0.1:8000/lessons/teacher/${teacher_id}/${start_date}/${end_date}`;
            url_id = `http://127.0.0.1:8000/lessons/teacher/id/${teacher_id}/${start_date}/${end_date}`;
        } else if(localStorage['type_input'] === 'кабинет') {
            const classroom_id = localStorage['object_id'];
            const start_date = localStorage['first_day'];
            const end_date = localStorage['last_day'];
            url = `http://127.0.0.1:8000/lessons/classroom/${classroom_id}/${start_date}/${end_date}`;
            url_id = `http://127.0.0.1:8000/lessons/classroom/id/${classroom_id}/${start_date}/${end_date}`;
        } else if(localStorage['type_input'] === 'группа') {
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
            });
         fetch(url_id)
            .then(response => response.json())
            .then(data => {
                 for (let i = 0; i < modules.length; ++i) {
                    var names = modules[i].getElementsByClassName("name__lesson");
                    for (let j = 0; j < names.length; ++j) {
                        localStorage.setItem(`id_${i}_${j}`, data[i][j]);
                    }
                }
            });
        });
            }
    render() {
        return (
            <div className="container">
                <SendWeek />
                <form>
                    <select className="select__week" onChange={this.handleChange}> </select>
                </form >
            </div>
        );
    }
}

export default SelectWeek;