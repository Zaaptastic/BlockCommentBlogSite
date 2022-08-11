
import * as AWS from 'aws-sdk'

AWS.config.update({
  region: 'us-east-1',
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
});

var lambdaClient = new AWS.Lambda();

export async function fetchArticleMetadata() {
  var functionName = 'BlockCommentBlogBackend_getArticleList_devo';
  if ('production' === process.env.NODE_ENV) {
    functionName = 'BlockCommentBlogBackend_getArticleList';
  }

  var params = {
    FunctionName: functionName,
    Payload: ''
  }

  var response = await lambdaClient.invoke(params).promise();

  var json = JSON.parse(response.$response.httpResponse.body);
  return json.body;
}

export async function fetchArticleContent(inputArticleId) {
  var functionName = 'BlockCommentBlogBackend_getArticle_devo';
  if ('production' === process.env.NODE_ENV) {
    functionName = 'BlockCommentBlogBackend_getArticle';
  }

  var payload = {
    articleId: inputArticleId
  }
  var params = {
    FunctionName: functionName,
    Payload: JSON.stringify(payload)
  }

  var response = await lambdaClient.invoke(params).promise();

  var json = JSON.parse(response.$response.httpResponse.body);
  if (200 !== json.statusCode) {
    throw new Error("Unable to find article content")
  }
  return json.body;
}
