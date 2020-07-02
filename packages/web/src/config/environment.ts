export const environments = {
  local: {
    hostname: 'localhost',
    api: 'http://ec2-52-90-198-38.compute-1.amazonaws.com:3000/api/',
  },
  dev: {
    hostname: 'croton-web-dev.s3-website.eu-west-2.amazonaws.com',
    api: 'http://ec2-52-90-198-38.compute-1.amazonaws.com:3000/api/',
  },
  stage: {
    hostname: 'croton-web-stage.s3-website.eu-west-2.amazonaws.com',
    api: 'http://ec2-52-90-198-38.compute-1.amazonaws.com:3001/api/',
  },
  prod: {
    hostname: 'croton-web-prod.s3-website.eu-west-2.amazonaws.com',
    api: 'http://ec2-52-90-198-38.compute-1.amazonaws.com:3001/api/',
  }
}

export const getEnvironment = () => {
  switch (window.location.hostname) {
    case environments.prod.hostname:
      return environments.prod;
    case environments.stage.hostname:
      return environments.stage;
    case environments.local.hostname:
    default:
      return environments.local;
  }
}

export const { api } = getEnvironment();