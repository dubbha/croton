import { environments, getEnvironment } from './environment';

describe('config/environments', () => {
  const realLocation = window.location;
  delete window.location; // https://github.com/jsdom/jsdom/issues/2112
  window.location = { hostname: '' } as Location;

  afterAll(() => {
    window.location = realLocation;
  })

  it('should map prod host', () => {
    window.location.hostname = environments.prod.hostname;
    expect(getEnvironment()).toEqual(environments.prod);
  })

  it('should map stage host', () => {
    window.location.hostname = environments.stage.hostname;
    expect(getEnvironment()).toEqual(environments.stage);
  })

  it('should map dev host', () => {
    window.location.hostname = environments.dev.hostname;
    expect(getEnvironment()).toEqual(environments.dev);
  })

  it('should map localhost', () => {
    window.location.hostname = environments.local.hostname;
    expect(getEnvironment()).toEqual(environments.local);
  })

  it('should map to local env by default', () => {
    window.location.hostname = 'UNKNOWN';
    expect(getEnvironment()).toEqual(environments.local);
  })
})