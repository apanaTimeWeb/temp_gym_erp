// RESPONSIBILITY: Renders ManagerMembersDirectoryMemberProfilePictureUpload's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useState, useRef, type ChangeEvent } from 'react';
import { Camera, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

/**
 * ManagerMembersDirectoryMemberProfilePictureUpload
 * Displays a circular file-upload zone for capturing a member's face photo.
 * This photo is later used for QR Code face verification during kiosk check-in.
 */
export default function ManagerMembersDirectoryMemberProfilePictureUpload() {
  const t = useTranslations('MANAGER_MEMBERS_DIRECTORY');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 2MB)
    const MAX_SIZE_BYTES = 2 * 1024 * 1024;
    if (file.size > MAX_SIZE_BYTES) {
      setFileError('File size must be less than 2MB');
      return;
    }

    // Validate format
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setFileError('Supported formats: JPG, PNG, WEBP');
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex flex-col items-center justify-center mb-6 pb-6 border-b border-border">
      <div className="w-24 h-24 rounded-full bg-input border-2 border-dashed border-border flex flex-col items-center justify-center text-text-secondary mb-3 relative overflow-hidden group motion-safe:transition-all motion-safe:duration-200 ease-in-out hover:border-primary">
        {previewUrl ? (
          <>
            <img src={previewUrl} alt="Member preview" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={handleRemove}
              aria-label="Remove photo"
              className="absolute inset-0 bg-overlay-backdrop/60 text-on-danger flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={18} strokeWidth={2} />
            </button>
          </>
        ) : (
          <>
            <Camera size={18} strokeWidth={2} className="mb-1 motion-safe:transition-all motion-safe:duration-200 ease-in-out"/>
            <span className="text-xs font-medium motion-safe:transition-all motion-safe:duration-200 ease-in-out">{t("COPY_UPLOAD")}</span>
          </>
        )}
        <input
          ref={fileInputRef}
          data-testid="manager_members-manager-members-modal-input-file-upload"
          type="file"
          aria-label={t("COPY_UPLOAD_MEMBER_PROFILE_PICTURE_FACE_VERIFICATION")}
          className="absolute inset-0 opacity-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
        />
      </div>
      {fileError && <p role="alert" className="text-xs text-danger-text mb-1">{fileError}</p>}
      <p className="text-xs text-text-secondary text-center max-w-xs">{t("COPY_UPLOAD_CLEAR_FACE_PHOTO_USED_QR_CODE_FACE_VERIFICATION")}</p>
    </div>
  );
}
