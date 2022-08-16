import React from 'react';
import { useSearchParams } from "react-router-dom";

class DevoBanner extends React.Component{
    
    render() {
        var shouldHideDevoBanner = new URLSearchParams(window.location.search)
                    .get('hideDevoBanner');

        if ('development' === process.env.NODE_ENV 
                && shouldHideDevoBanner != 1 
                && shouldHideDevoBanner != 'true' ) {
            return (<div id='devo-banner'>
                DEVO ENVIRONMENT
                <br /><br />
            </div>);
        }
        return (<div />);
    }
}

export default DevoBanner;