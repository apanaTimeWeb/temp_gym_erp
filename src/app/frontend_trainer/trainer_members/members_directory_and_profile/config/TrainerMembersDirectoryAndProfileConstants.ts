import { CheckCircle, Clock, User, XCircle } from 'lucide-react';
import { TRAINER_MEMBERS_PROFILE_VIEW_VALUES } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/config/members_directory_and_profile.url_config';

// RESPONSIBILITY: Owns Trainer Members static business configuration, status mappings, labels, and defaults.
export const TRAINER_MEMBERS_MEMBER_STATUS = { ACTIVE:'ACTIVE', PENDING:'PENDING', EXPIRED:'EXPIRED', EXPIRING_SOON:'EXPIRING_SOON', NEW:'NEW' } as const;
export const TRAINER_MEMBERS_MEMBER_STATUS_LABEL_KEYS: Record<string, string> = { ACTIVE: 'TEXT_ACTIVE', PENDING: 'TEXT_PENDING', EXPIRED: 'TEXT_EXPIRED', EXPIRING_SOON: 'TEXT_EXPIRING_SOON', NEW: 'TEXT_NEW_MEMBERS' };
export const TRAINER_MEMBERS_MEMBERS_STATUS_COLORS: Record<string,{bg:string;text:string}> = { ACTIVE:{bg:'bg-success-bg',text:'text-success'}, PENDING:{bg:'bg-warning-bg',text:'text-warning'}, EXPIRED:{bg:'bg-danger-bg',text:'text-danger'} };
export const TRAINER_MEMBERS_MEMBER_STATUS_OPTIONS = [{labelKey:'TEXT_ALL_STATUS',value:'All'},{labelKey:'TEXT_ACTIVE',value:'ACTIVE'},{labelKey:'TEXT_EXPIRING_SOON',value:'EXPIRING_SOON'},{labelKey:'TEXT_EXPIRED',value:'EXPIRED'},{labelKey:'TEXT_NEW_MEMBERS',value:'NEW'}] as const;
export const TRAINER_MEMBERS_MEMBER_PROGRESS_OPTIONS = [{labelKey:'TEXT_ALL_PROGRESS',value:'All'},{labelKey:'TEXT_PROGRESS_GOOD',value:'Good'},{labelKey:'TEXT_PROGRESS_AVERAGE',value:'Average'},{labelKey:'TEXT_PROGRESS_NEEDS_ATTENTION',value:'Needs Attention'}] as const;
export const TRAINER_MEMBERS_GENDER_VALUES = ['MALE', 'FEMALE', 'OTHER'] as const;
export const TRAINER_MEMBERS_GENDER_OPTIONS = [{labelKey:'TEXT_MALE',value:TRAINER_MEMBERS_GENDER_VALUES[0]},{labelKey:'TEXT_FEMALE',value:TRAINER_MEMBERS_GENDER_VALUES[1]},{labelKey:'TEXT_OTHER',value:TRAINER_MEMBERS_GENDER_VALUES[2]}] as const;
export const TRAINER_MEMBERS_EMPTY_MEMBER_FORM = { name:'', email:'', phone:'', address:'', gender:'MALE' } as const;
export const TRAINER_MEMBERS_ATTENDANCE_CALENDAR_DAYS = 30;
export const TRAINER_MEMBERS_MEMBERS_TABLE_HEADERS = ['ID','MEMBER','AGE/GENDER','STATUS','EXPIRY','FITNESS GOAL','LAST WORKOUT','PLANS (DIET/WORKOUT)','CHECK-IN DAYS','PROGRESS','ACTIONS'] as const;
export const TRAINER_MEMBERS_PROFILE_TABS = [{id:'overview',labelKey:'TEXT_BASIC_INFO'},{id:'fitness',labelKey:'TEXT_FITNESS_INFO'},{id:'assessment',labelKey:'TEXT_FITNESS_ASSESSMENT'},{id:'progress',labelKey:'TEXT_PROGRESS_MEASUREMENTS_TAB'},{id:'workout',labelKey:'TEXT_WORKOUT_PLAN_TAB'},{id:'diet',labelKey:'TEXT_DIET_PLAN_TAB'},{id:'attendance',labelKey:'TEXT_ATTENDANCE_CALENDAR_TAB'},{id:'notes',labelKey:'TEXT_TRAINER_NOTES_TAB'}] as const;
export const TRAINER_MEMBERS_SORT_FIELDS = ['id','name','status','expiryDate','progressStatus'] as const;
export const TRAINER_MEMBERS_SORT_DIRECTIONS = ['asc','desc'] as const;
export const TRAINER_MEMBERS_PROFILE_TAB_IDS = TRAINER_MEMBERS_PROFILE_VIEW_VALUES;
export const TRAINER_MEMBERS_MEMBER_MESSAGE_TYPES = ['whatsapp','email'] as const;

export const TRAINER_MEMBERS_MEMBER_KPI_FILTERS = [
  { key: 'total', filterValue: 'All' },
  { key: 'active', filterValue: TRAINER_MEMBERS_MEMBER_STATUS.ACTIVE },
  { key: 'pending', filterValue: TRAINER_MEMBERS_MEMBER_STATUS.PENDING },
  { key: 'expired', filterValue: TRAINER_MEMBERS_MEMBER_STATUS.EXPIRED },
] as const;

export const TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS = { GOOD: 'Good', AVERAGE: 'Average', NEEDS_ATTENTION: 'Needs Attention' } as const;
export const TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS_VALUES = [TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS.GOOD, TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS.AVERAGE, TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS.NEEDS_ATTENTION] as const;
export const TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS_LABEL_KEYS: Record<string, string> = { [TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS.GOOD]: 'TEXT_PROGRESS_GOOD', [TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS.AVERAGE]: 'TEXT_PROGRESS_AVERAGE', [TRAINER_MEMBERS_MEMBER_PROGRESS_STATUS.NEEDS_ATTENTION]: 'TEXT_PROGRESS_NEEDS_ATTENTION' };
export const TRAINER_MEMBERS_PROFILE_ATTENDANCE_STATUS = { PRESENT: 'P', ABSENT: 'A', LEAVE: 'L', UNRECORDED: 'UNRECORDED', UPCOMING: 'UPCOMING' } as const;

export const TRAINER_MEMBERS_WORKOUT_HISTORY_STATUS = { COMPLETED: 'Completed' } as const;

export const TRAINER_MEMBERS_MEMBER_KPI_PRESENTATION = {
  total: { labelKey: 'TEXT_TOTAL_MEMBERS', icon: User, color: 'text-info', bg: 'bg-info-bg' },
  active: { labelKey: 'TEXT_ACTIVE', icon: CheckCircle, color: 'text-success', bg: 'bg-success-bg' },
  pending: { labelKey: 'TEXT_PENDING', icon: Clock, color: 'text-warning', bg: 'bg-warning-bg' },
  expired: { labelKey: 'TEXT_EXPIRED', icon: XCircle, color: 'text-danger', bg: 'bg-danger-bg' },
} as const;


export const TRAINER_MEMBERS_BILLING_CYCLE_LABEL_KEYS = {
  MONTHLY: 'TEXT_BILLING_MONTHLY',
  QUARTERLY: 'TEXT_BILLING_QUARTERLY',
  YEARLY: 'TEXT_BILLING_YEARLY',
} as const;
