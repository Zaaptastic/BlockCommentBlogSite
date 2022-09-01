import '../styles/ArticleArchive.css'
import React from 'react';

import ArticleSummary from './ArticleSummary'
import Loading from './Loading'
import { fetchArticleMetadata } from '../utils/AwsFunctions'
import { isMobile, BrowserView, MobileView } from 'react-device-detect';


class ArticleArchive extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: [], isPageLoading: true }
    }

    componentDidMount() {
        var shouldHideLoadingWhenComplete = new URLSearchParams(window.location.search)
            .get('hideLoadingWhenComplete');
        var valueWhenFinishedLoading = shouldHideLoadingWhenComplete === 'true' || shouldHideLoadingWhenComplete === '1'
        fetchArticleMetadata()
            .then(response => this.setState({ data: response, isPageLoading: valueWhenFinishedLoading }));
    }

    render() {
        var articles = this.state.data;
        var heroArticle = undefined;
        var archiveWrapperId = 'article-archive-wrapper-mobile';

        // Only used on Desktop View for Grid Layout
        var columnCount = 3;
        var articleRows = [];

        // If desktop, heroArticle does not get populated, resulting in all articles rendering equivalently
        if (!isMobile) {
            var archiveWrapperId = 'article-archive-wrapper-desktop';
            heroArticle = articles.shift();
            
            for (let index = 0; index < articles.length; index++) {
                var rowNumber = Math.floor(index/columnCount);
                if (articleRows[rowNumber] === undefined) {
                    articleRows[rowNumber] = [];
                }
                articleRows[rowNumber].push(articles[index]);
            }
        }

        return (
            <div id={archiveWrapperId} >
                {this.state.isPageLoading === true && <Loading />}

                {heroArticle !== undefined && <div id='hero-article-wrapper'>
                    <ArticleSummary
                        title={heroArticle.title.S}
                        articleId={heroArticle.articleId.S}
                        publicationDate={heroArticle.publicationDate.S}
                        estimatedReadingTime={heroArticle.estimatedReadingTime.N}
                        summary={heroArticle.summary.S}
                        imageUrl={heroArticle.imageUrl.S}
                        tags={heroArticle.tags.L}
                        isHero={true}
                    />
                </div>
                }

                <MobileView>
                    <div id='article-history-wrapper-mobile'>
                        {articles.map(article => {
                            return <div key={article.articleId.S}>
                                <ArticleSummary
                                    title={article.title.S}
                                    articleId={article.articleId.S}
                                    publicationDate={article.publicationDate.S}
                                    estimatedReadingTime={article.estimatedReadingTime.N}
                                    summary={article.summary.S}
                                    imageUrl={article.imageUrlSmall.S}
                                    tags={article.tags.L}
                                /></div>
                        })}
                    </div>
                </MobileView>

                <BrowserView>
                    <div id='article-history-wrapper-desktop'>
                    {articleRows.map(articleRow => {
                            return <div key={articleRow} className='article-history-row'>
                                {articleRow.map(article => {
                                    return <div key={article.articleId.S}>
                                    <ArticleSummary
                                        title={article.title.S}
                                        articleId={article.articleId.S}
                                        publicationDate={article.publicationDate.S}
                                        estimatedReadingTime={article.estimatedReadingTime.N}
                                        summary={article.summary.S}
                                        imageUrl={article.imageUrlSmall.S}
                                        tags={article.tags.L}
                                    /></div>
                                })}</div>
                        })}
                    </div>
                </BrowserView>
            </div>
        );
    }
}

export default ArticleArchive;