// RESPONSIBILITY: Defines the plan pricing snapshot consumed by lead conversion.
export interface PlanSnapshot { id: string; name: string; price1Month: number; price3Month: number; price6Month: number; price12Month: number; priceCustom?: number; }
