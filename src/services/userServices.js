// services/api/userService.js
import API from '../../utils/api-axios';
import { ERROR_MESSAGES } from '../../common/types';

/**
 * User profile API service
 */
export const userService = {
  // Get user profile
  getProfile: async (userId) => {
    try {
      const response = await API.get(`/users/${userId}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return {
        success: false,
        error: error.response?.data?.message || ERROR_MESSAGES.NETWORK_ERROR
      };
    }
  },

  // Update user profile
  updateProfile: async (userId, userData) => {
    try {
      const response = await API.patch(`/users/${userId}`, userData);
      return {
        success: true,
        data: response.data,
        message: 'Profile updated successfully'
      };
    } catch (error) {
      console.error('Error updating user profile:', error);
      return {
        success: false,
        error: error.response?.data?.message || ERROR_MESSAGES.NETWORK_ERROR,
        errors: error.response?.data?.errors
      };
    }
  },

  // Upload profile image
  uploadProfileImage: async (userId, imageFile) => {
    try {
      const formData = new FormData();
      formData.append('profileImage', imageFile);
      
      const response = await API.post(`/users/${userId}/profile-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return {
        success: true,
        data: response.data,
        message: 'Profile image updated successfully'
      };
    } catch (error) {
      console.error('Error uploading profile image:', error);
      return {
        success: false,
        error: error.response?.data?.message || ERROR_MESSAGES.NETWORK_ERROR
      };
    }
  },

  // Change password
  changePassword: async (userId, passwordData) => {
    try {
      const response = await API.post(`/users/${userId}/change-password`, passwordData);
      return {
        success: true,
        message: 'Password changed successfully'
      };
    } catch (error) {
      console.error('Error changing password:', error);
      return {
        success: false,
        error: error.response?.data?.message || ERROR_MESSAGES.NETWORK_ERROR,
        errors: error.response?.data?.errors
      };
    }
  }
};

/**
 * Orders API service
 */
export const orderService = {
  // Get user orders
  getOrders: async (params = {}) => {
    try {
      const response = await API.get('/orders', { params });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching orders:', error);
      return {
        success: false,
        error: error.response?.data?.message || ERROR_MESSAGES.NETWORK_ERROR
      };
    }
  },

  // Get order details
  getOrder: async (orderId) => {
    try {
      const response = await API.get(`/orders/${orderId}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching order:', error);
      return {
        success: false,
        error: error.response?.data?.message || ERROR_MESSAGES.NETWORK_ERROR
      };
    }
  }
};

/**
 * Wishlist API service
 */
export const wishlistService = {
  // Get user wishlist
  getWishlist: async () => {
    try {
      const response = await API.get('/wishlist');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      return {
        success: false,
        error: error.response?.data?.message || ERROR_MESSAGES.NETWORK_ERROR
      };
    }
  },

  // Add item to wishlist
  addToWishlist: async (productId) => {
    try {
      const response = await API.post('/wishlist', { productId });
      return {
        success: true,
        data: response.data,
        message: 'Added to wishlist'
      };
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      return {
        success: false,
        error: error.response?.data?.message || ERROR_MESSAGES.NETWORK_ERROR
      };
    }
  },

  // Remove item from wishlist
  removeFromWishlist: async (productId) => {
    try {
      const response = await API.delete(`/wishlist/${productId}`);
      return {
        success: true,
        message: 'Removed from wishlist'
      };
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      return {
        success: false,
        error: error.response?.data?.message || ERROR_MESSAGES.NETWORK_ERROR
      };
    }
  }
};