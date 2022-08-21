import '../styles/ArticleArchive.css'
import React from 'react';

import ArticleSummary from './ArticleSummary'
import Loading from './Loading'
import { fetchArticleMetadata } from '../utils/AwsFunctions'


class ArticleArchive extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: [], isPageLoading: true }
    }

    componentDidMount() {
        var shouldHideDevoBanner = new URLSearchParams(window.location.search)
            .get('hideLoadingWhenComplete');
        var valueWhenFinishedLoading = shouldHideDevoBanner === 'true' || shouldHideDevoBanner === '1'
        fetchArticleMetadata()
            .then(response => this.setState({ data: response, isPageLoading: valueWhenFinishedLoading }));
    }

    render() {
        var articles = this.state.data;
        var heroArticle = this.state.data.shift();
        
        return (
            <div id='article-archive-wrapper'>
                {this.state.isPageLoading === true && <Loading />}
                <div id='hero-article-wrapper'>
                    {heroArticle !== undefined &&
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
                    }
                </div>

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