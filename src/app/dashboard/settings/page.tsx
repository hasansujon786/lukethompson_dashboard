'use client';

import { SettingsSidebar } from '@/components/settings/SettingsSidebar';
import { PasswordSettings } from '@/components/settings/PasswordSettings';
import { NotificationsSettings } from '@/components/settings/NotificationsSettings';
import { useSettings } from '@/hooks/useSettings';
import { GeneralSettings } from '@/components/settings/GeneralSettings';


export default function SettingsPage() {
  const { activeTab, profile, isLoading, handleTabChange, handleProfileUpdate } = useSettings();

  const handleSave = async (payload: { data: Record<string, unknown>; imageFile?: File }) => {
    await handleProfileUpdate(payload);
  };

  return (
    <div className="flex flex-col gap-5 p-4 sm:flex-row sm:p-6">
      {/* Sidebar Navigation */}
      <SettingsSidebar activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Content Area */}
      <div className="flex-1">
        {activeTab === 'general' && (
          <GeneralSettings
            profile={profile}
            isLoading={isLoading}
            onSave={handleSave}
          />
        )}
        {activeTab === 'password' && <PasswordSettings />}
        {activeTab === 'notifications' && <NotificationsSettings />}
      </div>
    </div>
  );
}