
import * as AWS from 'aws-sdk'
import { DynamoDBClient, 
    GetItemCommand 
} from "@aws-sdk/client-dynamodb";
const dynamoDBClient = new DynamoDBClient({ region: 'us-east-1'});


console.log(process.env.AWS_ACCESS_KEY_ID);
export const fetchMetadata = () => {
    const input = {
        TableName: "BlockCommentBlogMetadata",
        //ProjectionExpression: "",
        Key: { 'articleId': {S:'001'}, 'publicationDate': {S: '2022-08-08'} } 
    }
    const command = new GetItemCommand(input);

    dynamoDBClient.send(command, function(err, data) {
        if (err) {
          console.log("Error", err);
          return err;
        } else {
          console.log("Success", data.Item);

          return data.Item;
        }
    });
}
