/**
 * RESPONSIBILITY: Owns the TypeScript props contract for SuperadminBillingUsageMetersProgressBarProps.
 * INTENT: Keep component props isolated from JSX implementation according to the feature type-isolation rule.
 * DATA FLOW: Parent feature component -> SuperadminBillingUsageMetersProgressBarProps -> presentational component.
 */
export interface SuperadminBillingUsageMetersProgressBarProps {
  value: number;
  limit: number;
  fillClassName: string;
  title?: string;
}
