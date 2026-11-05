import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { downloadAdminMembersDirectoryCsv } from '@/app/frontend_admin/admin_members/members_directory/utils/AdminMembersDirectoryDownloadCsv';

let oldCreate: PropertyDescriptor | undefined;
let oldRevoke: PropertyDescriptor | undefined;
let create: ReturnType<typeof vi.fn>;
let revoke: ReturnType<typeof vi.fn>;

describe('Members Directory CSV download lifecycle', () => {
  beforeEach(() => {
    oldCreate = Object.getOwnPropertyDescriptor(URL, 'createObjectURL');
    oldRevoke = Object.getOwnPropertyDescriptor(URL, 'revokeObjectURL');
    create = vi.fn().mockReturnValue('blob:members');
    revoke = vi.fn();
    Object.defineProperty(URL, 'createObjectURL', { configurable: true, value: create });
    Object.defineProperty(URL, 'revokeObjectURL', { configurable: true, value: revoke });
  });
  afterEach(() => {
    vi.restoreAllMocks();
    if (oldCreate) Object.defineProperty(URL, 'createObjectURL', oldCreate);
    else Reflect.deleteProperty(URL, 'createObjectURL');
    if (oldRevoke) Object.defineProperty(URL, 'revokeObjectURL', oldRevoke);
    else Reflect.deleteProperty(URL, 'revokeObjectURL');
  });

  it('preserves the supplied CSV, filename, releases the URL and removes the anchor', () => {
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    downloadAdminMembersDirectoryCsv('ID,Name\n1,A');
    expect(create).toHaveBeenCalledTimes(1);
    expect(click).toHaveBeenCalledTimes(1);
    expect(revoke).toHaveBeenCalledWith('blob:members');
    expect(document.querySelector('a[href="blob:members"]')).toBeNull();
  });

  it('releases the temporary URL and mounted anchor if the browser refuses the click', () => {
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => { throw new Error('browser refused'); });
    expect(() => downloadAdminMembersDirectoryCsv('ID,Name')).toThrow('browser refused');
    expect(revoke).toHaveBeenCalledWith('blob:members');
    expect(document.querySelector('a[href="blob:members"]')).toBeNull();
  });
});
