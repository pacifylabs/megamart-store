import { User, Mail, Phone, MapPin, Save } from "lucide-react";

export default function ProfileForm({
  user,
  formData,
  editing,
  loading,
  success,
  onChange,
  onSubmit,
  onCancel,
  onEdit,
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
        {!editing && (
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Edit Profile
          </button>
        )}
      </div>

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
          Profile updated successfully!
        </div>
      )}

      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <InputField
            icon={User}
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={onChange}
            disabled={!editing}
          />

          {/* Email */}
          <InputField
            icon={Mail}
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={onChange}
            disabled={!editing}
          />

          {/* Phone */}
          <InputField
            icon={Phone}
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={onChange}
            disabled={!editing}
          />

          {/* City */}
          <InputField
            icon={MapPin}
            label="City"
            name="city"
            value={formData.city}
            onChange={onChange}
            disabled={!editing}
          />

          {/* State */}
          <InputField
            label="State"
            name="state"
            value={formData.state}
            onChange={onChange}
            disabled={!editing}
          />

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={onChange}
              disabled={!editing}
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
            />
          </div>
        </div>

        {editing && (
          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

function InputField({ icon: Icon, label, ...props }) {
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
          {...props}
          className={`w-full ${
            Icon ? "pl-10" : "pl-4"
          } pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50`}
        />
      </div>
    </div>
  );
}
