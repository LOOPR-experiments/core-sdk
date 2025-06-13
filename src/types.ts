export type AnalysisMode = 
  | 'default' 
  | 'security' 
  | 'performance' 
  | 'readability' 
  | 'all';

export interface AuditRequest {
  code: string;
  language: string;
  mode?: AnalysisMode;
}

export interface AuditResponse {
  result: string;
}
