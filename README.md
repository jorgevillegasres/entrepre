# 🚀 SaaS de Gestión Empresarial

Aplicación web moderna y responsive para gestión empresarial dirigida a emprendedores y pequeños negocios.

## ✨ Características

### Módulos Implementados

- **🔐 Autenticación**: Sistema de login/registro simulado
- **📊 Dashboard**: Panel principal con métricas clave, gráficos de ventas y productos más vendidos
- **📦 Inventario**: Gestión de productos (próximamente)
- **💰 Ventas**: Sistema de facturación (próximamente)
- **👥 Clientes**: CRM básico (próximamente)
- **💵 Finanzas**: Control de ingresos y gastos (próximamente)
- **📈 Reportes**: Análisis y reportes (próximamente)

### Características Técnicas

- ⚡️ React 19 con TypeScript
- 🎨 Tailwind CSS v4 para estilos
- 🎯 Zustand para manejo de estado global
- 📱 Diseño responsive (mobile-first)
- 🌙 Modo oscuro incluido
- 📊 Gráficos interactivos con Recharts
- 💾 Persistencia de datos con localStorage
- 🔍 Componentes reutilizables y modulares

## 🛠️ Stack Tecnológico

- **Frontend**: React 19 + TypeScript
- **Estilos**: Tailwind CSS v4
- **Estado**: Zustand + Context API
- **Gráficos**: Recharts
- **Iconos**: Lucide React
- **Utilidades**: date-fns
- **Build**: Vite
- **Almacenamiento**: localStorage (temporal, migración a PostgreSQL planeada)

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+
- npm o yarn

### Instalación

1. **Clonar el repositorio**
```bash
git clone <repo-url>
cd entrepre
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:5173
```

### Credenciales de Prueba

```
Email: demo@empresa.com
Contraseña: demo123
```

## 📦 Scripts Disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Construye la aplicación para producción
npm run preview  # Preview de la build de producción
npm run lint     # Ejecuta el linter
```

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── common/          # Componentes reutilizables (Button, Input, Modal, etc.)
│   ├── layout/          # Layout principal (Sidebar, Header)
│   ├── auth/            # Autenticación
│   ├── dashboard/       # Dashboard y métricas
│   ├── inventory/       # Gestión de inventario
│   ├── sales/           # Ventas y facturación
│   ├── customers/       # CRM de clientes
│   ├── finance/         # Control financiero
│   ├── reports/         # Reportes y análisis
│   └── settings/        # Configuración
├── contexts/            # Context API y Zustand stores
│   ├── AuthContext.tsx
│   └── AppStore.ts
├── hooks/               # Custom hooks
│   ├── useLocalStorage.ts
│   └── useDebounce.ts
├── utils/               # Utilidades
│   ├── formatters.ts    # Formato de moneda, fechas, etc.
│   ├── validators.ts    # Validaciones de formularios
│   └── helpers.ts       # Funciones auxiliares
├── types/               # TypeScript types e interfaces
│   └── index.ts
├── data/                # Datos de ejemplo
│   └── sampleData.ts
├── App.tsx              # Componente principal
├── main.tsx             # Punto de entrada
└── index.css            # Estilos globales
```

## 🎨 Características de UI/UX

### Paleta de Colores

- **Primario**: Azul (#3B82F6)
- **Secundario**: Gris (#6B7280)
- **Éxito**: Verde (#10B981)
- **Advertencia**: Amarillo (#F59E0B)
- **Error**: Rojo (#EF4444)

### Componentes Comunes

- `Button` - Botones con variantes y estados
- `Input` - Campos de texto con validación
- `Select` - Selects personalizados
- `Card` - Tarjetas de contenido
- `Modal` - Modales responsive
- `Table` - Tablas con ordenamiento
- `Alert` - Notificaciones y alertas
- `Badge` - Badges de estado

## 📊 Datos de Ejemplo

La aplicación viene con datos de muestra precargados:

- 30+ productos de ejemplo
- 15 clientes
- 20 transacciones del último mes
- Múltiples categorías (Electrónica, Ropa, Alimentos, etc.)

Los datos se inicializan automáticamente en `localStorage` la primera vez que se ejecuta la aplicación.

## 🔄 Próximos Pasos

### Funcionalidades Planeadas

- [ ] Módulo completo de Inventario
- [ ] Sistema de Ventas y Facturación
- [ ] CRM de Clientes completo
- [ ] Control Financiero detallado
- [ ] Reportes y análisis avanzados
- [ ] Búsqueda global
- [ ] Atajos de teclado
- [ ] Exportación a CSV/PDF
- [ ] Sistema de notificaciones en tiempo real

### Mejoras Técnicas

- [ ] Migración a PostgreSQL
- [ ] API REST con Node.js/Express
- [ ] Autenticación con JWT
- [ ] Multi-tenancy
- [ ] Integración con pasarelas de pago
- [ ] Facturación electrónica
- [ ] PWA (Progressive Web App)
- [ ] App móvil nativa

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Notas de Desarrollo

### Modo Oscuro

El modo oscuro se activa/desactiva desde el botón en el header. La preferencia se guarda en `localStorage` y persiste entre sesiones.

### Persistencia de Datos

Todos los datos se almacenan en `localStorage`:
- `saas_auth_user` - Usuario autenticado
- `saas_users` - Base de usuarios
- `saas_products` - Productos
- `saas_customers` - Clientes
- `saas_sales` - Ventas
- `saas_transactions` - Transacciones
- `saas_stock_movements` - Movimientos de inventario
- `saas_notifications` - Notificaciones
- `saas_settings` - Configuración de la app

### Limpiar Datos

Para resetear la aplicación, ejecuta en la consola del navegador:
```javascript
localStorage.clear();
location.reload();
```

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Autor

Desarrollado con ❤️ usando React + TypeScript + Tailwind CSS

---

**¿Encontraste un bug?** [Reporta un issue](../../issues)
**¿Tienes una sugerencia?** [Abre una discusión](../../discussions)
