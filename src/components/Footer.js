import '../styles/Footer.css'
import React from 'react';
import social_icon_linkedin from '../assets/social_icon_linkedin.png'
import social_icon_github from '../assets/social_icon_github.png'
import social_icon_email from '../assets/social_icon_email.png'

import { isMobile } from 'react-device-detect';

class Footer extends React.Component{
    render() {

        var footerWrapperId = 'footer-wrapper-desktop';
        var footerIconClass = 'footer-icon-desktop';
        if (isMobile) {
            footerWrapperId = 'footer-wrapper-mobile';
            footerIconClass = 'footer-icon-mobile';
        }

        // NOTE: Because these are rendered with `float: right`, they appear here in reverse order.
        return (
            <div id={footerWrapperId}>
                <span id='footer-icon-wrapper'>
                    <a href='https://github.com/Zaaptastic/' target='_blank' rel='noopener noreferrer'>
                        <img src={social_icon_github} className={footerIconClass}></img>
                    </a>
                    <a href='https://www.linkedin.com/' target='_blank' rel='noopener noreferrer'>
                        <img src={social_icon_linkedin} className={footerIconClass}></img>
                    </a>
                    <a href='mailto: rbchen16+blog@gmail.com'>
                        <img src={social_icon_email} className={footerIconClass}></img>
                    </a>
                </span>
            </div>
        );
    }
}

export default Footer;