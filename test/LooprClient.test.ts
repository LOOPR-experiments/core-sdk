import { LooprClient } from '../src/LooprClient';
import { AuditRequest, AuditResponse } from '../src/types';

// @ts-ignore
global.fetch = jest.fn();

describe('LooprClient', () => {
  const dummyConfig = { apiKey: 'test-key', baseUrl: 'https://api.loopr.io' };
  const client = new LooprClient(dummyConfig);

  afterEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('should call fetch with correct parameters', async () => {
    const request: AuditRequest = { code: 'code', language: 'javascript', mode: 'default' };
    const mockResponse: AuditResponse = { result: 'optimized code' };

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const response = await client.audit(request);

    expect(fetch).toHaveBeenCalledWith('https://api.loopr.io/audit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test-key',
      },
      body: JSON.stringify(request),
    });
    expect(response).toEqual(mockResponse);
  });

  it('should throw error on non-OK response', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 400,
      text: () => Promise.resolve('Bad Request'),
    });

    await expect(client.audit({ code: '', language: 'javascript' })).rejects.toThrow(
      /Loopr API error: 400 Bad Request/
    );
  });
});
