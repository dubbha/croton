const { lambda, api } = require('../web/serverConfig.json');

const createRoot = (id, region) =>
  `https://${id}.execute-api.${region}.amazonaws.com/latest`;

module.exports = {
  root: createRoot(api.id, lambda.region),
};
