// RESPONSIBILITY: Pure Trainer domain index; route work is owned by its autonomous submodule.
import { redirect } from 'next/navigation';
import { TRAINER_MEMBERS_URLS } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/config/members_directory_and_profile.url_config';

export default function TrainerMembersIndex() {
  redirect(TRAINER_MEMBERS_URLS.ROUTES.LIST);
}
