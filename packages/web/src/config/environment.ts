export const environments = {
  local: { // local devServer@HTTP using dev env API, started using `yarn start`
    protocol: 'http:',
    host: 'localhost:8080',
    api: 'http://croton.cf:3000/api',
  },
  localHttps: { // local devServer@HTTPS using dev env API, started using `yarn start:https`
    protocol: 'https:',
    host: 'localhost:4430',
    api: 'https://croton.cf:4000/api',
  },
  localUsingLocalApi: { // local devServer@HTTP using local API, started using `yarn start:local`
    protocol: 'http:',
    host: 'localhost:8081',
    api: 'http://localhost:3000/api',
  },
  localUsingLocalApiHttps: { // local devServer@HTTPS using local API, started using `yarn start:local:https`
    protocol: 'https:',
    host: 'localhost:4431',
    api: 'https://localhost:4000/api',
  },
  localBuildServe: { // local build statically served using `yarn serve`, using dev env API, HTTP part
    protocol: 'http:',
    host: 'localhost',
    api: 'http://croton.cf:3000/api',
  },
  localBuildServeHttps: { // local build statically served using `yarn serve`, using dev env API, HTTPS part
    protocol: 'https:',
    host: 'localhost',
    api: 'https://croton.cf:4000/api',
  },
  dev: {
    protocol: 'http:',
    host: 'croton.cf:8080',
    api: 'http://croton.cf:3000/api',
  },
  devHttps: {
    protocol: 'https:',
    host: 'croton.cf:4430',
    api: 'https://croton.cf:4000/api',
  },
  stage: {
    protocol: 'http:',
    host: 'croton.cf:8081',
    api: 'http://croton.cf:3001/api',
  },
  stageHttps: {
    protocol: 'https:',
    host: 'croton.cf:4431',
    api: 'https://croton.cf:4001/api',
  },
  prod: {
    protocol: 'http:',
    host: 'croton.cf',
    api: 'http://croton.cf:3002/api',
  },
  prodHttps: {
    protocol: 'https:',
    host: 'croton.cf',
    api: 'https://croton.cf:4002/api',
  },
};

export const getEnvironment = () =>
  Object.values(environments).find(
    env => window.location.protocol === env.protocol && window.location.host === env.host,
  ) || environments.local;

export const { api } = getEnvironment();
