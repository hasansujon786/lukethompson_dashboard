export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

export interface DashboardStats {
  totalUsers: number;
  monthlyRevenue: number;
  proSubscribers: number;
  stopsToday: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
}

export interface PlanBreakdown {
  name: string;
  value: number;
  color: string;
  subscribers: number;
}
