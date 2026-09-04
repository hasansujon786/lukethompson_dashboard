export type UserStatus = "PENDING" | "APPROVED" | "BANNED";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  phone_number?: string | null;
  phone?: string;
  role: "admin" | "user";
  type?: "admin" | "user";
  subscription_plan?: string;
  subscription?: string;
  plan?: string;
  total_stops?: number;
  stops?: number;
  created_at?: string;
  createdAt: string;
  updatedAt: string;
  joiningDate?: string;
  status?: UserStatus;
  age?: number;
  founding_member?: boolean;
}

export interface StopLog {
  id: string;
  address: string;
  arrived_at: string;
  docked_at: string;
  completed_at: string;
  departed_at: string;
  detention: string;
}

export interface StopLogsResponse {
  success: boolean;
  message: string;
  data: StopLog[];
  meta_data: {
    next_cursor: string | null;
    limit: number;
  };
}

export interface StopLogsQueryParams {
  cursor?: string;
  limit?: number;
  search?: string;
  status?: string;
}

export interface ApiPaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta_data: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface UsersQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyOTPRequest {
  email: string;
  otp: string;
}

export interface ResetPasswordRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  emailForReset: string | null;
  resetToken: string | null;
}

export interface PasswordValidation {
  hasMinLength: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}
