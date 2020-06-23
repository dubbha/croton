const prodConfig = require('../web/claudia.json');

const root = prodConfig
  ? `https://${prodConfig.api.id}.execute-api.${
      prodConfig.lambda.region
    }.amazonaws.com/latest`
  : 'http://127.0.0.1:3000';

module.exports = {
  root,
};
