'use client';

import { useState, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { CountryDropdown } from './CountryDropdown';
import { CountryOption, getAllCountries, getMaxLength } from '@/lib/data/countries';

interface PhoneInputProps {
    label: string;
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    defaultCountry?: string;
    error?: string;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
    ({ label, onChange, value = '', placeholder, defaultCountry = 'US', error }, ref) => {
        const allCountries = getAllCountries();

        const getCountryFromValue = (val: string): { country: CountryOption; number: string } => {
            for (const c of allCountries) {
                if (val.startsWith(c.dialCode)) {
                    const number = val.slice(c.dialCode.length);
                    return { country: c, number };
                }
            }
            return { country: allCountries.find(c => c.code === defaultCountry) || allCountries[0], number: val };
        };

        // Initialize from value prop (only on mount)
        const [selectedCountry, setSelectedCountry] = useState<CountryOption>(() => getCountryFromValue(value).country);
        const [phoneNumber, setPhoneNumber] = useState(() => getCountryFromValue(value).number);

        const handleCountrySelect = (country: CountryOption) => {
            setSelectedCountry(country);
            setPhoneNumber('');
            onChange(country.dialCode);
        };

        const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const raw = e.target.value.replace(/\D/g, '');
            const dialCodeDigits = selectedCountry.dialCode.replace(/\D/g, '');
            let numberWithoutCode = raw;

            if (raw.startsWith(dialCodeDigits)) {
                numberWithoutCode = raw.slice(dialCodeDigits.length);
            }

            if (numberWithoutCode.length > getMaxLength(selectedCountry.code)) return;

            const formatted = selectedCountry.dialCode + numberWithoutCode;
            setPhoneNumber(numberWithoutCode);
            onChange(formatted);
        };

        return (
            <div className="flex w-full flex-col gap-2">
                <label className="text-base font-bold text-white">{label}</label>
                <div className={cn(
                    'flex items-center gap-2 rounded border border-white/5 bg-white/8 px-2 focus-within:ring-2 focus-within:ring-green-success transition-all',
                    error && 'border-error-red focus-within:ring-error-red'
                )}>
                    <CountryDropdown selected={selectedCountry} onSelect={handleCountrySelect} />
                    <input
                        ref={ref}
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        placeholder={placeholder || 'Enter phone number'}
                        type="tel"
                        autoComplete="tel"
                        className="flex-1 border-none bg-transparent py-4 text-sm text-white placeholder:text-white-secondary outline-none"
                    />
                </div>
                {error && <span className="text-xs text-error-red">{error}</span>}
            </div>
        );
    }
);

PhoneInput.displayName = 'PhoneInput';