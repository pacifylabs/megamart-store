import { User, Mail, Phone, MapPin, Save, Calendar, Globe, Edit } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import API from "../../utils/api-axios";

export default function ProfileForm() {
  const { user: authUser, handleLogin } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    country: "",
    postalCode: ""
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Initialize form with auth user data
  useEffect(() => {
    if (authUser) {
      setFormData({
        firstName: authUser.firstName || "",
        lastName: authUser.lastName || "",
        email: authUser.email || "",
        phone: authUser.phone || "",
        dateOfBirth: authUser.dateOfBirth ? formatDateForInput(authUser.dateOfBirth) : "",
        gender: authUser.gender || "",
        address: authUser.address || "",
        city: authUser.city || "",
        country: authUser.country || "",
        postalCode: authUser.postalCode || ""
      });
      setFetchLoading(false);
    }
  }, [authUser]);

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    } catch (error) {
      console.error("Error formatting date:", error);
      return "";
    }
  };

  const updateUserProfile = async (userData) => {
    try {
      setLoading(true);
      setError("");
      
      const userId = authUser?.id;
      if (!userId) {
        throw new Error("User ID not found");
      }

      console.log("Updating user profile with data:", userData);
      
      // Make API call to update user
      const response = await API.put(`/users/${userId}`, userData);
      const updatedUser = response.data;
      
      console.log("Profile update response:", updatedUser);
      
      // Update auth context with new user data
      if (handleLogin) {
        handleLogin(updatedUser);
      }
      
      // Update localStorage
      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
      const updatedUserData = { ...currentUser, ...updatedUser };
      localStorage.setItem("user", JSON.stringify(updatedUserData));
      
      setSuccess(true);
      setEditing(false);
      
      setTimeout(() => setSuccess(false), 3000);
      
      return updatedUser;
    } catch (err) {
      console.error("Error updating user:", err);
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          err.message || 
                          "Failed to update profile";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Prepare data for API
      const submitData = {
        firstName: formData.firstName.trim() || null,
        lastName: formData.lastName.trim() || null,
        phone: formData.phone.trim() || null,
        dateOfBirth: formData.dateOfBirth || null,
        gender: formData.gender || null,
        address: formData.address.trim() || null,
        city: formData.city.trim() || null,
        country: formData.country.trim() || null,
        postalCode: formData.postalCode.trim() || null
      };
      
      console.log("Submitting profile data:", submitData);
      await updateUserProfile(submitData);
    } catch (err) {
      // Error is already handled in updateUserProfile
    }
  };

  const handleEdit = () => {
    setEditing(true);
    setSuccess(false);
    setError("");
  };

  const handleCancel = () => {
    // Reset form data to original user data
    if (authUser) {
      setFormData({
        firstName: authUser.firstName || "",
        lastName: authUser.lastName || "",
        email: authUser.email || "",
        phone: authUser.phone || "",
        dateOfBirth: authUser.dateOfBirth ? formatDateForInput(authUser.dateOfBirth) : "",
        gender: authUser.gender || "",
        address: authUser.address || "",
        city: authUser.city || "",
        country: authUser.country || "",
        postalCode: authUser.postalCode || ""
      });
    }
    setEditing(false);
    setError("");
  };

  if (fetchLoading) {
    return <ProfileFormSkeleton />;
  }

  if (!authUser) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-center py-8">
          <div className="text-red-600 mb-4">User not found. Please log in again.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
        {!editing && (
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Edit className="w-4 h-4" />
            Edit Profile
          </button>
        )}
      </div>

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
          Profile updated successfully!
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            icon={User}
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            disabled={!editing}
            placeholder="Enter your first name"
          />

          <InputField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            disabled={!editing}
            placeholder="Enter your last name"
          />

          <InputField
            icon={Mail}
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={true}
            required
          />

          <InputField
            icon={Phone}
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            disabled={!editing}
            placeholder="+1 (555) 123-4567"
          />

          <InputField
            icon={Calendar}
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            disabled={!editing}
          />

          <GenderSelect
            value={formData.gender}
            onChange={handleChange}
            disabled={!editing}
          />

          <AddressField
            value={formData.address}
            onChange={handleChange}
            disabled={!editing}
          />

          <InputField
            icon={MapPin}
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            disabled={!editing}
            placeholder="Enter your city"
          />

          <InputField
            icon={Globe}
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            disabled={!editing}
            placeholder="Enter your country"
          />

          <InputField
            label="Postal Code"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            disabled={!editing}
            placeholder="12345"
          />
        </div>

        {editing && (
          <FormActions
            loading={loading}
            onCancel={handleCancel}
          />
        )}
      </form>

      <ProfileStatus user={authUser} />
    </div>
  );
}

// Sub-components for ProfileForm (same as before)
function InputField({ icon: Icon, label, type = "text", ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        )}
        <input
          type={type}
          {...props}
          className={`w-full ${
            Icon ? "pl-10" : "pl-4"
          } pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed transition`}
        />
      </div>
    </div>
  );
}

function GenderSelect({ value, onChange, disabled }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Gender
      </label>
      <div className="relative">
        <select
          name="gender"
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 appearance-none transition"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function AddressField({ value, onChange, disabled }) {
  return (
    <div className="md:col-span-2">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Address
      </label>
      <textarea
        name="address"
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows="3"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 transition"
        placeholder="Enter your full address"
      />
    </div>
  );
}

function FormActions({ loading, onCancel }) {
  return (
    <div className="flex gap-3 mt-6">
      <button
        type="submit"
        disabled={loading}
        className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Save className="w-5 h-5" />
        {loading ? "Saving..." : "Save Changes"}
      </button>
      <button
        type="button"
        onClick={onCancel}
        disabled={loading}
        className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
      >
        Cancel
      </button>
    </div>
  );
}

function ProfileStatus({ user }) {
  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-700">Account Status</h3>
          <p className="text-sm text-gray-500">
            {user.isVerified ? "Verified account" : "Account not verified"}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          user.isVerified 
            ? "bg-green-100 text-green-800" 
            : "bg-yellow-100 text-yellow-800"
        }`}>
          {user.isVerified ? "Verified" : "Pending"}
        </span>
      </div>
      {user.createdAt && (
        <p className="text-xs text-gray-500 mt-2">
          Member since {new Date(user.createdAt).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}

function ProfileFormSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
        <div className="w-24 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i}>
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2 animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
}