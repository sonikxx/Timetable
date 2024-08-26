import React from 'react';
import "./input.css";
class InputGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        var my_string = event.target.value.toUpperCase();
        this.setState({ value: my_string });
    }

    handleSubmit(event) {
        var type = this.props.type_input
        if (type === "group") {
            fetch('http://127.0.0.1:8000/api/groups')
                .then(response => response.json())
                .then(data => {
                    const group = data.find(item => item[0] === this.state.value); // Find the group with the matching name
                    if (group) {
                        const user_input = this.state.value;
                        const group_id = group[1]; // Extract the id from the group
                        localStorage.setItem('user_input', user_input);
                        localStorage.setItem('object_id', group_id);
                        localStorage.setItem('type_input', 'группа');
                        window.location.href = "/timetable";
                    } else {
                                document.getElementById('for_group').value = '';
                                alert("Номер группы введен неверно");
                    }
                })
        }
        if (type === "class") {
            fetch('http://127.0.0.1:8000/api/classes')
                .then(response => response.json())
                .then(data => {
                    const classroom = data.find(item => item[0] === this.state.value);
                    if (classroom) {
                        const user_input = this.state.value;
                        const classroom_id = classroom[1];
                        localStorage.setItem('user_input', user_input);
                        localStorage.setItem('type_input', 'кабинет');
                        localStorage.setItem('object_id', classroom_id);
                        window.location.href = "/timetable";
                    } else {
                        document.getElementById('for_class').value = '';
                        alert("Номер аудитории введен неверно");
                    }
                })
        }
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} id="form">
                <input autoComplete="off" id={this.props.my_id} className="input__form" placeholder={this.props.name} maxLength="30" value={this.state.value} onChange={this.handleChange} />
                <input type="submit" className="button__input" value="отобразить" />
            </form >
        )
    }
}

export default InputGroup;