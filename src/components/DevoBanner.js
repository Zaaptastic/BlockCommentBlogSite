import React from 'react';

class DevoBanner extends React.Component{
    render() {
        if ('development' === process.env.NODE_ENV) {
            return (<div id='devo-banner'>
                DEVO ENVIRONMENT
                <br /><br />
            </div>);
        }
        return (<div />);
    }
}

export default DevoBanner;