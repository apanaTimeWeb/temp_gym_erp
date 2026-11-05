'use client';
import {useQuery} from '@tanstack/react-query';
import { affiliatesApi } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/api/superadmin_affiliates_payout_history.api';
export function useSuperadminAffiliatesPayoutHistoryPage() {
 return useQuery({queryKey:['superadmin_affiliates_payout_history','payout_history'],queryFn:async()=>{
  const response=await affiliatesApi.fetchPayoutHistory();
  if(!response.success)throw new Error(response.message);
  return response.data;
 }});
}
