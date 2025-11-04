# 📱 Instrucciones de Uso - SaaS de Gestión Empresarial

## 🚀 Inicio Rápido

### 1. Instalación
```bash
npm install
```

### 2. Iniciar la Aplicación
```bash
npm run dev
```

### 3. Abrir en el Navegador
```
http://localhost:5173
```

## 🔑 Acceso a la Aplicación

### Credenciales Demo
```
Email: demo@empresa.com
Contraseña: demo123
```

### Crear Nueva Cuenta
1. En la pantalla de login, haz clic en "¿No tienes cuenta? Regístrate aquí"
2. Completa el formulario:
   - Nombre completo
   - Nombre del negocio
   - Email
   - Contraseña (mínimo 6 caracteres)
3. Haz clic en "Registrarse"

## 🎯 Navegación de la Aplicación

### Sidebar (Menú Lateral)
- **Dashboard** 📊 - Vista principal con métricas
- **Inventario** 📦 - Gestión de productos (próximamente)
- **Ventas** 💰 - Sistema de facturación (próximamente)
- **Clientes** 👥 - CRM básico (próximamente)
- **Finanzas** 💵 - Control de ingresos/gastos (próximamente)
- **Reportes** 📈 - Análisis y reportes (próximamente)
- **Configuración** ⚙️ - Ajustes (próximamente)

### Header (Barra Superior)
- **Menú hamburguesa** (móvil) - Abre/cierra el sidebar
- **Nombre del negocio** - Se muestra en el centro
- **Modo oscuro** 🌙 - Toggle para cambiar tema
- **Notificaciones** 🔔 - Ver alertas (próximamente)
- **Menú de usuario** 👤 - Cerrar sesión

## 📊 Dashboard

### Tarjetas de Métricas
1. **Ventas de Hoy** 💵 - Total de ventas del día actual
2. **Ventas del Mes** 📈 - Total acumulado del mes
3. **Productos Stock Bajo** ⚠️ - Cantidad de productos bajo stock mínimo
4. **Facturas Pendientes** 📄 - Número de ventas pendientes de pago

### Gráficos
1. **Ventas Últimos 7 Días** - Línea de tendencia de ventas
2. **Productos Más Vendidos** - Barras con top 5 productos

### Tabla de Ventas Recientes
- Muestra las últimas 5 ventas
- Columnas: ID, Cliente, Total, Estado, Fecha
- Estados: Pagada ✅ | Pendiente ⚠️ | Cancelada ❌

## 🌙 Modo Oscuro

### Activar/Desactivar
1. Haz clic en el icono de luna/sol en el header
2. El cambio es instantáneo
3. La preferencia se guarda automáticamente

## 📱 Versión Móvil

### Acceso al Menú
1. Toca el ícono de hamburguesa (≡) en la esquina superior izquierda
2. El sidebar se deslizará desde la izquierda
3. Selecciona cualquier módulo
4. El menú se cerrará automáticamente

### Navegación Táctil
- Todas las acciones son táctiles
- Los botones tienen un tamaño adecuado para dedos
- El diseño se adapta a pantallas pequeñas

## 💾 Datos y Persistencia

### Almacenamiento
- Todos los datos se guardan en **localStorage**
- Los cambios persisten al cerrar el navegador
- No se requiere conexión a internet

### Datos Precargados
Al iniciar la aplicación por primera vez, se cargan:
- ✅ 30+ productos de ejemplo
- ✅ 15 clientes
- ✅ 20 transacciones
- ✅ Categorías variadas

### Resetear Datos
Para limpiar todos los datos y empezar de cero:

1. **Opción 1: Consola del Navegador**
```javascript
localStorage.clear();
location.reload();
```

2. **Opción 2: Herramientas de Desarrollo**
- Abre DevTools (F12)
- Ve a "Application" > "Local Storage"
- Selecciona tu dominio
- Clic derecho > "Clear"
- Recarga la página

## 🔧 Solución de Problemas

### La aplicación no carga
1. Verifica que el servidor esté corriendo: `npm run dev`
2. Revisa que no haya otro proceso en el puerto 5173
3. Limpia caché del navegador y recarga (Ctrl+Shift+R)

### No veo mis datos
1. Los datos están en localStorage
2. Verifica en DevTools > Application > Local Storage
3. Si no existen, la app los creará automáticamente

### Errores de autenticación
1. Usa las credenciales demo: `demo@empresa.com / demo123`
2. O crea una nueva cuenta
3. Verifica que localStorage esté habilitado en tu navegador

### El modo oscuro no funciona
1. Limpia la caché del navegador
2. Verifica que el toggle esté en el header
3. La preferencia se guarda en `saas_settings`

### Gráficos no se muestran
1. Espera a que carguen los datos
2. Verifica que hay ventas en los datos de ejemplo
3. Recarga la página

## 🎨 Personalización

### Cambiar Nombre del Negocio
Actualmente se toma del usuario al registrarse. En futuras versiones:
- Configuración > Perfil > Nombre del negocio

### Cambiar Tasa de Impuestos
Por defecto es 16% (IVA México). En futuras versiones:
- Configuración > General > Tasa de impuestos

## 📋 Próximas Funcionalidades

### En Desarrollo
- [ ] Módulo completo de Inventario
- [ ] Sistema de Ventas/Facturación
- [ ] CRM de Clientes
- [ ] Control Financiero
- [ ] Reportes Exportables

### Planeadas
- [ ] Búsqueda global (Ctrl+K)
- [ ] Notificaciones en tiempo real
- [ ] Atajos de teclado
- [ ] Exportar a PDF/CSV
- [ ] Multi-idioma

## 💡 Consejos de Uso

### Mejores Prácticas
1. **Mantén el stock actualizado** - Revisa productos con stock bajo
2. **Revisa el dashboard diariamente** - Monitorea tus ventas
3. **Actualiza datos de clientes** - Mantén información al día
4. **Revisa facturas pendientes** - Gestiona tus cobros

### Atajos Planeados (Próximamente)
- `Ctrl+K` - Búsqueda global
- `Ctrl+N` - Nueva venta
- `Ctrl+P` - Nuevo producto
- `Ctrl+C` - Nuevo cliente
- `Esc` - Cerrar modales

## 🆘 Soporte

### Reportar Bugs
Si encuentras algún error:
1. Describe el problema detalladamente
2. Incluye capturas de pantalla si es posible
3. Indica qué navegador usas
4. Menciona los pasos para reproducirlo

### Sugerencias
¿Tienes ideas para mejorar la app?
1. Describe la funcionalidad deseada
2. Explica cómo te ayudaría
3. Proporciona ejemplos si es posible

## 📚 Recursos Adicionales

- **README.md** - Información técnica del proyecto
- **TEST_REPORT.md** - Reporte de pruebas completo
- **package.json** - Dependencias y scripts

---

**Versión**: 1.0.0-MVP
**Última actualización**: 2025-11-04

¡Disfruta usando tu aplicación de gestión empresarial! 🚀
