import '../styles/ArticleArchive.css'
import React from 'react';

import ArticleSummary from './ArticleSummary'
import Loading from './Loading'
import { fetchArticleMetadata } from '../utils/AwsFunctions'
import { isMobile } from 'react-device-detect';


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
        
        // If desktop, heroArticle does not get populated, resulting in all articles rendering equivalently
        if (!isMobile) {
            heroArticle = this.state.data.shift();
            archiveWrapperId = 'article-archive-wrapper-desktop';
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

                <div id='article-history-wrapper'>
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
            </div>
        );
    }
}

export default ArticleArchive;