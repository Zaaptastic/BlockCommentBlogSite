class ArticleSummary extends React.Component{
    render() {
        return (
            <>
            <h1>{this.props.title}</h1>
            <p>{this.props.publicationDate}</p>
            <p>Reading Time: {this.props.estimatedReadingTime} minutes</p>
            <p>{this.props.summary}</p>
            </>
        );
    }
}