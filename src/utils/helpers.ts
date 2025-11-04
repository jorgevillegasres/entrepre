import type { Product, Sale, Customer } from '../types';

/**
 * Generate a unique ID
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Calculate sale total with tax and discount
 */
export const calculateSaleTotal = (
  subtotal: number,
  taxRate: number,
  discount: number = 0
): { tax: number; total: number } => {
  const discountedSubtotal = subtotal - discount;
  const tax = discountedSubtotal * (taxRate / 100);
  const total = discountedSubtotal + tax;

  return { tax, total };
};

/**
 * Check if product has low stock
 */
export const isLowStock = (product: Product): boolean => {
  return product.stock <= product.minStock;
};

/**
 * Get products with low stock
 */
export const getLowStockProducts = (products: Product[]): Product[] => {
  return products.filter(isLowStock);
};

/**
 * Filter items by search term
 */
export const filterBySearch = <T extends Record<string, any>>(
  items: T[],
  searchTerm: string,
  fields: (keyof T)[]
): T[] => {
  if (!searchTerm.trim()) return items;

  const lowercaseSearch = searchTerm.toLowerCase();

  return items.filter((item) =>
    fields.some((field) => {
      const value = item[field];
      return String(value).toLowerCase().includes(lowercaseSearch);
    })
  );
};

/**
 * Sort items by field
 */
export const sortItems = <T extends Record<string, any>>(
  items: T[],
  field: keyof T,
  direction: 'asc' | 'desc' = 'asc'
): T[] => {
  return [...items].sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];

    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};

/**
 * Paginate items
 */
export const paginateItems = <T>(
  items: T[],
  page: number,
  pageSize: number
): { items: T[]; totalPages: number } => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedItems = items.slice(startIndex, endIndex);
  const totalPages = Math.ceil(items.length / pageSize);

  return { items: paginatedItems, totalPages };
};

/**
 * Calculate customer statistics
 */
export const calculateCustomerStats = (
  customer: Customer,
  sales: Sale[]
): { totalPurchases: number; totalSpent: number; lastPurchase?: string } => {
  const customerSales = sales.filter((sale) => sale.customerId === customer.id);

  const totalPurchases = customerSales.length;
  const totalSpent = customerSales.reduce((sum, sale) => sum + sale.total, 0);
  const lastPurchase = customerSales.length > 0
    ? customerSales.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0].date
    : undefined;

  return { totalPurchases, totalSpent, lastPurchase };
};

/**
 * Export data to CSV
 */
export const exportToCSV = (data: any[], filename: string): void => {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map((row) =>
      headers.map((header) => {
        const value = row[header];
        // Escape commas and quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    ),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Local storage helpers
 */
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error);
      return defaultValue;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  },

  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};
