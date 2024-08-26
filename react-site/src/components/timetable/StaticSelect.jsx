import React from 'react'
import "./selectChange.css"

class StaticSelect extends React.Component {
    render() {
        return (
            <div className="container__module__change">
                <div className="print__rank">{this.props.title}</div>
                <div className="static__select"></div>
            </div>
        )
    }
}

export default StaticSelect;