export type SettingsTab = 'general' | 'password' | 'notifications';

export interface ProfileData {
    name: string;
    email: string;
    phone_number: string;
    avatar?: string;
}