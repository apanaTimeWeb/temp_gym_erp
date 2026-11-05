// RESPONSIBILITY: Password input errors must have a programmatic description and announcement.
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useForm } from 'react-hook-form';
import AdminProfilePasswordField from '@/app/frontend_admin/admin_profile/profile_overview/components/password_field/AdminProfileOverviewPasswordField';
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
// Use the owning form's type rather than fabricating backend behavior.
function TestField() {
  const form = useForm<{currentPassword: string;newPassword: string;confirmPassword: string}>({ defaultValues: {currentPassword:'',newPassword:'',confirmPassword:''} });
  return <><AdminProfilePasswordField label="Current Password" name="currentPassword" form={form} visible={false} onToggle={vi.fn()} /><button type="button" onClick={() => form.setError('currentPassword', { type: 'manual', message: 'Required' })}>Validate</button></>;
}
describe('Profile password input', () => {
  it('links validation details to the invalid input', () => {
    render(<TestField />);
    fireEvent.click(screen.getByRole('button', { name: 'Validate' }));
    const input = screen.getByLabelText(/Current Password/);
    expect(input).toHaveAttribute('aria-invalid', 'true');
    const message = screen.getByRole('alert');
    expect(input).toHaveAttribute('aria-describedby', message.id);
    expect(message).toHaveTextContent('Required');
  });
});
