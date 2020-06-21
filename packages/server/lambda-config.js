module.exports = {
  name: 'croton',
  config: 'serverConfig.json',
  'set-env-from-json': 'envVariables.json',
  source: './',
  handler: 'lambda.handler',
  'deploy-proxy-api': true,
  region: 'us-east-1',
};
