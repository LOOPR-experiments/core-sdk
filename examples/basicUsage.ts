import { LooprClient } from '../src/LooprClient';
import { AuditRequest } from '../src/types';
import { getConfig } from '../src/config';

async function main() {
  const config = getConfig();
  const client = new LooprClient(config);

  const request: AuditRequest = {
    code: `function greet(name) {
  console.log("Hello, " + name);
}`,
    language: 'javascript',
    mode: 'default',
  };

  try {
    const response = await client.audit(request);
    console.log('Original Code:\n', request.code);
    console.log('Optimized Code:\n', response.result);
  } catch (error) {
    console.error('Audit failed:', error);
  }
}

main();
