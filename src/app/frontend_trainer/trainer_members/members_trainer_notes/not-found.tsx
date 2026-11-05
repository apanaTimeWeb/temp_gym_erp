import Link from 'next/link';
export default function TrainerNotesNotFound() { return <section className="p-6 text-primary"><p>Member not found.</p><Link href="/frontend_trainer/trainer_members/members_directory_and_profile" className="underline focus-visible:ring-2 focus-visible:ring-focus-ring">Members</Link></section>; }
