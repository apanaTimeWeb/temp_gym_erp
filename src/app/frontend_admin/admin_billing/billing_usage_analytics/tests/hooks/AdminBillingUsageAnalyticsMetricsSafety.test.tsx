// RBG135 host-only RTL: invalid metrics must not render NaN; usage against zero quota is critical.
import React from 'react';
import {describe,it,expect,vi} from 'vitest';
import {render,screen} from '@testing-library/react';
import Metric from '@/app/frontend_admin/admin_billing/billing_usage_analytics/components/metric_card/AdminBillingUsageAnalyticsMetricCard';
import Plans from '@/app/frontend_admin/admin_billing/billing_usage_analytics/components/plan_card/AdminBillingUsageAnalyticsPlanCard';
vi.mock('next-intl',()=>({useTranslations:()=> (k:string)=>k,useLocale:()=> 'en'}));
describe('RBG135 metrics and upgrade-only UI',()=>{
 it('marks nonzero use against zero quota as critical without NaN',()=>{const {rerender}=render(<Metric metric={{label:'Staff',used:5,limit:0,unit:'seats',warningThreshold:.8,criticalThreshold:.95}} onUpgrade={()=>{}}/>);expect(screen.getByText('100%')).toBeTruthy();expect(screen.getByText('usage.admin_usage_metric_card.text_ec4a8cfea4')).toBeTruthy();rerender(<Metric metric={{label:'Staff',used:Number.NaN,limit:Number.POSITIVE_INFINITY,unit:'seats',warningThreshold:.8,criticalThreshold:.95}} onUpgrade={()=>{}}/>);expect(screen.getByText('0%')).toBeTruthy();expect(screen.queryByText(/NaN/)).toBeNull()});
 it('offers only higher-than-current tiers and disables both during pending confirm',()=>{const tier=['Starter','Growth','Pro','Enterprise'].map((name,i)=>({name,nameKey:name,price:i*1000,features:[],isCurrent:name==='Growth'}));const {rerender}=render(<Plans planTiers={tier} pendingUpgradePlan={null} onRequestUpgrade={async()=>{}}/>);expect(screen.getAllByRole('button')).toHaveLength(2);rerender(<Plans planTiers={tier} pendingUpgradePlan="Pro" onRequestUpgrade={async()=>{}}/>);expect(screen.getAllByRole('button').every(b=>(b as HTMLButtonElement).disabled)).toBe(true)});
});
