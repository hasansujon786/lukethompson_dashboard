'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { FormInput } from '@/components/ui/FormInput';
import { Button } from '@/components/ui/Button';
import { ProfileData } from '@/types/settings.types';
import { PhoneInput } from '@/components/ui/PhoneInput';
import toast from 'react-hot-toast';

interface GeneralSettingsProps {
  profile: ProfileData;
  isLoading: boolean;
  onSave: (payload: { data: Record<string, unknown>; imageFile?: File }) => void;
  onAvatarChange?: (file: File) => void;
}

export const GeneralSettings = ({ profile, isLoading, onSave, onAvatarChange }: GeneralSettingsProps) => {
  const [name, setName] = useState(profile.name);
  const [email] = useState(profile.email);
  const [phoneNumber, setPhoneNumber] = useState(profile.phone_number);
  const [avatarPreview, setAvatarPreview] = useState(profile.avatar || '/Avatar.png');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [initialProfile, setInitialProfile] = useState(profile);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state when profile changes (re-fetched from API)
  if (initialProfile !== profile) {
    setInitialProfile(profile);
    setName(profile.name);
    setPhoneNumber(profile.phone_number);
    setAvatarPreview(profile.avatar || '/Avatar.png');
    setImageFile(null);
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      toast.error('Only PNG or JPEG formats are allowed');
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setAvatarPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    setImageFile(file);
    onAvatarChange?.(file);
  };

  const handleSave = async () => {
    const data: Record<string, unknown> = {
      name: name.trim(),
      phone_number: phoneNumber,
    };

    onSave({ data, imageFile: imageFile || undefined });
  };

  const handleCancel = () => {
    setName(profile.name);
    setPhoneNumber(profile.phone_number);
    setAvatarPreview(profile.avatar || '/Avatar.png');
    setImageFile(null);
  };

  const hasChanges =
    name !== profile.name ||
    phoneNumber !== profile.phone_number ||
    imageFile !== null;

  return (
    <div className="flex w-full flex-col gap-6 rounded-xl border border-border-light bg-form-bg p-4 sm:p-6">
      <h2 className="text-lg font-bold text-white">My Profile</h2>

      {/* Avatar Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-10 w-10 overflow-hidden rounded-full">
            <Image src={avatarPreview} alt="Profile" fill className="object-cover" sizes="40px" unoptimized/>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-bold text-white">Profile Photo</h3>
            <p className="text-xs text-white-secondary">Min 400x400px, PNG or JPEG formats.</p>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg"
          onChange={handleFileChange}
          className="hidden"
        />
        <Button variant="secondary" size="sm" className="w-full sm:w-auto border-white/10 rounded-lg text-green-success" onClick={handleAvatarClick}>
          Change
        </Button>
      </div>

      {/* Personal Information */}
      <div className="flex flex-col gap-4 rounded-xl border border-border-light p-4">
        <div>
          <h3 className="text-sm font-bold text-white">Personal Information</h3>
          <p className="text-xs text-white-secondary">Modify Your Personal Information</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormInput label="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
          <FormInput label="Email Address" type="email" value={email} placeholder="Enter email address" disabled readOnly className="opacity-60 cursor-not-allowed" />
          <PhoneInput
            key={profile.phone_number + profile.name}
            label="Phone Number"
            onChange={setPhoneNumber}
            value={phoneNumber}
            placeholder="Enter phone number"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-start">
          <Button variant="default" size="lg" className="h-12 w-full sm:w-auto rounded-lg" onClick={handleSave} isLoading={isLoading} disabled={!hasChanges}>
            Save
          </Button>
          <Button variant="secondary" size="lg" className="h-12 w-full sm:w-auto border-green-success rounded-lg" onClick={handleCancel} disabled={!hasChanges}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};