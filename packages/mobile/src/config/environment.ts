// TODO: this is only for test android emulator
const fakeEnv: string = '71368149020b';

export const environments = {
  dev: {
    protocol: 'https',
    host: `${fakeEnv}.ngrok.io`,
    port: '3000',
    api: 'http://croton.cf:3000/api',
  },
};

// TODO: implement logic for envs
export const getEnvironment = () => {
  return environments.dev;
};

export const api = getEnvironment();
