import React from 'react';

import ArticleSummary from './ArticleSummary'


class ArticleArchive extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {data: [] }
    }

    componentDidMount() {
        var url = 'https://4jb6hw5c6spqawgfexwpkyhjxy0rbimf.lambda-url.us-east-1.on.aws/';
        if ('production' === process.env.NODE_ENV) {
            url = 'https://jvnqmq63tuabrbtvppst2r2zkq0ezmbs.lambda-url.us-east-1.on.aws/';
        }

        fetch(url)
            .then(res => res.json())
            .then(json => this.setState({data: json}));
    }

    render() {
        return (
            <div>
            <h1>Articles</h1>

            {this.state.data.map(article => {
                return <ArticleSummary 
                    title={article.title.S} 
                    articleId={article.articleId.S} 
                    publicationDate={article.publicationDate.S} 
                    estimatedReadingTime={article.estimatedReadingTime.N} 
                    summary={article.summary.S} 
                    />
            }

            )}
            </div>
        );
    }
}

export default ArticleArchive;