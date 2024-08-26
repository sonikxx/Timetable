import React from 'react'
import "./selectTeacher.css"
import SendTeacher from "./SendTeacher.jsx"

class SelectTeacher extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: 0 };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        fetch('http://127.0.0.1:8000/api/teachers')
        .then(response => response.json())
        .then(data => {
            const teacher = data[this.state.value] // Find the teacher with the matching name
            if (teacher || this.state.value === 0) {
                const user_input = teacher[0];
                const teacher_id = teacher[1]; // Extract the id from the teacher
                console.log(teacher_id);
                localStorage.setItem('user_input', user_input);
                localStorage.setItem('type_input', 'преподаватель');
                localStorage.setItem('object_id', teacher_id);
                window.location.href = "/timetable";
            } else {
                alert("Выберите преподавателя");
            }
        })
        event.preventDefault();
    }
    render() {
        return (
            <>
                <SendTeacher />
                <form onSubmit={this.handleSubmit}>
                    <select className="select" onChange={this.handleChange}> </select>
                    <input type="submit" className="button__input" value="отобразить" />
                </form >
            </>
        )
    }
}

export default SelectTeacher;