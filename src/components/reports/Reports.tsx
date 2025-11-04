import React from 'react';
import { BarChart3 } from 'lucide-react';
import { Card } from '../common';

export const Reports: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Reportes</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Análisis y reportes de tu negocio
        </p>
      </div>

      <Card>
        <div className="text-center py-12">
          <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Módulo de Reportes
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Este módulo está en desarrollo. Próximamente podrás ver reportes detallados aquí.
          </p>
        </div>
      </Card>
    </div>
  );
};
