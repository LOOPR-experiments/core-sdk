import { getConfig } from '../src/config';

describe('getConfig', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should throw if LOOPR_API_KEY is missing', () => {
    delete process.env.LOOPR_API_KEY;
    expect(() => getConfig()).toThrow('Environment variable LOOPR_API_KEY is required');
  });

  it('should return config with default baseUrl', () => {
    process.env.LOOPR_API_KEY = 'abc123';
    delete process.env.LOOPR_API_BASE_URL;
    const config = getConfig();
    expect(config).toEqual({ apiKey: 'abc123', baseUrl: 'https://api.loopr.io' });
  });

  it('should return config with custom baseUrl', () => {
    process.env.LOOPR_API_KEY = 'abc123';
    process.env.LOOPR_API_BASE_URL = 'https://custom.loopr.io';
    const config = getConfig();
    expect(config).toEqual({ apiKey: 'abc123', baseUrl: 'https://custom.loopr.io' });
  });
});
