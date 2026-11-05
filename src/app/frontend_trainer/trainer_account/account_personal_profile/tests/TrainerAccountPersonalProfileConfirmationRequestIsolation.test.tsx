import { useContext, useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/app/frontend_trainer/trainer_account/account_personal_profile/components/TrainerAccountPersonalProfileTrainerInfrastructureConfirmModal', () => ({
 default: ({ title }: { title: string }) => {
   const [phrase, setPhrase] = useState('');
   return <div role="dialog"><p>{title}</p><input aria-label="typed phrase" value={phrase} onChange={(e) => setPhrase(e.target.value)} /></div>;
 },
}));
import { TrainerInfrastructureConfirmContext, TrainerInfrastructureConfirmProvider } from '@/app/frontend_trainer/trainer_account/account_personal_profile/components/TrainerAccountPersonalProfileTrainerInfrastructureConfirmProvider';

function Harness() {
 const context = useContext(TrainerInfrastructureConfirmContext);
 return <div><button onClick={() => void context?.confirm({ title: 'First', message: 'First', requireTypedConfirmation: true, confirmationPhrase: 'DELETE' })}>First request</button><button onClick={() => void context?.confirm({ title: 'Second', message: 'Second', requireTypedConfirmation: true, confirmationPhrase: 'DELETE' })}>Second request</button></div>;
}
describe('profile request isolation', () => {
 it('clears typed consent when a new destructive request replaces the old request', () => {
   render(<TrainerInfrastructureConfirmProvider><Harness /></TrainerInfrastructureConfirmProvider>);
   fireEvent.click(screen.getByRole('button', { name: 'First request' }));
   fireEvent.change(screen.getByRole('textbox', { name: 'typed phrase' }), { target: { value: 'DELETE' } });
   fireEvent.click(screen.getByRole('button', { name: 'Second request' }));
   expect(screen.getByRole('textbox', { name: 'typed phrase' })).toHaveValue('');
   expect(screen.getByRole('dialog')).toHaveTextContent('Second');
 });
});
