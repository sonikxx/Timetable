import React from 'react';
import { Link } from "react-router-dom";
import "./button.css";

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        const role = this.props.role;
        if (role === "adm" || role === "user")
            localStorage.setItem('role', role);
        event.preventDefault();
        window.location.href = "/second";
    }
    render() {
        return (
            <div className="wrapper__button" >
                <Link className={this.props.my_class} onClick={this.handleClick}>{this.props.name}</Link>
            </div >
        )
    }
}

export default Button;