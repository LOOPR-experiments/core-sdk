export interface Config {
  apiKey: string;
  baseUrl: string;
}

export function getConfig(): Config {
  const apiKey = process.env.LOOPR_API_KEY;
  const baseUrl = process.env.LOOPR_API_BASE_URL || 'https://api.loopr.io';

  if (!apiKey) {
    throw new Error('Environment variable LOOPR_API_KEY is required');
  }

  return { apiKey, baseUrl };
}
