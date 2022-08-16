import '../styles/Header.css'
import logo from '../logo.png'
import React from 'react';
import DevoBanner from './DevoBanner'

class Header extends React.Component{
    render() {
        return (
            <div id='header-wrapper'>
                <DevoBanner />
                <div id='header'>
                    <a href='/'><img src={logo} id='logo-image'></img></a>
                    <span id='navigation'>
                        <a href='/' class='navigation-link'>Posts</a>
                        
                        <a href='/about' class='navigation-link'>About Me</a>
                    </span>
                </div>
            </div>
        );
    }
}

export default Header;