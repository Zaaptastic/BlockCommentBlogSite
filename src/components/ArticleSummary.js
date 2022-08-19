import '../styles/ArticleSummary.css'
import React from 'react';

class ArticleSummary extends React.Component{
    render() {
        var url = "/article/" + this.props.articleId + "/" + this.props.title.replaceAll(' ', '-');
        var localizedDate = new Date(this.props.publicationDate)
            .toLocaleDateString('en-US', { dateStyle: 'long' });

        var parsedTags = [];
        for (let i = 0; i < this.props.tags.length; i++) {
            parsedTags.push(this.props.tags[i].S);
        }
        parsedTags.sort();

        if (this.props.isHero === true) {
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
                        <img src={this.props.imageUrl} alt={this.props.title} id='hero-article-image' />
                    </div>
                </div>
            );
        } else {
            return (
                <div id='standard-article-summary-wrapper' className='article-summary'>
                    <div id='standard-article-image-wrapper'>
                        <img src={this.props.imageUrl} alt={this.props.title} id='standard-article-image' />
                    </div>
                    <h2 id='standard-article-title'><a href={url}>{this.props.title}</a></h2>
                    <p id='standard-article-date-time'>{localizedDate} • {this.props.estimatedReadingTime} minute read</p>
                    <p id='standard-article-summary'>{this.props.summary}</p>
                </div>
            );
        }
    }
}

export default ArticleSummary;