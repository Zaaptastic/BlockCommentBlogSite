import '../styles/ArticleSummary.css'
import React from 'react';

import { isMobile } from 'react-device-detect';

class ArticleSummary extends React.Component{
    render() {
        var url = "/posts/" + this.props.articleId;
        var localizedDate = new Date(this.props.publicationDate)
            .toLocaleDateString('en-US', { dateStyle: 'long' });

        var parsedTags = [];
        for (let i = 0; i < this.props.tags.length; i++) {
            parsedTags.push(this.props.tags[i].S);
        }
        parsedTags.sort();

        if (this.props.isHero === true) {
            // Note: should not be rendered on Mobile, see gating in ArticleArchive
            return (
                <div id='hero-article-summary-wrapper'>
                    <div id='hero-article-info'>
                        <p id='hero-article-date'>{localizedDate}</p>
                        <h1 id='hero-article-title'><a href={url}>{this.props.title}</a></h1>
                        <p id='hero-article-reading-time'>{this.props.estimatedReadingTime} minute read</p>
                        <p id='hero-article-summary'>{this.props.summary}</p>
                        {parsedTags.map(tag => {
                            return <span className='hero-article-tag' key={tag}>{tag}</span>
                        })}
                    </div>
                    <div id='hero-article-image-wrapper'>
                    <a href={url}><img src={this.props.imageUrl} alt={this.props.title} id='hero-article-image' /></a>
                    </div>
                </div>
            );
        } else {
            if (isMobile) {
                return (
                    <div id='standard-article-summary-wrapper-mobile' className='article-summary'>
                        <p id='standard-article-date-time'>{localizedDate}</p>
                        <h2 id='standard-article-title'><a href={url}>{this.props.title}</a></h2>
                        <p id='standard-article-date-time'> {this.props.estimatedReadingTime} minute read</p>
                        <a href={url}>
                            <img src={this.props.imageUrl} alt={this.props.title} id='standard-article-image-mobile' />
                        </a>
                        <p id='standard-article-summary'>{this.props.summary}</p>
                        {parsedTags.map(tag => {
                            return <span className='mobile-article-tag' key={tag}>{tag}</span>
                        })}
                    </div>
                );
            } else {
                return (
                    <div id='standard-article-summary-wrapper-desktop' className='article-summary'>
                        <div id='standard-article-image-wrapper-desktop'>
                            <a href={url}>
                                <img src={this.props.imageUrl} alt={this.props.title} id='standard-article-image-desktop' />
                            </a>
                        </div>
                        <h2 id='standard-article-title'><a href={url}>{this.props.title}</a></h2>
                        <p id='standard-article-date-time'>{localizedDate} • {this.props.estimatedReadingTime} minute read</p>
                        <p id='standard-article-summary'>{this.props.summary}</p>
                    </div>
                );
            }
        }
    }
}

export default ArticleSummary;