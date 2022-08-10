import React from 'react';


class ArticleArchive extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {data: [] }
    }

    componentDidMount() {
        fetch('https://jvnqmq63tuabrbtvppst2r2zkq0ezmbs.lambda-url.us-east-1.on.aws/')
            .then(res => res.json())
            .then(json => this.setState({data: json}));
    }

    render() {
        return (
            <div>
            <h1>Articles</h1>

            {this.state.data.map(article => {
                var url = "/" + article.articleId.S + "/" + article.title.S.replaceAll(' ', '-');
                return (
                    <div key={article.articleId.S}>
                        <h2><a href={url}>{article.title.S}</a></h2>
                        <i>Published: {article.publicationDate.S}<br />
                        {article.estimatedReadingTime.N} minute read</i>
                        <br />
                        <p>{article.summary.S}</p>
                    </div>
                );
            }

            )}
            </div>
        );
    }
}

export default ArticleArchive;