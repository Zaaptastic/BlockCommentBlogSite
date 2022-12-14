import '../styles/Header.css'
import logo from '../assets/logo.png'
import logoDevo from '../assets/logo_devo.png'
import menuIcon from '../assets/menu_icon.png'
import menuCloseIcon from '../assets/menu_close_icon.png'
import Footer from './Footer'
import React from 'react';

import { isMobile, MobileView, BrowserView } from 'react-device-detect';

class Header extends React.Component {

    render() {
        var shouldHideDevoBanner = new URLSearchParams(window.location.search)
            .get('hideDevoBanner');
        if ('development' === process.env.NODE_ENV
            && shouldHideDevoBanner !== '1'
            && shouldHideDevoBanner !== 'true') {
            logo = logoDevo;
        }

        var headerId = 'header-desktop';
        if (isMobile) {
            headerId = 'header-mobile';
        }
        return (
            <div id='header-wrapper'>
                <span id='mobile-grey-area' className='hidden-area' onClick={toggleMobileMenu} />
                <div id={headerId}>
                    <a href='/'><img src={logo} id='logo-image'></img></a>
                    <MobileView>
                        <img src={menuIcon} onClick={toggleMobileMenu} id='mobile-menu-icon' />
                        <span id='navigation-mobile' className='hidden-area'>

                            <div className='naviation-item-mobile'>
                                <img src={menuCloseIcon} onClick={toggleMobileMenu} id='mobile-menu-close-icon' />
                            </div>

                            <div className='naviation-item-mobile'>
                                <a href='/' className='navigation-link'>Posts</a>
                            </div>

                            <div className='naviation-item-mobile'>
                                <a href='/about' className='navigation-link'>About Me</a>
                            </div>

                            <div className='naviation-item-mobile'>
                                <Footer />
                            </div>


                        </span>
                    </MobileView>

                    <BrowserView>
                        <span id='navigation'>
                            <a href='/' className='navigation-link'>Posts</a>

                            <a href='/about' className='navigation-link'>About Me</a>
                        </span>
                    </BrowserView>
                </div>
            </div>
        );
    }
}

var menuIsShown = false;
function toggleMobileMenu() {
    if (menuIsShown === false) {
        document.getElementById('mobile-grey-area').classList.remove('hidden-area');
        document.getElementById('navigation-mobile').classList.remove('hidden-area');
        document.getElementById('mobile-menu-icon').src = menuCloseIcon
        menuIsShown = true;
    } else {
        document.getElementById('mobile-grey-area').classList.add('hidden-area');
        document.getElementById('navigation-mobile').classList.add('hidden-area');
        document.getElementById('mobile-menu-icon').src = menuIcon
        menuIsShown = false;
    }
};

export default Header;