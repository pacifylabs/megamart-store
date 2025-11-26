import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit, 
  Save, 
  X, 
  Camera,
  Navigation,
  Globe,
  Mail,
  Loader2
} from "lucide-react";

export default function ProfileInfo() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    profileImageUrl: ""
  });

  useEffect(() => {
    if (user) {
      const normalizedDob = user.dateOfBirth
        ? new Date(user.dateOfBirth).toISOString().slice(0, 10) // yyyy-MM-dd for input[type="date"]
        : "";

      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        dateOfBirth: normalizedDob,
        gender: user.gender || "",
        address: user.address || "",
        city: user.city || "",
        country: user.country || "",
        postalCode: user.postalCode || "",
        profileImageUrl: user.profileImageUrl || ""
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUpdating) return;
    
    try {
      setIsUpdating(true);
      
      // Validate required fields
      if (!formData.firstName || !formData.lastName) {
        throw new Error('First name and last name are required');
      }
      
      // Create a clean update object with only allowed fields
      const updateData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        address: formData.address,
        city: formData.city,
        country: formData.country,
        postalCode: formData.postalCode,
        profileImageUrl: formData.profileImageUrl
      };

      // Ensure gender is either a valid enum value or null
      const allowedGenders = ["male", "female", "other", "prefer_not_to_say"]; 
      if (!updateData.gender || !allowedGenders.includes(updateData.gender)) {
        updateData.gender = null;
      }

      // Remove empty strings and convert to null for optional fields
      Object.keys(updateData).forEach(key => {
        if (updateData[key] === '') {
          updateData[key] = null;
        }
      });

      await updateUser(updateData);
      setIsEditing(false);
      // You can add a success toast/message here if needed
    } catch (error) {
      console.error('Failed to update profile:', {
        message: error.message,
        response: error.response?.data
      });
      alert(error.response?.data?.message || error.message || 'Failed to update profile');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // Show loading state
      const imageUrl = URL.createObjectURL(file);
      
      // Update local state immediately for better UX
      setFormData(prev => ({
        ...prev,
        profileImageUrl: imageUrl
      }));

      // If you have an API endpoint for uploading images, use it here
      // Example:
      // const formData = new FormData();
      // formData.append('avatar', file);
      // const response = await userService.uploadProfileImage(formData);
      // Then update the user with the new image URL
      
    } catch (error) {
      console.error('Error uploading image:', error);
      // Revert to previous image if upload fails
      setFormData(prev => ({
        ...prev,
        profileImageUrl: user?.profileImageUrl || ''
      }));
      alert('Failed to upload image. Please try again.');
    }
  };

  if (!user) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-pulse text-gray-500">Loading...</div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
      {/* Header - Responsive flex layout */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center sm:text-left">
          Personal Information
        </h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
          >
            <Edit size={18} className="mr-2" />
            Edit Profile
          </button>
        ) : (
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button
              onClick={handleSubmit}
              disabled={isUpdating}
              className={`flex items-center justify-center px-4 py-2 ${
                isUpdating ? 'bg-green-500' : 'bg-green-600 hover:bg-green-700'
              } text-white rounded-lg transition-colors order-2 sm:order-1 min-w-[120px]`}
            >
              {isUpdating ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} className="mr-2" />
                  Save Changes
                </>
              )}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              disabled={isUpdating}
              className="flex items-center justify-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors order-1 sm:order-2 disabled:opacity-50"
            >
              <X size={18} className="mr-2" />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="space-y-6 sm:space-y-8">
        {/* Profile Image Section - Responsive flex layout */}
        <div className="flex flex-col xs:flex-row items-center gap-4 sm:gap-6">
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {formData.profileImageUrl ? (
                <img 
                  src={formData.profileImageUrl} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/default-avatar.png'; // Make sure to add this image to your public folder
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <User size={28} className="text-gray-400" />
                </div>
              )}
            </div>
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 sm:p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                <Camera size={14} className="sm:w-4 sm:h-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <div className="text-center xs:text-left">
            <h3 className="text-lg font-semibold text-gray-900 break-words">
              {formData.firstName} {formData.lastName}
            </h3>
            <p className="text-gray-600 flex items-center justify-center xs:justify-start mt-1">
              <Mail size={16} className="mr-2 flex-shrink-0" />
              <span className="break-all">{user.email}</span>
            </p>
          </div>
        </div>

        {/* Personal Information Grid - Responsive columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* First Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                placeholder="Enter your first name"
              />
            ) : (
              <p className="px-3 py-2 text-gray-900 bg-gray-50 rounded-lg text-sm sm:text-base min-h-[42px] flex items-center">
                {formData.firstName || "Not provided"}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            {isEditing ? (
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                placeholder="Enter your last name"
              />
            ) : (
              <p className="px-3 py-2 text-gray-900 bg-gray-50 rounded-lg text-sm sm:text-base min-h-[42px] flex items-center">
                {formData.lastName || "Not provided"}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <Phone size={16} className="mr-2 flex-shrink-0" />
              Phone Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                placeholder="Enter your phone number"
              />
            ) : (
              <p className="px-3 py-2 text-gray-900 bg-gray-50 rounded-lg text-sm sm:text-base min-h-[42px] flex items-center">
                {formData.phone || "Not provided"}
              </p>
            )}
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <Calendar size={16} className="mr-2 flex-shrink-0" />
              Date of Birth
            </label>
            {isEditing ? (
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              />
            ) : (
              <p className="px-3 py-2 text-gray-900 bg-gray-50 rounded-lg text-sm sm:text-base min-h-[42px] flex items-center">
                {formData.dateOfBirth ? new Date(formData.dateOfBirth).toLocaleDateString() : "Not provided"}
              </p>
            )}
          </div>

          {/* Gender */}
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            {isEditing ? (
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>
            ) : (
              <p className="px-3 py-2 text-gray-900 bg-gray-50 rounded-lg text-sm sm:text-base min-h-[42px] flex items-center capitalize">
                {formData.gender || "Not provided"}
              </p>
            )}
          </div>
        </div>

        {/* Address Section */}
        <div className="border-t pt-4 sm:pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center justify-center sm:justify-start">
            <MapPin size={20} className="mr-2 flex-shrink-0" />
            Address Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Street Address */}
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Street Address</label>
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  placeholder="Enter your street address"
                />
              ) : (
                <p className="px-3 py-2 text-gray-900 bg-gray-50 rounded-lg text-sm sm:text-base min-h-[42px] flex items-center">
                  {formData.address || "Not provided"}
                </p>
              )}
            </div>

            {/* City */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <Navigation size={16} className="mr-2 flex-shrink-0" />
                City
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  placeholder="Enter your city"
                />
              ) : (
                <p className="px-3 py-2 text-gray-900 bg-gray-50 rounded-lg text-sm sm:text-base min-h-[42px] flex items-center">
                  {formData.city || "Not provided"}
                </p>
              )}
            </div>

            {/* Country */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <Globe size={16} className="mr-2 flex-shrink-0" />
                Country
              </label>
            {isEditing ? (
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                placeholder="Enter your country"
              />
            ) : (
              <p className="px-3 py-2 text-gray-900 bg-gray-50 rounded-lg text-sm sm:text-base min-h-[42px] flex items-center">
                {formData.country || "Not provided"}
              </p>
            )}
          </div>

          {/* Postal Code */}
          <div className="space-y-2 md:col-span-2 lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700">Postal Code</label>
            {isEditing ? (
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                placeholder="Enter postal code"
              />
            ) : (
              <p className="px-3 py-2 text-gray-900 bg-gray-50 rounded-lg text-sm sm:text-base min-h-[42px] flex items-center">
                {formData.postalCode || "Not provided"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}