import React from 'react';
import { useParams } from "react-router-dom";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class ArticleContent extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {data: [] }
    }

    componentDidMount(){
        this.setState({articleId: this.props.params.articleId});  
    }

    render() {
        return (
            <div>
                <h1>This is an Article Title</h1>
                <p> articleId: {this.state.articleId} </p>
            </div>
        );
    }
}

export default withParams(ArticleContent);