import '../styles/ArticleContent.css'
import React from 'react';
import { useParams } from "react-router-dom";

import { fetchArticleContent } from '../utils/AwsFunctions'

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class ArticleContent extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = { data: { } }
    }

    componentDidMount(){
        fetchArticleContent(this.props.params.articleId)
            .then(response => this.setState({data: response}))
            .catch(error => {
                window.location.replace('/404');
            })
    }

    render() {
        // DangerouslySet HTML, we accept this risk since content is self-controlled via publishing
        return <p dangerouslySetInnerHTML={{ __html: this.state.data.content }} />;
    }
}

export default withParams(ArticleContent);