/**
 * Validate email format
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * At least 6 characters
 */
export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

/**
 * Validate phone number (10 digits)
 */
export const validatePhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 10;
};

/**
 * Validate required field
 */
export const validateRequired = (value: string | number | undefined | null): boolean => {
  if (value === undefined || value === null) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  return true;
};

/**
 * Validate positive number
 */
export const validatePositiveNumber = (value: number): boolean => {
  return !isNaN(value) && value > 0;
};

/**
 * Validate non-negative number
 */
export const validateNonNegativeNumber = (value: number): boolean => {
  return !isNaN(value) && value >= 0;
};

/**
 * Validate SKU format (alphanumeric, no spaces)
 */
export const validateSKU = (sku: string): boolean => {
  const skuRegex = /^[A-Z0-9-]+$/i;
  return skuRegex.test(sku);
};

/**
 * Form error messages
 */
export const getErrorMessage = (field: string, error: string): string => {
  const messages: Record<string, Record<string, string>> = {
    email: {
      required: 'El correo electrónico es requerido',
      invalid: 'Ingresa un correo electrónico válido',
    },
    password: {
      required: 'La contraseña es requerida',
      invalid: 'La contraseña debe tener al menos 6 caracteres',
    },
    phone: {
      required: 'El teléfono es requerido',
      invalid: 'Ingresa un teléfono válido (10 dígitos)',
    },
    name: {
      required: 'El nombre es requerido',
    },
    price: {
      required: 'El precio es requerido',
      invalid: 'El precio debe ser un número positivo',
    },
    stock: {
      required: 'El stock es requerido',
      invalid: 'El stock debe ser un número no negativo',
    },
    sku: {
      required: 'El SKU es requerido',
      invalid: 'El SKU solo puede contener letras, números y guiones',
    },
  };

  return messages[field]?.[error] || `Error en ${field}`;
};
