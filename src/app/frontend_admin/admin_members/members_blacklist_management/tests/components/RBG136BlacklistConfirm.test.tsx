import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { AdminNavigationLayoutConfirmProvider, ConfirmContext } from '@/app/frontend_admin/admin_members/members_blacklist_management/components/feedback/AdminMembersBlacklistManagementConfirmProvider';

afterEach(cleanup);
const messages = { admin_layout: { AdminNavigationLayoutConfirmModal: { defaultConfirm: 'Confirm', defaultCancel: 'Cancel', text_3deb745651:'Type ', text_1c6b376132:' to continue' } }, AdminNavigationLayoutConfirmModal: { auto_typeToConfirm: 'Type to confirm' } };
const renderQueue = () => { let confirm!: NonNullable<React.ContextType<typeof ConfirmContext>>['confirm'];
  render(<NextIntlClientProvider locale="en" messages={messages}><AdminNavigationLayoutConfirmProvider><ConfirmContext.Consumer>{(value) => { if(value) confirm=value.confirm; return null; }}</ConfirmContext.Consumer></AdminNavigationLayoutConfirmProvider></NextIntlClientProvider>);
  return () => confirm;
};
describe('RBG136 blacklist confirmation protection', () => {
  it('isolates queued typed confirmation requests and enforces a nonempty phrase', async () => {
    const getConfirm=renderQueue();
    let first!:Promise<boolean>,second!:Promise<boolean>;
    first=getConfirm()({title:'First action',message:'First',requireTyping:true,confirmationPhrase:'DELETE'});
    second=getConfirm()({title:'Second action',message:'Second',requireTyping:true,confirmationPhrase:'    '});
    const firstInput=screen.getByRole('textbox');
    fireEvent.change(firstInput,{target:{value:'DELETE'}});
    fireEvent.click(screen.getByRole('button',{name:'Confirm'}));
    await expect(first).resolves.toBe(true);
    await waitFor(()=>expect(screen.getByText('Second action')).toBeTruthy());
    expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('');
    expect((screen.getByRole('button',{name:'Confirm'}) as HTMLButtonElement).disabled).toBe(true);
    fireEvent.change(screen.getByRole('textbox'),{target:{value:'CONFIRM'}});
    fireEvent.keyDown(screen.getByRole('dialog'),{key:'Escape'});
    await expect(second).resolves.toBe(false);
  });
  it('exposes unique dialog semantics and contains tab focus', async () => {
    const getConfirm=renderQueue();
    const result=getConfirm()({title:'Review',message:'Blacklist entry'});
    const dlg=screen.getByRole('dialog');
    expect(dlg.getAttribute('aria-modal')).toBe('true');
    expect(dlg.getAttribute('aria-labelledby')).toBeTruthy();
    expect(document.getElementById(dlg.getAttribute('aria-labelledby')!)).toBeTruthy();
    expect(document.activeElement).toBe(screen.getByRole('button',{name:'Cancel'}));
    fireEvent.keyDown(dlg,{key:'Escape'});
    await expect(result).resolves.toBe(false);
  });
});
