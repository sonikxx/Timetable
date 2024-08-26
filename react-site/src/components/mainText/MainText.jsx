import React from 'react'
import "./mainText.css"

class MainText extends React.Component {
    render() {
        return (
            <div className="main__text" style={{ margin: this.props.m }}> Расписание</div >
        );
    }
}

export default MainText;