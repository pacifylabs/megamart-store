import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, User, Save, Edit } from "lucide-react";
import API from "../../utils/api-axios";

export default function ProfileInfo() {
  const { user: authUser, handleLogin } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: ""
  });

  // Initialize form when user data is available
  useEffect(() => {
    if (authUser) {
      setFormData({
        name: authUser.name || authUser.fullName || `${authUser.firstName || ''} ${authUser.lastName || ''}`.trim(),
        email: authUser.email || "",
        phone: authUser.phone || "",
        location: authUser.location || `${authUser.city || ''}${authUser.city && authUser.country ? ', ' : ''}${authUser.country || ''}`
      });
    }
  }, [authUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
      const response = await API.patch(`/users/${userId}`, userData);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Extract first and last name from full name
      const nameParts = formData.name.trim().split(' ');
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(' ') || "";
      
      // Extract city and country from location
      const locationParts = formData.location.split(',');
      const city = locationParts[0]?.trim() || "";
      const country = locationParts[1]?.trim() || "";

      const submitData = {
        firstName: firstName || null,
        lastName: lastName || null,
        phone: formData.phone.trim() || null,
        city: city || null,
        country: country || null
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
    // Reset to original user data
    if (authUser) {
      setFormData({
        name: authUser.name || authUser.fullName || `${authUser.firstName || ''} ${authUser.lastName || ''}`.trim(),
        email: authUser.email || "",
        phone: authUser.phone || "",
        location: authUser.location || `${authUser.city || ''}${authUser.city && authUser.country ? ', ' : ''}${authUser.country || ''}`
      });
    }
    setEditing(false);
    setError("");
  };

  if (!authUser) {
    return (
      <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="text-center py-8 text-gray-500">
          Please log in to view your profile.
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
        {!editing && (
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Edit className="w-4 h-4" />
            Edit
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
        <div className="grid md:grid-cols-2 gap-6">
          <ProfileField
            icon={User}
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!editing}
            placeholder="Enter your full name"
          />

          <ProfileField
            icon={Mail}
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={true}
          />

          <ProfileField
            icon={Phone}
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={!editing}
            placeholder="+234 812 345 6789"
          />

          <ProfileField
            icon={MapPin}
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            disabled={!editing}
            placeholder="City, Country"
          />
        </div>

        {editing && (
          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        )}
      </form>

      {/* Account status info */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-700">Account Status</h3>
            <p className="text-sm text-gray-500">
              {authUser.isVerified ? "Verified account" : "Account not verified"}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            authUser.isVerified 
              ? "bg-green-100 text-green-800" 
              : "bg-yellow-100 text-yellow-800"
          }`}>
            {authUser.isVerified ? "Verified" : "Pending"}
          </span>
        </div>
      </div>
    </section>
  );
}

// Sub-component for ProfileInfo
function ProfileField({ icon: Icon, label, type = "text", ...props }) {
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
          } pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 transition`}
        />
      </div>
    </div>
  );
}