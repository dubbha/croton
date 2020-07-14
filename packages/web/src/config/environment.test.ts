import { environments, getEnvironment } from './environment';

describe('config/environments', () => {
  const realLocation = window.location;
  delete window.location; // https://github.com/jsdom/jsdom/issues/2112

  afterAll(() => {
    window.location = realLocation;
  })

  it('should map prod host', () => {
    const { protocol, host } = environments.prod;
    window.location = { protocol, host } as Location;
    expect(getEnvironment()).toEqual(environments.prod);
  })

  it('should map stage host', () => {
    const { protocol, host } = environments.stage;
    window.location = { protocol, host } as Location;
    expect(getEnvironment()).toEqual(environments.stage);
  })

  it('should map dev host', () => {
    const { protocol, host } = environments.dev;
    window.location = { protocol, host } as Location;
    expect(getEnvironment()).toEqual(environments.dev);
  })

  it('should map localhost', () => {
    const { protocol, host } = environments.local;
    window.location = { protocol, host } as Location;
    expect(getEnvironment()).toEqual(environments.local);
  })

  it('should map to local env by default', () => {
    window.location = { protocol: 'PROTOCOL', host: 'HOST' } as Location;
    expect(getEnvironment()).toEqual(environments.local);
  })
})