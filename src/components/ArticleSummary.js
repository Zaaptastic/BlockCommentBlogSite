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

        return (
            <div>
                <img src={this.props.imageUrl} alt={this.props.title} />
                <h2><a href={url}>{this.props.title}</a></h2>
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

export default ArticleSummary;