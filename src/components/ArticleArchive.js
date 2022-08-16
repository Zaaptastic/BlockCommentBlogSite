import React from 'react';

import ArticleSummary from './ArticleSummary'
import { fetchArticleMetadata } from '../utils/AwsFunctions'


class ArticleArchive extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {data: [] }
    }

    componentDidMount() {
        fetchArticleMetadata()
            .then(response => this.setState({data: response}));
    }

    render() {
        return (
            <div>
            <h1>Articles</h1>
            {this.state.data.map(article => {
                return <div key={article.articleId.S}>
                    <ArticleSummary 
                        title={article.title.S} 
                        articleId={article.articleId.S} 
                        publicationDate={article.publicationDate.S} 
                        estimatedReadingTime={article.estimatedReadingTime.N} 
                        summary={article.summary.S} 
                        imageUrl={article.imageUrl.S}
                        tags={article.tags.L}
                    /></div>
            }

            )}
            </div>
        );
    }
}

export default ArticleArchive;