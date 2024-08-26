import React from 'react'
import "./selectChange.css"

class SelectChange extends React.Component {
    render() {
        return (
            <div className="container__module__change">
                <div className="print__rank">{this.props.title}</div>
                <form >
                    <select id={this.props.type} className="select__change"> </select>
                </form >
            </div>
        )
    }
}

export default SelectChange;