import '../styles/AboutMe.css'
import React from 'react';

import Loading from './Loading'
import { marked } from 'marked';
import { fetchInvisibleArticleContent } from '../utils/AwsFunctions'
import { MobileView, BrowserView } from 'react-device-detect';



class AboutMe extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: { content: '' }, isPageLoading: true }
    }

    componentDidMount() {
        var shouldHideLoadingWhenComplete = new URLSearchParams(window.location.search)
            .get('hideLoadingWhenComplete');
        var valueWhenFinishedLoading = shouldHideLoadingWhenComplete === 'true' || shouldHideLoadingWhenComplete === '1'

        fetchInvisibleArticleContent('about-me')
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
        console.log(this.state.data);
        return (<div id='about-me-wrapper'>

            {this.state.isPageLoading === true && <Loading />}

            <BrowserView>
                {this.state.data.metadata !== undefined && <div id='about-me-image-wrapper-desktop'>
                    <img src={this.state.data.metadata.imageUrl.S} alt='Bobby Chen' id='about-me-image-desktop' />
                    <p id='about-me-text-desktop' dangerouslySetInnerHTML={{ __html: content }} />
                </div>
                }
            </BrowserView>

            <MobileView>
                {this.state.data.metadata !== undefined && <div id='about-me-image-wrapper-mobile'>
                    <img src={this.state.data.metadata.imageUrl.S} alt='Bobby Chen' id='about-me-image-mobile' />
                    <p id='about-me-text-mobile' dangerouslySetInnerHTML={{ __html: content }} />
                </div>
                }
            </MobileView>

        </div>);

    }
}

export default AboutMe;