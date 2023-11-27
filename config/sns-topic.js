// const AWS = require('aws-sdk');
// AWS.config.update({ region: 'us-east-1' });

// const sns = new AWS.SNS();
// const params = {
//   Message: JSON.stringify({ email: user.email, submissionUrl: submissionUrl }),
//   TopicArn: 'SNS_TOPIC_ARN'
// };

// sns.publish(params, function(err, data) {
//   if (err) console.log(err, err.stack);
//   else console.log(`Message sent to SNS: ${data}`);
// });