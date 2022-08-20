import '../styles/ErrorContent.css'
import React from 'react';

class ErrorContent extends React.Component{
    render() {
        return (
            <div id='error-container'>
                <p id='error-message'>404</p>
                <p id='error-link-container'>Get here by mistake? Report a bug <a href='https://github.com/Zaaptastic/BlockCommentBlogSite/issues' target='_blank' rel='noopener noreferrer'>here!</a></p>
            </div>
        );
    }
}

export default ErrorContent;