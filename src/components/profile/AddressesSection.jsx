// components/profile/AddressesSection.jsx
import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, MapPin, Loader, Check } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Addresses Section - Updated with better UI and API integration
 * API Endpoints:
 * - GET /user/addresses
 * - POST /user/addresses
 * - PATCH /user/addresses/:id
 * - DELETE /user/addresses/:id
 */

// Mock data - Replace with API call
const mockAddresses = [
  { 
    id: 1, 
    label: "Home", 
    line: "123 Park Street, Apartment 4B", 
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    postalCode: "400001",
    phone: "+91 98765 43210", 
    isDefault: true 
  },
  { 
    id: 2, 
    label: "Office", 
    line: "Tech Park, Floor 8, Sector 5", 
    city: "Bangalore",
    state: "Karnataka", 
    country: "India",
    postalCode: "560001",
    phone: "+91 87654 32109", 
    isDefault: false 
  },
];

// Address Form Component
const AddressForm = ({ address, onSave, onCancel, isEditing }) => {
  const [formData, setFormData] = useState({
    label: address?.label || '',
    line: address?.line || '',
    city: address?.city || '',
    state: address?.state || '',
    country: address?.country || '',
    postalCode: address?.postalCode || '',
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
    <form onSubmit={handleSubmit} className="bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-4">
      <h4 className="font-semibold text-gray-900">
        {isEditing ? 'Edit Address' : 'Add New Address'}
      </h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address Label *
          </label>
          <input
            type="text"
            value={formData.label}
            onChange={(e) => setFormData({ ...formData, label: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Home, Office, etc."
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="+91 98765 43210"
            required
            disabled={loading}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address Line *
          </label>
          <textarea
            value={formData.line}
            onChange={(e) => setFormData({ ...formData, line: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows="2"
            placeholder="Full street address"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City *
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="City"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State *
          </label>
          <input
            type="text"
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="State"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Postal Code *
          </label>
          <input
            type="text"
            value={formData.postalCode}
            onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="PIN code"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country *
          </label>
          <input
            type="text"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Country"
            required
            disabled={loading}
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isDefault"
          checked={formData.isDefault}
          onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
          className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          disabled={loading}
        />
        <label htmlFor="isDefault" className="ml-2 text-sm text-gray-700">
          Set as default address
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading && <Loader className="w-4 h-4 animate-spin" />}
          {isEditing ? 'Update Address' : 'Add Address'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-6 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

// Address Item Component
const AddressItem = ({ address, onEdit, onDelete, onSetDefault, loading }) => (
  <div className="flex flex-col md:flex-row md:items-start justify-between p-6 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
    <div className="flex-1">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          <div className="text-lg font-semibold text-gray-900">
            {address.label}
          </div>
        </div>
        {address.isDefault && (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
            <Check className="w-3 h-3" />
            Default
          </span>
        )}
      </div>
      
      <div className="space-y-2 text-gray-600">
        <p className="text-sm">{address.line}</p>
        <p className="text-sm">
          {address.city}, {address.state}, {address.country} - {address.postalCode}
        </p>
        <p className="text-sm font-medium">{address.phone}</p>
      </div>
    </div>
    
    <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0 md:ml-6">
      {!address.isDefault && (
        <button
          onClick={() => onSetDefault(address.id)}
          disabled={loading}
          className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200 disabled:opacity-50 transition-colors"
        >
          Set Default
        </button>
      )}
      <button
        onClick={() => onEdit(address)}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-300 disabled:opacity-50 transition-colors"
      >
        <Edit className="w-4 h-4" />
        Edit
      </button>
      <button
        onClick={() => onDelete(address.id)}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg border border-red-200 disabled:opacity-50 transition-colors"
      >
        <Trash2 className="w-4 h-4" />
        Remove
      </button>
    </div>
  </div>
);

// Empty State
const EmptyAddresses = ({ onAddNew, loading }) => (
  <div className="text-center py-12">
    <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
    <h3 className="text-lg font-semibold text-gray-900 mb-2">No addresses saved</h3>
    <p className="text-gray-600 mb-6">Add your first address for faster checkout</p>
    <button
      onClick={onAddNew}
      disabled={loading}
      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
    >
      <Plus className="w-5 h-5" />
      Add Your First Address
    </button>
  </div>
);

// Main Component
export default function AddressesSection() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingAddress, setEditingAddress] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Replace with API call
      // const response = await addressAPI.getAddresses();
      // setAddresses(response.data);
      
      setTimeout(() => {
        setAddresses(mockAddresses);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to load addresses');
      setAddresses(mockAddresses);
      setLoading(false);
    }
  };

  const handleAddAddress = async (addressData) => {
    try {
      setActionLoading(true);
      setError(null);
      
      // TODO: Replace with API call
      const newAddress = {
        id: Date.now(),
        ...addressData
      };
      
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
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateAddress = async (addressId, updates) => {
    try {
      setActionLoading(true);
      setError(null);
      
      const updatedAddress = { id: addressId, ...updates };
      setAddresses(prev => prev.map(addr => 
        addr.id === addressId ? { ...addr, ...updatedAddress } : addr
      ));
      
      setEditingAddress(null);
    } catch (err) {
      setError('Failed to update address');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (!window.confirm('Are you sure you want to delete this address?')) return;

    try {
      setActionLoading(true);
      setError(null);
      
      setAddresses(prev => prev.filter(addr => addr.id !== addressId));
    } catch (err) {
      setError('Failed to delete address');
    } finally {
      setActionLoading(false);
    }
  };

  const handleSetDefault = async (addressId) => {
    try {
      setActionLoading(true);
      setError(null);
      
      setAddresses(prev => 
        prev.map(addr => ({
          ...addr,
          isDefault: addr.id === addressId
        }))
      );
    } catch (err) {
      setError('Failed to set default address');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[1, 2].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Delivery Addresses</h3>
          <p className="text-gray-600 mt-1">Manage your delivery locations</p>
        </div>
        
        <div className="flex items-center gap-4">
          {addresses.length > 0 && (
            <button
              onClick={() => setShowAddForm(true)}
              disabled={actionLoading}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add New
            </button>
          )}
          <Link 
            to="/profile/addresses" 
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Manage All
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-700 text-sm">{error}</p>
        </div>
      )}

      {showAddForm && (
        <div className="mb-6">
          <AddressForm
            onSave={handleAddAddress}
            onCancel={() => setShowAddForm(false)}
            isEditing={false}
          />
        </div>
      )}

      {editingAddress && (
        <div className="mb-6">
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
        <div className="space-y-4">
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
        </div>
      )}
    </div>
  );
}