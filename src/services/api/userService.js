import API from "../../utils/api-axios";
export const userService = {
  getProfile: async () => {
    try {
      const response = await API.get('/users/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
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
  deleteAccount: async () => {
    try {
      const response = await api.delete('/users/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
export const orderService = {
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
  getOrderById: async (orderId) => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  cancelOrder: async (orderId) => {
    try {
      const response = await api.post(`/orders/${orderId}/cancel`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  trackOrder: async (orderId) => {
    try {
      const response = await api.get(`/orders/${orderId}/track`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
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
export const wishlistService = {
  getWishlist: async () => {
    try {
      const response = await API.get('/wishlist');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  addToWishlist: async (productId) => {
    try {
      const response = await API.post('/wishlist', { productId });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  removeFromWishlist: async (productId) => {
    try {
      const response = await API.delete(`/wishlist/${productId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
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