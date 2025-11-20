// src/components/profile/AddressesSection.jsx
import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, MapPin, Loader } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Delivery addresses with full CRUD operations
 */

// API service functions with proper error handling
const addressAPI = {
  // Fetch addresses from API
  getAddresses: async () => {
    try {
      const response = await fetch('/api/user/addresses', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned non-JSON response');
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error in getAddresses:', error);
      throw error;
    }
  },

  // Update address using PATCH
  updateAddress: async (addressId, updates) => {
    try {
      const response = await fetch(`/api/user/addresses/${addressId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updates),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error in updateAddress:', error);
      throw error;
    }
  },

  // Delete address
  deleteAddress: async (addressId) => {
    try {
      const response = await fetch(`/api/user/addresses/${addressId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error in deleteAddress:', error);
      throw error;
    }
  },

  // Add new address
  addAddress: async (addressData) => {
    try {
      const response = await fetch('/api/user/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(addressData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error in addAddress:', error);
      throw error;
    }
  }
};

// Mock data for development
const mockAddresses = [
  { 
    id: 1, 
    label: "Home", 
    line: "23, Park Lane, Lagos", 
    phone: "+2348123456789", 
    isDefault: true 
  },
  { 
    id: 2, 
    label: "Office", 
    line: "Block B, Business Park", 
    phone: "+2348098765432", 
    isDefault: false 
  },
];

// Status color mapping
const statusColors = {
  Delivered: "text-green-600 dark:text-green-400",
  Shipped: "text-blue-600 dark:text-blue-400",
  Processing: "text-yellow-600 dark:text-yellow-400",
  Cancelled: "text-red-600 dark:text-red-400",
};

// Address form component
const AddressForm = ({ address, onSave, onCancel, isEditing }) => {
  const [formData, setFormData] = useState({
    label: address?.label || '',
    line: address?.line || '',
    phone: address?.phone || '',
    isDefault: address?.isDefault || false
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
    } catch (error) {
      console.error('Error saving address:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
          Address Label *
        </label>
        <input
          type="text"
          value={formData.label}
          onChange={(e) => setFormData({ ...formData, label: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100"
          placeholder="Home, Office, etc."
          required
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
          Address *
        </label>
        <textarea
          value={formData.line}
          onChange={(e) => setFormData({ ...formData, line: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100"
          rows="3"
          placeholder="Full delivery address"
          required
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
          Phone Number *
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100"
          placeholder="+2348123456789"
          required
          disabled={loading}
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isDefault"
          checked={formData.isDefault}
          onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          disabled={loading}
        />
        <label htmlFor="isDefault" className="ml-2 text-sm text-gray-700 dark:text-slate-300">
          Set as default address
        </label>
      </div>

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading && <Loader className="w-4 h-4 animate-spin" />}
          {isEditing ? 'Update Address' : 'Add Address'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-4 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 text-sm font-medium rounded-md hover:bg-gray-50 dark:hover:bg-slate-600 disabled:opacity-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

// Address item component
const AddressItem = ({ address, onEdit, onDelete, onSetDefault, loading }) => (
  <li className="flex items-start justify-between p-4 border border-gray-200 dark:border-slate-600 rounded-lg">
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <div className="text-sm font-medium text-gray-800 dark:text-slate-200">
          {address.label}
        </div>
        {address.isDefault && (
          <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
            Default
          </span>
        )}
      </div>
      <div className="text-sm text-gray-600 dark:text-slate-300 mb-1 flex items-start gap-1">
        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <span>{address.line}</span>
      </div>
      <div className="text-xs text-gray-500 dark:text-slate-400">
        {address.phone}
      </div>
    </div>
    <div className="flex flex-col gap-2 ml-4">
      {!address.isDefault && (
        <button
          onClick={() => onSetDefault(address.id)}
          disabled={loading}
          className="text-xs px-3 py-1 border border-gray-300 dark:border-slate-600 rounded text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 transition-colors"
        >
          Set Default
        </button>
      )}
      <button
        onClick={() => onEdit(address)}
        disabled={loading}
        className="text-xs px-3 py-1 border border-gray-300 dark:border-slate-600 rounded text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 transition-colors flex items-center gap-1"
      >
        <Edit className="w-3 h-3" />
        Edit
      </button>
      <button
        onClick={() => onDelete(address.id)}
        disabled={loading}
        className="text-xs px-3 py-1 border border-red-200 dark:border-red-800 rounded text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 disabled:opacity-50 transition-colors flex items-center gap-1"
      >
        <Trash2 className="w-3 h-3" />
        Remove
      </button>
    </div>
  </li>
);

// Empty state component
const EmptyAddresses = ({ onAddNew, loading }) => (
  <div className="text-center py-8">
    <MapPin className="w-12 h-12 text-gray-300 dark:text-slate-600 mx-auto mb-3" />
    <p className="text-gray-500 dark:text-slate-400 text-sm mb-4">No addresses saved yet</p>
    <button
      onClick={onAddNew}
      disabled={loading}
      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
    >
      <Plus className="w-4 h-4" />
      Add Your First Address
    </button>
  </div>
);

// Main component
export default function AddressesSection() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingAddress, setEditingAddress] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Load addresses on component mount
  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await addressAPI.getAddresses();
      setAddresses(data);
    } catch (err) {
      console.error('Error loading addresses:', err);
      setError('Failed to load addresses. Using demo data.');
      // Fallback to mock data for demonstration
      setAddresses(mockAddresses);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAddress = async (addressId, updates) => {
    try {
      setActionLoading(true);
      setError(null);
      
      // For demo purposes, update locally
      // In production, uncomment the API call:
      // const updatedAddress = await addressAPI.updateAddress(addressId, updates);
      
      const updatedAddress = { id: addressId, ...updates };
      setAddresses(prev => prev.map(addr => 
        addr.id === addressId ? { ...addr, ...updatedAddress } : addr
      ));
      
      setEditingAddress(null);
    } catch (err) {
      setError('Failed to update address');
      console.error('Error updating address:', err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (!window.confirm('Are you sure you want to delete this address?')) return;

    try {
      setActionLoading(true);
      setError(null);
      
      // For demo purposes, delete locally
      // In production, uncomment the API call:
      // await addressAPI.deleteAddress(addressId);
      
      setAddresses(prev => prev.filter(addr => addr.id !== addressId));
    } catch (err) {
      setError('Failed to delete address');
      console.error('Error deleting address:', err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddAddress = async (addressData) => {
    try {
      setActionLoading(true);
      setError(null);
      
      // For demo purposes, add locally
      // In production, uncomment the API call:
      // const newAddress = await addressAPI.addAddress(addressData);
      
      const newAddress = {
        id: Date.now(), // Temporary ID for demo
        ...addressData
      };
      
      // If setting as default, update other addresses
      if (addressData.isDefault) {
        setAddresses(prev => 
          prev.map(addr => ({ ...addr, isDefault: false }))
            .concat(newAddress)
        );
      } else {
        setAddresses(prev => [...prev, newAddress]);
      }
      
      setShowAddForm(false);
    } catch (err) {
      setError('Failed to add address');
      console.error('Error adding address:', err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleSetDefault = async (addressId) => {
    try {
      setActionLoading(true);
      setError(null);
      
      // Update all addresses: set the selected one as default, others as non-default
      setAddresses(prev => 
        prev.map(addr => ({
          ...addr,
          isDefault: addr.id === addressId
        }))
      );
      
      // In production, make API call to update default status
      // await addressAPI.updateAddress(addressId, { isDefault: true });
      
    } catch (err) {
      setError('Failed to set default address');
      console.error('Error setting default address:', err);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-gray-200 dark:border-slate-700 shadow-sm">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[1, 2].map(i => (
              <div key={i} className="h-20 bg-gray-200 dark:bg-slate-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-gray-200 dark:border-slate-700 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">
          Delivery Addresses
        </h3>
        <div className="flex items-center gap-4">
          {addresses.length > 0 && (
            <button
              onClick={() => setShowAddForm(true)}
              disabled={actionLoading}
              className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 hover:underline disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              Add New
            </button>
          )}
          <Link 
            to="/profile/addresses" 
            className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
          >
            Manage All
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
          <p className="text-sm text-yellow-700 dark:text-yellow-400">{error}</p>
        </div>
      )}

      {showAddForm && (
        <div className="mb-4">
          <AddressForm
            onSave={handleAddAddress}
            onCancel={() => setShowAddForm(false)}
            isEditing={false}
          />
        </div>
      )}

      {editingAddress && (
        <div className="mb-4">
          <AddressForm
            address={editingAddress}
            onSave={(updates) => handleUpdateAddress(editingAddress.id, updates)}
            onCancel={() => setEditingAddress(null)}
            isEditing={true}
          />
        </div>
      )}

      {addresses.length === 0 && !showAddForm ? (
        <EmptyAddresses 
          onAddNew={() => setShowAddForm(true)} 
          loading={actionLoading}
        />
      ) : (
        <ul className="space-y-3">
          {addresses.map((address) => (
            <AddressItem
              key={address.id}
              address={address}
              onEdit={setEditingAddress}
              onDelete={handleDeleteAddress}
              onSetDefault={handleSetDefault}
              loading={actionLoading}
            />
          ))}
        </ul>
      )}
    </div>
  );
}