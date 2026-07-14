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

export interface StatsSummaryResponse {
  total_user: number;
  monthly_revenue: string;
  pro_subscriber: number;
  stops_today: number;
}

export interface RevenueChartItem {
  month: string;
  revenue: string;
}

export interface PlanStatItem {
  plan: string;
  count: number;
}

export interface PlanStatsResponse {
  total_users: number;
  plans: PlanStatItem[];
}