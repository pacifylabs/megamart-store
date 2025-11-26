import API from "../../utils/api-axios";

// User-related API calls
export const userService = {
  // Get current user's profile
  getProfile: async () => {
    try {
      const response = await API.get('/users/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      const userString = localStorage.getItem('user');
      if (!userString) {
        throw new Error('User not authenticated');
      }
      
      const user = JSON.parse(userString);
      const userId = user?.id;
      
      if (!userId) {
        throw new Error('User ID not found in user data');
      }

      // Caller (AuthContext) is responsible for sending only allowed fields
      const response = await API.patch(`/users/${userId}`, userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.data) {
        throw new Error('No data received from server');
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await API.put('/users/change-password', {
        currentPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Upload profile picture
  uploadProfilePicture: async (file) => {
    if (!file) {
      throw new Error('No file provided for upload');
    }
    
    const formData = new FormData();
    formData.append('avatar', file);
    
    try {
      const response = await api.post('/users/me/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
     throw error;
    }
  },

  // Delete user account
  deleteAccount: async () => {
    try {
      const response = await api.delete('/users/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Order-related API calls
export const orderService = {
  // Get user's orders
  getOrders: async (limit = 10, page = 1) => {
    try {
      const response = await api.get('/orders', {
        params: { limit, page }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get order details by ID
  getOrderById: async (orderId) => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Cancel an order
  cancelOrder: async (orderId) => {
    try {
      const response = await api.post(`/orders/${orderId}/cancel`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Track order
  trackOrder: async (orderId) => {
    try {
      const response = await api.get(`/orders/${orderId}/track`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Request return/refund
  requestReturn: async (orderId, items, reason) => {
    try {
      const response = await api.post(`/orders/${orderId}/return`, {
        items,
        reason
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Wishlist-related API calls
export const wishlistService = {
  // Get user's wishlist
  getWishlist: async () => {
    try {
      const response = await API.get('/wishlist');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Add item to wishlist
  addToWishlist: async (productId) => {
    try {
      const response = await API.post('/wishlist', { productId });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Remove item from wishlist
  removeFromWishlist: async (productId) => {
    try {
      const response = await API.delete(`/wishlist/${productId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Move item from wishlist to cart
  moveToCart: async (productId, quantity = 1) => {
    try {
      const response = await API.post(`/wishlist/${productId}/move-to-cart`, { quantity });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default {
  user: userService,
  order: orderService,
  wishlist: wishlistService
};