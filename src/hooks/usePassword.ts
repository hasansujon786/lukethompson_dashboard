'use client';

import { useState, useCallback, useMemo } from 'react';
import { useSettings } from './useSettings';
import toast from 'react-hot-toast';

export const usePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { handlePasswordChange } = useSettings();

    const errors = useMemo(() => {
        const errs: Record<string, string> = {};
        if (newPassword && newPassword.length < 8) {
            errs.newPassword = 'Must be at least 8 characters';
        }
        if (confirmPassword && newPassword !== confirmPassword) {
            errs.confirmPassword = 'Passwords do not match';
        }
        return errs;
    }, [newPassword, confirmPassword]);

    const hasChanges = !!oldPassword || !!newPassword || !!confirmPassword;

    const handleUpdate = useCallback(async () => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            toast.error('Please fill in all fields');
            return;
        }
        if (Object.keys(errors).length > 0) {
            toast.error('Please fix the errors');
            return;
        }

        setIsLoading(true);
        try {
            const success = await handlePasswordChange({
                old_password: oldPassword,
                new_password: newPassword,
            });
            if (success) {
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
            }
        } catch {
            toast.error('Failed to update password');
        } finally {
            setIsLoading(false);
        }
    }, [oldPassword, newPassword, confirmPassword, errors, handlePasswordChange]);

    const handleCancel = useCallback(() => {
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
    }, []);

    return {
        oldPassword,
        setOldPassword,
        newPassword,
        setNewPassword,
        confirmPassword,
        setConfirmPassword,
        errors,
        hasChanges,
        isLoading,
        handleUpdate,
        handleCancel,
    };
};