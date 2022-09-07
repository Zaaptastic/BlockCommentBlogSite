import '../styles/ArticleContent.css'
import '../styles/TableOfContents.css'
import 'highlight.js/styles/atom-one-light.css'
import React from 'react';
import Loading from './Loading'

import { useParams } from 'react-router-dom';
import { fetchArticleContent } from '../utils/AwsFunctions'
import { getNestedHeadings, Headings } from '../utils/TableOfContentsUtils'
import { isMobile, MobileView, BrowserView } from 'react-device-detect';
import { marked } from 'marked';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}
const highlighter = require('highlight.js');

marked.setOptions({
    highlight: function (code) {
        return highlighter.highlightAuto(code)
            .value;
    }
});

class ArticleContent extends React.Component {

    // Global headings values to avoid setting to state and triggering a re-render
    allHeadings = new Map();

    constructor(props) {
        super(props);
        this.state = { data: { content: '' }, isPageLoading: true, activeHeadingId: '' }
    }

    componentDidMount() {
        var shouldHideLoadingWhenComplete = new URLSearchParams(window.location.search)
            .get('hideLoadingWhenComplete');
        var valueWhenFinishedLoading = shouldHideLoadingWhenComplete === 'true' || shouldHideLoadingWhenComplete === '1'
        fetchArticleContent(this.props.params.articleId, false)
            .then(response => this.setState({ data: response, isPageLoading: valueWhenFinishedLoading, activeHeadingId: '' }))
            .catch(error => {
                window.location.replace('/404');
                console.log(error);
            });

        this.componentDidUpdate();
    }

    componentDidUpdate() {
        const callback = (headings) => {
            // `headings` will include all changed headings from a scroll event (including the entire set on first load.)
            // We need to go through each and update the corresponding value in the global set.
            headings.forEach(headingElement => {
                var headingElementId = headingElement.target.id;
                var isHeadingElementIntersecting = headingElement.isIntersecting;
                this.allHeadings.set(headingElementId, isHeadingElementIntersecting);
            });
            // After updating the status of all headings, find the first one that's intersecting and consider it 'active'.
            // If no headings are intersecting, consider whatever is currently active to continue being the active heading.
            var foundActiveHeadingInCurrentIntersectionUpdate = false;
            this.allHeadings.forEach((isHeadingElementIntersecting, headingElementId) => {
                if (!foundActiveHeadingInCurrentIntersectionUpdate && isHeadingElementIntersecting) {
                    // Avoid recursive calls to componentDidUpdate when the active heading is not changing
                    if (this.state.activeHeadingId !== headingElementId) {
                        this.setState({ activeHeadingId: headingElementId });
                    }
                    foundActiveHeadingInCurrentIntersectionUpdate = true;
                }
            });
        };

        const observer = new IntersectionObserver(callback, {
            // Consider bottom portion of page to be "unactive"
            rootMargin: "0px 0px -30% 0px"
        });

        // Update to include h3 if support is needed.
        const headingElements = Array.from(document.querySelectorAll("h2"));

        headingElements.forEach((element) => observer.observe(element));

        return () => observer.disconnect();
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

            // Re-enable h3 support if needed
            headings = getNestedHeadings(document.querySelectorAll("h2"));
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
                            <p id='article-metadata-tags'>
                                {parsedTags.map(tag => {
                                    return <span className='article-metadata-tag-desktop' key={tag}>{tag}</span>
                                })}
                            </p>
                        </div>
                        <div id='article-metadata-image-wrapper'>
                            <img src={articleMetadata.imageUrlSmall.S} alt={articleMetadata.title.S} id='article-metadata-image' />
                        </div>
                    </div>}

                    <hr />
                    <div id='article-content-and-headings-wrapper'>

                        <nav>
                            <Headings headings={headings} activeHeadingId={this.state.activeHeadingId} />
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