import '../styles/ArticleContent.css'
import React from 'react';
import { useParams } from "react-router-dom";

import Loading from './Loading'
import { fetchArticleContent } from '../utils/AwsFunctions'
import { isMobile, MobileView, BrowserView } from 'react-device-detect';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class ArticleContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: {}, isPageLoading: true }
    }

    componentDidMount() {
        var shouldHideLoadingWhenComplete = new URLSearchParams(window.location.search)
            .get('hideLoadingWhenComplete');
        var valueWhenFinishedLoading = shouldHideLoadingWhenComplete === 'true' || shouldHideLoadingWhenComplete === '1'

        fetchArticleContent(this.props.params.articleId)
            .then(response => this.setState({ data: response, isPageLoading: valueWhenFinishedLoading }))
            .catch(error => {
                window.location.replace('/404');
                console.log(error);
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

        var articleContentWrapperId = 'article-content-wrapper-desktop';
        if (isMobile) {
            articleContentWrapperId = 'article-content-wrapper-mobile';
        }

        // DangerouslySet HTML, we accept this risk since content is self-controlled via publishing
        return (
            <div id={articleContentWrapperId}>
                {this.state.isPageLoading === true && <Loading />}

                <BrowserView>
                    {articleMetadata !== undefined && <div id='article-metadata-wrapper-desktop'>
                        <div id='article-metadata-info-desktop'>
                            <p id='article-metadata-date'>{localizedDate}</p>
                            <h1 id='article-metadata-title'>{articleMetadata.title.S}</h1>
                            <p id='article-metadata-reading-time'>{articleMetadata.estimatedReadingTime.N} minute read</p>
                            <p id='article-metadatae-summary'>{articleMetadata.summary.S}</p>
                            {parsedTags.map(tag => {
                                return <span className='article-metadata-tag-desktop' key={tag}>{tag}</span>
                            })}
                        </div>
                        <div id='article-metadata-image-wrapper'>
                            <img src={articleMetadata.imageUrlSmall.S} alt={articleMetadata.title.S} id='article-metadata-image' />
                        </div>
                    </div>
                    }

                    <hr />
    
                    <p id ='article-content-text-desktop' dangerouslySetInnerHTML={{ __html: this.state.data.content }} />
                </BrowserView>

                <MobileView>
                    {articleMetadata !== undefined && <div id='article-metadata-wrapper-mobile'>
                            <div id='article-metadata-info-mobile'>
                                <p id='article-metadata-date'>{localizedDate}</p>
                                <h1 id='article-metadata-title'>{articleMetadata.title.S}</h1>
                                <p id='article-metadata-reading-time'>{articleMetadata.estimatedReadingTime.N} minute read</p>
                                <img src={articleMetadata.imageUrlSmall.S} alt={articleMetadata.title.S} id='article-metadata-image' />

                                <p id='article-metadatae-summary'>{articleMetadata.summary.S}</p>
                                {parsedTags.map(tag => {
                                    return <span className='article-metadata-tag-mobile' key={tag}>{tag}</span>
                                })}
                            </div>

                        </div>
                        }

                        <hr />
        
                        <p id ='article-content-text-mobile' dangerouslySetInnerHTML={{ __html: this.state.data.content }} />
                    </MobileView>
            </div>);
    }
}

export default withParams(ArticleContent);