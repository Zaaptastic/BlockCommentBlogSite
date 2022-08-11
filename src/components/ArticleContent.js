import React from 'react';
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";


function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class ArticleContent extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {data: [] }
    }

    componentDidMount(){
        var url = 'https://turw3xz6nvepkctdx4uknnht2y0vpyiv.lambda-url.us-east-1.on.aws/?articleId=' + this.props.params.articleId;
        if ('production' === process.env.NODE_ENV) {
            url = 'https://zpr4erjsj77gssqkzsimcnvwmm0herkv.lambda-url.us-east-1.on.aws/?articleId=' + this.props.params.articleId;
        }
        
        fetch(url)
            .then(res => res.json())
            .then(json => this.setState({data: json}));
    }

    render() {
        if (undefined === this.state.data.content) {
            return <Navigate to="/404" />;
        }
        // DangerouslySet HTML, we accept this risk since content is self-controlled via publishing
        return <p dangerouslySetInnerHTML={{ __html: this.state.data.content }} />;
    }
}

export default withParams(ArticleContent);