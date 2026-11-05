/**
 * RESPONSIBILITY: Owns the TypeScript props contract for SuperadminAnalyticsReportsProgressBarProps.
 * INTENT: Keep component props isolated from JSX implementation according to the feature type-isolation rule.
 * DATA FLOW: Parent feature component -> SuperadminAnalyticsReportsProgressBarProps -> presentational component.
 */
export interface SuperadminAnalyticsReportsProgressBarProps {
  value: number;
  fillClassName: string;
}
