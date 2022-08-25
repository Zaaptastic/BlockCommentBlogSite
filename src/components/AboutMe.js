import '../styles/AboutMe.css'
import React from 'react';

import Loading from './Loading'
import { marked } from 'marked';
import { fetchArticleContent } from '../utils/AwsFunctions'


class AboutMe extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: { content: '' }, isPageLoading: true }
    }

    componentDidMount() {
        var shouldHideLoadingWhenComplete = new URLSearchParams(window.location.search)
            .get('hideLoadingWhenComplete');
        var valueWhenFinishedLoading = shouldHideLoadingWhenComplete === 'true' || shouldHideLoadingWhenComplete === '1'

        fetchArticleContent('about-me')
            .then(response => this.setState({ data: response, isPageLoading: valueWhenFinishedLoading }))
            .catch(error => {
                window.location.replace('/404');
                console.log(error);
            })
    }

    render() {

        var content = this.state.data.content;
        if (!content.startsWith('<html>')) {
            content = marked.parse(content);
        }

        return (<div id='about-me-wrapper'>
            
            {this.state.isPageLoading === true && <Loading />}
            <p id ='about-me-text-desktop' dangerouslySetInnerHTML={{ __html: content }} />

        </div>);
        
    }
}

export default AboutMe;