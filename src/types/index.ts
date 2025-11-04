// User and Authentication Types
export interface User {
  id: string;
  email: string;
  name: string;
  businessName: string;
  role: 'admin' | 'user';
  avatar?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, businessName: string) => Promise<boolean>;
  logout: () => void;
}

// Product and Inventory Types
export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  price: number;
  stock: number;
  minStock: number;
  category: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StockMovement {
  id: string;
  productId: string;
  productName: string;
  type: 'entrada' | 'salida';
  quantity: number;
  reason: string;
  date: string;
  userId: string;
}

// Customer Types
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  notes?: string;
  createdAt: string;
  totalPurchases: number;
  lastPurchase?: string;
}

// Sales and Invoice Types
export interface SaleItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  discount: number;
  subtotal: number;
}

export interface Sale {
  id: string;
  customerId: string;
  customerName: string;
  items: SaleItem[];
  subtotal: number;
  tax: number;
  taxRate: number;
  discount: number;
  total: number;
  paymentMethod: 'efectivo' | 'tarjeta' | 'transferencia';
  status: 'pagada' | 'pendiente' | 'cancelada';
  date: string;
  notes?: string;
  userId: string;
}

// Finance Types
export interface Transaction {
  id: string;
  date: string;
  concept: string;
  category: string;
  amount: number;
  type: 'ingreso' | 'gasto';
  paymentMethod: 'efectivo' | 'tarjeta' | 'transferencia';
  notes?: string;
  userId: string;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  incomeByCategory: Record<string, number>;
  expensesByCategory: Record<string, number>;
}

// Dashboard Types
export interface DashboardMetrics {
  todaySales: number;
  monthSales: number;
  lowStockProducts: number;
  pendingInvoices: number;
  salesTrend: Array<{ date: string; amount: number }>;
  topProducts: Array<{ name: string; sales: number }>;
  recentSales: Sale[];
}

// Report Types
export interface SalesReport {
  period: string;
  totalSales: number;
  totalRevenue: number;
  averageTicket: number;
  salesByDay: Array<{ date: string; sales: number; revenue: number }>;
  salesByProduct: Array<{ productName: string; quantity: number; revenue: number }>;
  salesByCategory: Array<{ category: string; quantity: number; revenue: number }>;
}

// App Settings Types
export interface AppSettings {
  businessName: string;
  taxRate: number;
  currency: string;
  darkMode: boolean;
  notifications: {
    lowStock: boolean;
    pendingPayments: boolean;
  };
}

// Notification Types
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  read: boolean;
  date: string;
}

// Filter and Pagination Types
export interface Filters {
  search?: string;
  category?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: string;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

// Common Types
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: string;
  direction: SortDirection;
}
