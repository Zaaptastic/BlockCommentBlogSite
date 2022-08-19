import '../styles/ArticleContent.css'
import React from 'react';
import { useParams } from "react-router-dom";

import ArticleSummary from './ArticleSummary'
import { fetchArticleContent } from '../utils/AwsFunctions'

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class ArticleContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: {} }
    }

    componentDidMount() {
        fetchArticleContent(this.props.params.articleId)
            .then(response => this.setState({ data: response }))
            .catch(error => {
                window.location.replace('/404');
            })
    }

    render() {
        var localizedDate = '';
        var parsedTags = [];
        var articleMetadata = this.state.data.metadata;

        if (articleMetadata !== undefined) {
            localizedDate = new Date(articleMetadata.publicationDate.S)
                .toLocaleDateString('en-US', { dateStyle: 'long' });
    
            for (let i = 0; i < articleMetadata.tags.L.length; i++) {
                parsedTags.push(articleMetadata.tags.L[i].S);
            }
            parsedTags.sort();
        }

        // DangerouslySet HTML, we accept this risk since content is self-controlled via publishing
        return (
            <div id='article-content-wrapper'>
                {articleMetadata !== undefined && <div id='article-metadata-wrapper'>
                    <div id='article-metadata-info'>
                        <p id='article-metadata-date'>{localizedDate}</p>
                        <h1 id='article-metadata-title'>{articleMetadata.title.S}</h1>
                        <p id='article-metadata-reading-time'>{articleMetadata.estimatedReadingTime.N} minute read</p>
                        <p id='article-metadatae-summary'>{articleMetadata.summary.S}</p>
                        {parsedTags.map(tag => {
                            return <span className='article-metadata-tag' key={tag}>{tag}</span>
                        })}
                    </div>
                    <div id='article-metadata-image-wrapper'>
                        <img src={articleMetadata.imageUrlSmall.S} alt={articleMetadata.title.S} id='article-metadata-image' />
                    </div>
                </div>
                }

                <hr />

                <p id ='article-content-text' dangerouslySetInnerHTML={{ __html: this.state.data.content }} />
            </div>);
    }
}

export default withParams(ArticleContent);