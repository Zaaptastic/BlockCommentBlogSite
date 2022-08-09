import React from 'react';
import { fetchMetadata } from '../utils/AwsFunctions';


class ArticleArchive extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        var data = fetchMetadata();

        return (
            <>
            </>
        );
    }
}

export default ArticleArchive;