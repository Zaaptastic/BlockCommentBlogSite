import React from 'react';

class ArticleSummary extends React.Component{
    render() {
        var url = "/article/" + this.props.articleId + "/" + this.props.title.replaceAll(' ', '-');
        var localizedDate = new Date(this.props.publicationDate)
            .toLocaleDateString('en-US', { dateStyle: 'long' });

        return (
            <div>
                <h2><a href={url}>{this.props.title}</a></h2>
                <i>Published: {localizedDate}<br />
                {this.props.estimatedReadingTime} minute read</i>
                <br />
                <p>{this.props.summary}</p>
            </div>
        );
    }
}

export default ArticleSummary;