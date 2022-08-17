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
                <div className='article-summary'>
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
                        <img src={this.props.imageUrl} alt={this.props.title}  id='hero-article-image' />
                    </div>
                </div>
            );
        } else {
            return (
                <div id='standard-article-summary' className='article-summary'>
                    <img src={this.props.imageUrl} alt={this.props.title} />
                    <h2><a href={url}>{this.props.title}</a></h2>
                    {this.props.isHero === true &&
                        <div>Is a hero!</div>
                    }
                    <i>Published: {localizedDate}<br />
                    {parsedTags.map(tag => {
                        return <div id='tag' key={tag}>{tag}</div>
                    })}
                    {this.props.estimatedReadingTime} minute read</i>
                    <br />
                    <p>{this.props.summary}</p>
                </div>
            );
        }
    }
}

export default ArticleSummary;