import '../styles/Header.css'
import logo from '../assets/logo.png'
import logoDevo from '../assets/logo_devo.png'
import React from 'react';

class Header extends React.Component {
    render() {
        var shouldHideDevoBanner = new URLSearchParams(window.location.search)
            .get('hideDevoBanner');
        if ('development' === process.env.NODE_ENV
            && shouldHideDevoBanner !== '1'
            && shouldHideDevoBanner !== 'true') {
                logo = logoDevo;
        }
        return (
            <div id='header-wrapper'>
                <div id='header'>
                    <a href='/'><img src={logo} id='logo-image'></img></a>
                    <span id='navigation'>
                        <a href='/' className='navigation-link'>Posts</a>

                        <a href='/about' className='navigation-link'>About Me</a>
                    </span>
                </div>
            </div>
        );
    }
}

export default Header;