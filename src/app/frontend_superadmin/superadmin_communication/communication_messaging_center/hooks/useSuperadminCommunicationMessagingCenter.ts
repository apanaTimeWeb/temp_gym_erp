'use client';


import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import { superadminMessagingApi } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/api/superadmin_communication_messaging_center.api';
import { SUPERADMIN_COMMUNICATION_MESSAGING_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/api/superadmin_communication_messaging_center.query_keys';
import { SUPERADMIN_COMMUNICATION_MESSAGING_ALL_FILTER, ITEMS_PER_PAGE, SUPERADMIN_COMMUNICATION_MESSAGING_CHANNELS, SUPERADMIN_COMMUNICATION_MESSAGING_TABS } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/constants/superadmin_communication_messaging_center.constants';
import { useSuperadminCommunicationMessagingCenterDebouncedValue } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/hooks/useSuperadminCommunicationMessagingCenterDebouncedValue';
import { useSuperadminCommunicationMessagingCenterSendMutation } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/hooks/useSuperadminCommunicationMessagingCenterSendMutation';
import { useSuperadminCommunicationMessagingCenterUrlState } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/hooks/useSuperadminCommunicationMessagingCenterUrlState';

import type { MessageChannel, MessagingTab } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/types/superadmin_communication_messaging_center.types';


/** Owns the message and tenant query contracts; notification state is owned by useSuperadminCommunicationMessagingCenterNotifications. */
export function useSuperadminCommunicationMessagingCenter() {
  const { getParam, setParams } = useSuperadminCommunicationMessagingCenterUrlState();
  const rawTab = getParam('tab', 'messages');
  const tab = SUPERADMIN_COMMUNICATION_MESSAGING_TABS.includes(rawTab as MessagingTab) ? rawTab as MessagingTab : 'messages';
  const search = getParam('search', '');
  const rawChannel = getParam('channel', SUPERADMIN_COMMUNICATION_MESSAGING_ALL_FILTER);
  const channel = rawChannel === SUPERADMIN_COMMUNICATION_MESSAGING_ALL_FILTER || SUPERADMIN_COMMUNICATION_MESSAGING_CHANNELS.includes(rawChannel as MessageChannel)
    ? rawChannel as MessageChannel | typeof SUPERADMIN_COMMUNICATION_MESSAGING_ALL_FILTER
    : SUPERADMIN_COMMUNICATION_MESSAGING_ALL_FILTER;
  const startDate = getParam('startDate', '');
  const endDate = getParam('endDate', '');
  const rawPage = Number(getParam('page', '1'));
  const currentPage = Number.isSafeInteger(rawPage) && rawPage > 0 ? rawPage : 1;
  const debouncedSearch = useSuperadminCommunicationMessagingCenterDebouncedValue(search, 300);
  const queryParams = useMemo(() => {
    const params: Record<string, string> = { page: String(currentPage), limit: String(ITEMS_PER_PAGE) };
    if (debouncedSearch.trim()) params.search = debouncedSearch.trim();
    if (channel !== SUPERADMIN_COMMUNICATION_MESSAGING_ALL_FILTER) params.channel = channel;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    return params;
  }, [channel, currentPage, debouncedSearch, endDate, startDate]);

  const messagesQuery = useQuery({ queryKey: SUPERADMIN_COMMUNICATION_MESSAGING_QUERY_KEYS.messagesList(queryParams), queryFn: async () => {
    const response = await superadminMessagingApi.fetchMessages(queryParams);
    if (!response.success) throw new Error(response.message || 'Failed to load messages');
    return response;
  }, placeholderData: (previous) => previous });
  const tenantsQuery = useQuery({ queryKey: SUPERADMIN_COMMUNICATION_MESSAGING_QUERY_KEYS.tenants, queryFn: async () => {
    const response = await superadminMessagingApi.fetchTenants();
    if (!response.success) throw new Error(response.message || 'Failed to load tenants');
    return response;
  } });
  const sendMessageMutation = useSuperadminCommunicationMessagingCenterSendMutation();
  const messages = messagesQuery.data?.data ?? [];
  const totalItems = messagesQuery.data?.meta?.total ?? messages.length;
  const totalPages = Math.max(1, messagesQuery.data?.meta?.totalPages ?? Math.ceil(totalItems / ITEMS_PER_PAGE));

  return {
    tab,
    setTab: (value: MessagingTab) => setParams({ tab: value }),
    search,
    setSearch: (value: string) => setParams({ search: value, page: '1' }),
    channelFilter: channel,
    setChannelFilter: (value: MessageChannel | typeof SUPERADMIN_COMMUNICATION_MESSAGING_ALL_FILTER) => setParams({ channel: value === SUPERADMIN_COMMUNICATION_MESSAGING_ALL_FILTER ? null : value, page: '1' }),
    startDate,
    endDate,
    setRange: (start: string, end: string) => setParams({ startDate: start || null, endDate: end || null, page: '1' }),
    currentPage,
    setPage: (page: number) => setParams({ page: String(Math.max(page, 1)) }),
    totalPages,
    totalItems,
    messages,
    tenants: tenantsQuery.data?.data ?? [],
    messagesIsPending: messagesQuery.isPending,
    messagesIsError: messagesQuery.isError,
    messagesError: messagesQuery.error,
    isFetchingMessages: messagesQuery.isFetching,
    refetchMessages: () => messagesQuery.refetch(),
    tenantsIsPending: tenantsQuery.isPending,
    tenantsIsError: tenantsQuery.isError,
    refetchTenants: () => tenantsQuery.refetch(),
    sendMessage: sendMessageMutation.mutateAsync,
    isSending: sendMessageMutation.isPending,
  };
}
