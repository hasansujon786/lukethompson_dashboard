export const APP_CONFIG = {
  name: "DetentionPay",
  description: "Admin Dashboard for DetentionPay",
  apiUrl: process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3001/api",
  otpTimeout: 59,
  tokenRefreshInterval: 14 * 60 * 1000,
} as const;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  USER_EMAIL: "userEmail",
  REMEMBER_ME: "rememberMe",
} as const;
