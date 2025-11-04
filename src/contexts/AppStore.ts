import { create } from 'zustand';
import type { Product, Customer, Sale, Transaction, StockMovement, AppSettings, Notification } from '../types';
import { storage, generateId } from '../utils/helpers';

interface AppState {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Customers
  customers: Customer[];
  addCustomer: (customer: Omit<Customer, 'id' | 'createdAt' | 'totalPurchases'>) => void;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;

  // Sales
  sales: Sale[];
  addSale: (sale: Omit<Sale, 'id' | 'date'>) => void;
  updateSale: (id: string, sale: Partial<Sale>) => void;

  // Transactions (Finance)
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  deleteTransaction: (id: string) => void;

  // Stock Movements
  stockMovements: StockMovement[];
  addStockMovement: (movement: Omit<StockMovement, 'id' | 'date'>) => void;

  // Notifications
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'date' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;

  // Settings
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;

  // Load initial data
  loadData: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  products: [],
  customers: [],
  sales: [],
  transactions: [],
  stockMovements: [],
  notifications: [],
  settings: {
    businessName: 'Mi Empresa',
    taxRate: 16,
    currency: 'MXN',
    darkMode: false,
    notifications: {
      lowStock: true,
      pendingPayments: true,
    },
  },

  // Load data from localStorage
  loadData: () => {
    const products = storage.get<Product[]>('saas_products', []);
    const customers = storage.get<Customer[]>('saas_customers', []);
    const sales = storage.get<Sale[]>('saas_sales', []);
    const transactions = storage.get<Transaction[]>('saas_transactions', []);
    const stockMovements = storage.get<StockMovement[]>('saas_stock_movements', []);
    const notifications = storage.get<Notification[]>('saas_notifications', []);
    const settings = storage.get<AppSettings>('saas_settings', get().settings);

    set({
      products,
      customers,
      sales,
      transactions,
      stockMovements,
      notifications,
      settings,
    });
  },

  // Products
  addProduct: (product) => {
    const newProduct: Product = {
      ...product,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const products = [...get().products, newProduct];
    set({ products });
    storage.set('saas_products', products);
  },

  updateProduct: (id, updates) => {
    const products = get().products.map((p) =>
      p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
    );
    set({ products });
    storage.set('saas_products', products);
  },

  deleteProduct: (id) => {
    const products = get().products.filter((p) => p.id !== id);
    set({ products });
    storage.set('saas_products', products);
  },

  // Customers
  addCustomer: (customer) => {
    const newCustomer: Customer = {
      ...customer,
      id: generateId(),
      createdAt: new Date().toISOString(),
      totalPurchases: 0,
    };

    const customers = [...get().customers, newCustomer];
    set({ customers });
    storage.set('saas_customers', customers);
  },

  updateCustomer: (id, updates) => {
    const customers = get().customers.map((c) => (c.id === id ? { ...c, ...updates } : c));
    set({ customers });
    storage.set('saas_customers', customers);
  },

  deleteCustomer: (id) => {
    const customers = get().customers.filter((c) => c.id !== id);
    set({ customers });
    storage.set('saas_customers', customers);
  },

  // Sales
  addSale: (sale) => {
    const newSale: Sale = {
      ...sale,
      id: generateId(),
      date: new Date().toISOString(),
    };

    // Update inventory
    newSale.items.forEach((item) => {
      const product = get().products.find((p) => p.id === item.productId);
      if (product) {
        get().updateProduct(product.id, {
          stock: product.stock - item.quantity,
        });

        // Add stock movement
        get().addStockMovement({
          productId: product.id,
          productName: product.name,
          type: 'salida',
          quantity: item.quantity,
          reason: `Venta #${newSale.id}`,
          userId: sale.userId,
        });
      }
    });

    // Update customer stats
    const customer = get().customers.find((c) => c.id === sale.customerId);
    if (customer) {
      get().updateCustomer(customer.id, {
        totalPurchases: customer.totalPurchases + 1,
        lastPurchase: newSale.date,
      });
    }

    const sales = [...get().sales, newSale];
    set({ sales });
    storage.set('saas_sales', sales);

    // Add transaction
    get().addTransaction({
      concept: `Venta #${newSale.id}`,
      category: 'Ventas',
      amount: newSale.total,
      type: 'ingreso',
      paymentMethod: newSale.paymentMethod,
      userId: sale.userId,
    });
  },

  updateSale: (id, updates) => {
    const sales = get().sales.map((s) => (s.id === id ? { ...s, ...updates } : s));
    set({ sales });
    storage.set('saas_sales', sales);
  },

  // Transactions
  addTransaction: (transaction) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: generateId(),
      date: new Date().toISOString(),
    };

    const transactions = [...get().transactions, newTransaction];
    set({ transactions });
    storage.set('saas_transactions', transactions);
  },

  deleteTransaction: (id) => {
    const transactions = get().transactions.filter((t) => t.id !== id);
    set({ transactions });
    storage.set('saas_transactions', transactions);
  },

  // Stock Movements
  addStockMovement: (movement) => {
    const newMovement: StockMovement = {
      ...movement,
      id: generateId(),
      date: new Date().toISOString(),
    };

    const stockMovements = [...get().stockMovements, newMovement];
    set({ stockMovements });
    storage.set('saas_stock_movements', stockMovements);
  },

  // Notifications
  addNotification: (notification) => {
    const newNotification: Notification = {
      ...notification,
      id: generateId(),
      date: new Date().toISOString(),
      read: false,
    };

    const notifications = [...get().notifications, newNotification];
    set({ notifications });
    storage.set('saas_notifications', notifications);
  },

  markNotificationRead: (id) => {
    const notifications = get().notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    set({ notifications });
    storage.set('saas_notifications', notifications);
  },

  clearNotifications: () => {
    set({ notifications: [] });
    storage.remove('saas_notifications');
  },

  // Settings
  updateSettings: (updates) => {
    const settings = { ...get().settings, ...updates };
    set({ settings });
    storage.set('saas_settings', settings);

    // Update dark mode class on HTML element
    if (updates.darkMode !== undefined) {
      if (updates.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  },
}));
