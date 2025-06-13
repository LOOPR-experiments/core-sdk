import fetch from 'cross-fetch';
import { getConfig, Config } from './config';
import { AuditRequest, AuditResponse } from './types';

export class LooprClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(config?: Config) {
    const { apiKey, baseUrl } = config || getConfig();
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async audit(request: AuditRequest): Promise<AuditResponse> {
    const response = await fetch(`${this.baseUrl}/audit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Loopr API error: ${response.status} ${text}`);
    }

    const data = (await response.json()) as AuditResponse;
    return data;
  }
}
