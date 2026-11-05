import { z } from 'zod';

/**
 * @description Provides the ManagerInquiriesPipelineSchema implementation for the inquiries module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const inquirySchema = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string(),
  email: z.string().optional(),
  interest: z.string(),
  status: z.string(),
  source: z.string().optional(),
  notes: z.string().optional(),
  followUpDate: z.string().optional(),
  createdAt: z.string(),
  followUpLogs: z.array(z.object({
    date: z.string(),
    note: z.string() })).optional() });

export const inquiryStatsSchema = z.object({
  total: z.number(),
  new: z.number(),
  followUp: z.number(),
  converted: z.number(),
  lost: z.number() });
