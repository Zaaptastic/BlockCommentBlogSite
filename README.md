# BlockCommentBlogSite

Application Code for _Block Comment_, my personal tech blog. You can visit the blog here: https://main.d3ghayqrhrykwx.amplifyapp.com/

## Philosophy

Content on _Block Comment_ is designed to be **scheduled**. This allows it to be updated asynchronously from the core web application code. This also removes complexity of dealing with content problems away from the the application. 

Content needs a limited and generic interface to facilitate the style across pages. Ultimately, this is a worthwhile trade-off since these are issues where attention must be paid, anyways. 

Delivery of content and its metadata thus must be solved separately. [BlockCommentBlogService](https://github.com/Zaaptastic/BlockCommentBlogService) is an AWS Lambda solution which connects to the relevant backends fetching this data.

## Feature Set

- Automatic scheduling of new posts in both the Home Page and its dedicated Content Page once it is official published
- 'Hero' face-out for the most recently published post
- Mobile display templates
- Markdown and HTML content support
- Arbitrary descriptive tag rendering
- Dynamically generated Table of Contents from scheduled content, including active section tracking while reading
- Automatic `development` environment detection. Development pages are stylized different for visibility and connect to designated development backends
- Automatic error handling for missing/malformed post data and redirection to 404 pages

## Local Instance Launching

Use `npm start` to launch a local development instance. However, this requires several additional items:

- AWS key credentials must be stored in environment variables (`.env.local` is a convenient place to put this and will be matched by the project's `.gitignore`)
    - `REACT_APP_AWS_ACCESS_KEY_ID`
    - `REACT_APP_AWS_SECRET_ACCESS_KEY`
- AWS function names must be updated to accessible functions for the above credentials
- Additional packages may also be required, consult `package.json` for up-to-date details

