import React, { useState } from 'react';
import { LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Input, Alert } from '../common';
import { validateEmail, validatePassword, getErrorMessage } from '../../utils/validators';

export const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    businessName: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const { login, register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    setError('');
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = getErrorMessage('email', 'invalid');
    }

    if (!validatePassword(formData.password)) {
      newErrors.password = getErrorMessage('password', 'invalid');
    }

    if (!isLogin) {
      if (!formData.name.trim()) {
        newErrors.name = getErrorMessage('name', 'required');
      }
      if (!formData.businessName.trim()) {
        newErrors.businessName = 'El nombre del negocio es requerido';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      let success = false;

      if (isLogin) {
        success = await login(formData.email, formData.password);
        if (!success) {
          setError('Credenciales incorrectas. Intenta con: demo@empresa.com / demo123');
        }
      } else {
        success = await register(
          formData.email,
          formData.password,
          formData.name,
          formData.businessName
        );
        if (!success) {
          setError('El correo electrónico ya está registrado');
        }
      }
    } catch (err) {
      setError('Ocurrió un error. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-700 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full mb-4">
            <LogIn className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {isLogin ? 'Bienvenido' : 'Crear Cuenta'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {isLogin
              ? 'Ingresa a tu cuenta para continuar'
              : 'Registra tu negocio y comienza hoy'}
          </p>
        </div>

        {/* Demo credentials info */}
        {isLogin && (
          <Alert
            type="info"
            message="Usuario demo: demo@empresa.com / demo123"
          />
        )}

        {error && (
          <div className="mt-4">
            <Alert type="error" message={error} onClose={() => setError('')} />
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {!isLogin && (
            <>
              <Input
                label="Nombre completo"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="Juan Pérez"
                required
              />
              <Input
                label="Nombre del negocio"
                name="businessName"
                type="text"
                value={formData.businessName}
                onChange={handleChange}
                error={errors.businessName}
                placeholder="Mi Empresa S.A."
                required
              />
            </>
          )}

          <Input
            label="Correo electrónico"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="tu@email.com"
            required
          />

          <Input
            label="Contraseña"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="••••••••"
            required
          />

          <Button
            type="submit"
            variant="primary"
            loading={loading}
            className="w-full"
            icon={isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
          >
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </Button>
        </form>

        {/* Toggle between login/register */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setErrors({});
            }}
            className="text-primary-600 dark:text-primary-400 hover:underline text-sm"
          >
            {isLogin
              ? '¿No tienes cuenta? Regístrate aquí'
              : '¿Ya tienes cuenta? Inicia sesión'}
          </button>
        </div>
      </div>
    </div>
  );
};
