import React from 'react'
import "./input.css"

class NameInput extends React.Component {
    render() {
        return (
            <div className="name__input">{this.props.name}</div>
        )
    }
}

export default NameInput;