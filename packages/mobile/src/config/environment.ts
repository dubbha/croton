export const environments = {
  dev: {
    protocol: 'http',
    host: 'localhost',
    port: '3000',
    api: 'http://croton.cf:3000/api',
  },
};

// TODO: implement logic for envs
export const getEnvironment = () => {
  return environments.dev;
};

export const api = getEnvironment();
