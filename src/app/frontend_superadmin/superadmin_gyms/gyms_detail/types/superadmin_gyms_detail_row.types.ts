/**
 * RESPONSIBILITY: Owns the TypeScript props contract for SuperadminGymsGymDetailRowProps.
 * INTENT: Keep component props isolated from JSX implementation according to the feature type-isolation rule.
 * DATA FLOW: Parent feature component -> SuperadminGymsGymDetailRowProps -> presentational component.
 */
export interface SuperadminGymsGymDetailRowProps {
  label: string;
  value: string | number | undefined | null;
  emphasis?: boolean;
  emphasisWarning?: boolean;
}
