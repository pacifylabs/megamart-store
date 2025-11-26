// types/user.types.js
/**
 * User type definitions for consistent data structure
 */

export const UserRoles = {
  USER: 'user',
  ADMIN: 'admin',
  VENDOR: 'vendor'
};

export const OrderStatus = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

export const AddressType = {
  HOME: 'home',
  OFFICE: 'office',
  OTHER: 'other'
};

// User profile data structure
export const userProfileSchema = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  dateOfBirth: '',
  gender: '',
  address: '',
  city: '',
  country: '',
  postalCode: '',
  profileImageUrl: '',
  isVerified: false,
  roles: [UserRoles.USER],
  createdAt: '',
  updatedAt: ''
};

// API Response structures
export const API_RESPONSE = {
  SUCCESS: 'success',
  ERROR: 'error'
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Session expired. Please login again.',
  NOT_FOUND: 'Resource not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.'
};