import '../styles/Footer.css'
import React from 'react';
import social_icon_linkedin from '../assets/social_icon_linkedin.png'
import social_icon_github from '../assets/social_icon_github.png'
import social_icon_email from '../assets/social_icon_email.png'

class Footer extends React.Component{
    render() {
        // NOTE: Because these are rendered with `float: right`, they appear here in reverse order.
        return (
            <div id='footer-wrapper'>
                <span id='footer-icon-wrapper'>
                    <a href='https://github.com/Zaaptastic/'>
                        <img src={social_icon_github} className='footer-icon'></img>
                    </a>
                    <a href='https://www.linkedin.com/'>
                        <img src={social_icon_linkedin} className='footer-icon'></img>
                    </a>
                    <a href='mailto: rbchen16+blog@gmail.com'>
                        <img src={social_icon_email} className='footer-icon'></img>
                    </a>
                </span>
            </div>
        );
    }
}

export default Footer;