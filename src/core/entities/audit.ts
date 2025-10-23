interface FileUrlResponse {
  success: boolean;
  key: string;
  etag: string;
  url: string;
}

export interface AuditResult {
  calculated: {
    seedHash: string;
    playerEntropies: string[];
    finalSeed: string;
    winningBarrels: number[];
  };
  randomnessTestFileUrl: FileUrlResponse
  official: {
    seedHash: string;
    finalSeed: string;
    drandRandomness: string;
    winningBarrels: number[];
  };
  verification: {
    isValid: boolean;
    anomaliesCount: number;
    criticalAnomalies: number;
    warnings: number;
  };
  anomalies: Array<{
    type: string;
    severity: 'critical' | 'warning' | 'info';
    description: string;
    expected: string;
    actual: string;
  }>;
  steps: Array<{
    step: number;
    name: string;
    input: string;
    output: string;
    formula: string;
    valid: boolean;
  }>;
}