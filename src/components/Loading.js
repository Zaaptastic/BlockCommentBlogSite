import '../styles/Loading.css'
import React from 'react';
import ReactLoading from 'react-loading';
import iconLarge from '../assets/icon_large.png';

class Loading extends React.Component {
    render() {
        return (
            <div id='loading-screen'>
                <div id='loading-wrapper'>
                    <img src={iconLarge} id='loading-logo' alt='Loading Image' /><ReactLoading
                        type='balls' 
                        color='#0f2938' 
                        height='8vw' width='10vw'
                        className='loading-animation' />
                </div>
            </div>
        );
    }
}

export default Loading;