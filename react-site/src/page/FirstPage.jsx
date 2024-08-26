import React from 'react'
import Header from "../components/header/Header"
import MainText from "../components/mainText/MainText"
import Button from "../components/button/Button"

class FirstPage extends React.Component {
    render() {

        return (
            <>
                <Header />
                <div className="container">
                    <MainText m="90px 0px 60px 0px" />
                    <Button name="смотреть расписание" my_class="button" role="user" />
                    <Button name="войти как методист" my_class="button" role="adm" />
                </div >
            </>
        )
    }
}

export default FirstPage;
