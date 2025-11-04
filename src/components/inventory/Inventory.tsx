import React from 'react';
import { Package } from 'lucide-react';
import { Card } from '../common';

export const Inventory: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Inventario</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Gestiona tus productos y stock
        </p>
      </div>

      <Card>
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Módulo de Inventario
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Este módulo está en desarrollo. Próximamente podrás gestionar tus productos aquí.
          </p>
        </div>
      </Card>
    </div>
  );
};
