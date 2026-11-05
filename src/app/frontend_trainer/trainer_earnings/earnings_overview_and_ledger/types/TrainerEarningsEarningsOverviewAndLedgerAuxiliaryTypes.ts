/** Module-owned auxiliary types extracted from implementation files for strict type isolation. */


export interface TrainerInfrastructureErrorReport {
  module: string;
  route: string;
  timestamp: string;
  errorDigest?: string;
}
