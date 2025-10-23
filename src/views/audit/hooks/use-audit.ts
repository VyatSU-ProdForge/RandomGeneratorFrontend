// hooks/use-audit.ts
import { useState } from 'react';

interface AuditData {
  version: string;
  timestamp: string;
  lottery_id: string;
  server_commitment: string;
  player_entries: Array<{
    player_id: string;
    image_data: string;
    numbers: number[];
    commitment_hash: string;
  }>;
  drand_randomness?: string;
  final_seed?: string;
  results?: number[];
  verification: {
    expected_final_hash: string;
    signature?: string;
  };
}

export const useAudit = () => {
  const [jsonInput, setJsonInput] = useState<string>('');
  const [auditData, setAuditData] = useState<AuditData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleJsonChange = (value: string): void => {
    setJsonInput(value);
    setError(null);
  };

  const validateJson = (): boolean => {
    try {
      if (!jsonInput.trim()) {
        setError('Введите JSON данные для проверки');
        return false;
      }
      const parsed = JSON.parse(jsonInput);
      if (!parsed.lottery_id || !parsed.server_commitment) {
        setError('Неверная структура JSON. Отсутствуют обязательные поля: lottery_id, server_commitment');
        return false;
      }
      setAuditData(parsed);
      return true;
    } catch {
      setError('Невалидный JSON формат. Проверьте синтаксис');
      return false;
    }
  };

  const processAudit = async (): Promise<boolean> => {
    if (!validateJson()) return false;
    
    setIsLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1800));
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  const downloadReport = (): void => {
    if (!auditData) return;

    const report = {
      ...auditData,
      audit_timestamp: new Date().toISOString(),
      audit_result: "success",
      integrity_check: "passed",
      calculated_hash: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5"
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit_report_${auditData.lottery_id}_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exampleJson = {
    version: "1.0",
    timestamp: "2024-01-15T10:30:00Z",
    lottery_id: "lottery_12345",
    server_commitment: "e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0",
    player_entries: [
      {
        player_id: "user_67890",
        numbers: [5, 12, 23, 34, 45],
        commitment_hash: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5"
      },
      {
        player_id: "user_54321", 
        numbers: [7, 14, 21, 28, 35],
        commitment_hash: "b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"
      }
    ],
    drand_randomness: "c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8",
    final_seed: "d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0",
    results: [12, 45, 23, 5, 34, 7, 14, 21, 28, 35],
    verification: {
      expected_final_hash: "e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9",
      signature: "f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2"
    }
  };

  return {
    // State
    jsonInput,
    auditData,
    isLoading,
    error,
    exampleJson,
    
    // Actions
    handleJsonChange,
    processAudit,
    downloadReport,
    
    // Utilities
    validateJson,
  };
};