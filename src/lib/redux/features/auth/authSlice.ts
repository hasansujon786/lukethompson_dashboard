import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "@/types";

const initialState: AuthState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    emailForReset: null,
    resetToken: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{
                user: User;
                accessToken: string;
                refreshToken: string;
            }>,
        ) => {
            const { user, accessToken, refreshToken } = action.payload;
            state.user = user;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.isAuthenticated = true;
            state.error = null;
        },

        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
        },

        clearError: (state) => {
            state.error = null;
        },

        setEmailForReset: (state, action: PayloadAction<string>) => {
            state.emailForReset = action.payload;
        },

        setResetToken: (state, action: PayloadAction<string>) => {
            state.resetToken = action.payload;
        },

        clearEmailForReset: (state) => {
            state.emailForReset = null;
            state.resetToken = null;
        },

        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            state.error = null;
            state.emailForReset = null;
        },

        updateUser: (state, action: PayloadAction<Partial<User>>) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            }
        },
    },
});

export const {
    setCredentials,
    setError,
    clearError,
    setEmailForReset,
    setResetToken,
    clearEmailForReset,
    logout,
    updateUser,
} = authSlice.actions;

export const authReducer = authSlice.reducer;