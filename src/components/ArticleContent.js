import '../styles/ArticleContent.css'
import '../styles/TableOfContents.css'
import React from 'react';
import { useParams } from "react-router-dom";

import Loading from './Loading'
import { fetchArticleContent } from '../utils/AwsFunctions'
import { getNestedHeadings, Headings } from '../utils/TableOfContentsUtils'
import { isMobile, MobileView, BrowserView } from 'react-device-detect';
import { marked } from 'marked';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class ArticleContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: { content: '' }, isPageLoading: true }
    }

    componentDidMount() {
        var shouldHideLoadingWhenComplete = new URLSearchParams(window.location.search)
            .get('hideLoadingWhenComplete');
        var valueWhenFinishedLoading = shouldHideLoadingWhenComplete === 'true' || shouldHideLoadingWhenComplete === '1'
        fetchArticleContent(this.props.params.articleId, false)
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

        var content = this.state.data.content;

        if (!content.startsWith('<html>')) {
            content = marked.parse(content);
        }

        var articleContentTextId = 'article-content-text-desktop';
        if (isMobile) {
            articleContentTextId = 'article-content-text-mobile';
        }
        console.log(articleContentTextId);

        // We set the HTML here rather than in the jsx since we must ensure that the DOM is loaded with
        // all of the headers we are looking to render as content so that the dynamic table of contents
        // has sufficient data to populate. There's no easy hook to signal to the TOC to populate if
        // this is done disjointed.
        var articleContentTextElement = document.getElementById(articleContentTextId);
        var headings = []
        if (articleContentTextElement !== null) {
            // Dangerously set HTML, we accept this risk since content is self-controlled via publishing
            // TODO: Sanitize before doing this
            articleContentTextElement.innerHTML = content;

            headings = getNestedHeadings(document.querySelectorAll("h2, h3"));
        }

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
                    </div>}

                    <hr />
                    <div id='article-content-and-headings-wrapper'>

                        <nav>
                            <Headings headings={headings} />
                        </nav>
                        <div id={articleContentTextId} />

                    </div>
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

                    </div>}

                    <hr />
                    <div id={articleContentTextId} />
                </MobileView>


            </div>);
    }
}

export default withParams(ArticleContent);