import React, { useMemo } from 'react';
import { DollarSign, AlertTriangle, FileText, TrendingUp } from 'lucide-react';
import { useAppStore } from '../../contexts/AppStore';
import { Card, Table, type Column, Badge } from '../common';
import { StatCard } from './StatCard';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { isLowStock } from '../../utils/helpers';
import type { Sale } from '../../types';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { startOfDay, subDays, format } from 'date-fns';
import { es } from 'date-fns/locale';

export const Dashboard: React.FC = () => {
  const { products, sales } = useAppStore();

  // Calculate metrics
  const metrics = useMemo(() => {
    const today = startOfDay(new Date());
    const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // Today's sales
    const todaySales = sales
      .filter((sale) => startOfDay(new Date(sale.date)).getTime() === today.getTime())
      .reduce((sum, sale) => sum + sale.total, 0);

    // Month sales
    const monthSales = sales
      .filter((sale) => new Date(sale.date) >= thisMonth)
      .reduce((sum, sale) => sum + sale.total, 0);

    // Low stock products
    const lowStockCount = products.filter(isLowStock).length;

    // Pending invoices
    const pendingInvoices = sales.filter((sale) => sale.status === 'pendiente').length;

    return {
      todaySales,
      monthSales,
      lowStockCount,
      pendingInvoices,
    };
  }, [products, sales]);

  // Sales trend for last 7 days
  const salesTrend = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(new Date(), 6 - i);
      const dayStart = startOfDay(date);

      const daySales = sales
        .filter((sale) => {
          const saleDate = startOfDay(new Date(sale.date));
          return saleDate.getTime() === dayStart.getTime();
        })
        .reduce((sum, sale) => sum + sale.total, 0);

      return {
        date: format(date, 'EEE', { locale: es }),
        amount: daySales,
      };
    });

    return last7Days;
  }, [sales]);

  // Top products
  const topProducts = useMemo(() => {
    const productSales = new Map<string, { name: string; quantity: number; revenue: number }>();

    sales.forEach((sale) => {
      sale.items.forEach((item) => {
        const existing = productSales.get(item.productId) || {
          name: item.productName,
          quantity: 0,
          revenue: 0,
        };

        productSales.set(item.productId, {
          name: item.productName,
          quantity: existing.quantity + item.quantity,
          revenue: existing.revenue + item.subtotal,
        });
      });
    });

    return Array.from(productSales.values())
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }, [sales]);

  // Recent sales
  const recentSales = useMemo(() => {
    return [...sales]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  }, [sales]);

  const salesColumns: Column<Sale>[] = [
    {
      key: 'id',
      label: 'ID',
      render: (sale: Sale) => <span className="font-mono text-xs">#{sale.id.slice(0, 8)}</span>,
    },
    {
      key: 'customerName',
      label: 'Cliente',
    },
    {
      key: 'total',
      label: 'Total',
      render: (sale: Sale) => <span className="font-semibold">{formatCurrency(sale.total)}</span>,
    },
    {
      key: 'status',
      label: 'Estado',
      render: (sale: Sale) => (
        <Badge
          variant={
            sale.status === 'pagada'
              ? 'success'
              : sale.status === 'pendiente'
              ? 'warning'
              : 'danger'
          }
        >
          {sale.status}
        </Badge>
      ),
    },
    {
      key: 'date',
      label: 'Fecha',
      render: (sale: Sale) => formatDate(sale.date),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Resumen general de tu negocio
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Ventas de Hoy"
          value={formatCurrency(metrics.todaySales)}
          icon={DollarSign}
          color="green"
        />
        <StatCard
          title="Ventas del Mes"
          value={formatCurrency(metrics.monthSales)}
          icon={TrendingUp}
          color="blue"
        />
        <StatCard
          title="Productos Stock Bajo"
          value={metrics.lowStockCount}
          icon={AlertTriangle}
          color="yellow"
        />
        <StatCard
          title="Facturas Pendientes"
          value={metrics.pendingInvoices}
          icon={FileText}
          color="red"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales trend */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Ventas Últimos 7 Días
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis dataKey="date" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#F3F4F6',
                }}
                formatter={(value: number) => formatCurrency(value)}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ fill: '#3B82F6', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Top products */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Productos Más Vendidos
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#F3F4F6',
                }}
                formatter={(value: number) => formatCurrency(value)}
              />
              <Bar dataKey="revenue" fill="#10B981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent sales table */}
      <Card padding={false}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Ventas Recientes
          </h3>
        </div>
        <Table data={recentSales} columns={salesColumns} emptyMessage="No hay ventas registradas" />
      </Card>
    </div>
  );
};
