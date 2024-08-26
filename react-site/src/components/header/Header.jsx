import React from 'react'
import './header.css'
import logoImg from "../../img/logo.svg"

class Header extends React.Component {
    render() {
        return (
            <div className="container">
                <header className="header">
                    <div className="header__row">
                        <div className="header__logo">
                            <img src={logoImg} alt="logo" width="55" />
                        </div>
                        <div className="header__name">московский</div>
                        <div className="header__name">авиационный</div>
                        <div className="header__name">институт</div>
                    </div>
                </header>
            </div>
        )
    }
}

export default Header;