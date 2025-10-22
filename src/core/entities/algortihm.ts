export type AlgorithmData = {
    algorithm_name: string;
    algorithm_type: string;
    version: string;
    stages: Array<{
      stage: number;
      name: string;
      short_description: string;
      detailed_description: string;
      steps: {
        backend: string[];
        frontend: string[];
      };
    }>;
    security_guarantees: {
      [key: string]: string;
    };
    entropy_sources: Array<{
      source: string;
      type: string;
      protection: string;
      contribution: string;
    }>;
    cryptographic_primitives: {
      [key: string]: string;
    };
  };