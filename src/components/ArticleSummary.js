import React from 'react';

class ArticleSummary extends React.Component{
    render() {
        var url = "/" + this.props.articleId + "/" + this.props.title.replaceAll(' ', '-');

        return (
            <div key={this.props.articleId}>
                <h2><a href={url}>{this.props.title}</a></h2>
                <i>Published: {this.props.publicationDate}<br />
                {this.props.estimatedReadingTime} minute read</i>
                <br />
                <p>{this.props.summary}</p>
            </div>
        );
    }
}

export default ArticleSummary;