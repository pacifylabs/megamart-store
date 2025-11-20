import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ListFilter, Mail, Lock, ArrowLeft, CheckCircle, Eye, EyeOff } from "lucide-react";
import API from "../utils/api-axios";

export default function ForgotPasswordPage() {
  const [form, setForm] = useState({ 
    email: "", 
    newPassword: "", 
    confirmPassword: "" 
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); // 1: Email step, 2: Verification sent, 3: Reset form
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Check if user came from verification link
  const token = searchParams.get('token');
  const emailFromLink = searchParams.get('email');

  // If token and email are present in URL, skip to step 3
  useEffect(() => {
    if (token && emailFromLink) {
      setStep(3);
      setForm(prev => ({ ...prev, email: emailFromLink }));
    }
  }, [token, emailFromLink]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Step 1: Send verification email to user
      // TODO: Replace with actual API call when backend is ready
      // const response = await API.post('/auth/forgot-password', {
      //   email: form.email
      // });

      // Mock API call for testing
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockResponse = { status: 200 };
      
      if (mockResponse.status === 200) {
        setStep(2); // Move to verification sent step
        setSuccess(true);
      }
    } catch (err) {
      setError("Failed to send verification email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (!form.newPassword || !form.confirmPassword) {
      setError("Please fill in all password fields");
      setLoading(false);
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (form.newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      // Step 3: Reset password with token from URL or from previous step
      // TODO: Replace with actual API call when backend is ready
      // const resetData = {
      //   email: form.email,
      //   newPassword: form.newPassword
      // };

      // // If token is available from URL, include it
      // if (token) {
      //   resetData.token = token;
      // }

      // const response = await API.patch('/auth/reset-password', resetData);

      // Mock API call for testing
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockResponse = { status: 200 };

      if (mockResponse.status === 200) {
        setSuccess(true);
        // Auto redirect to login after 3 seconds
        setTimeout(() => navigate("/login"), 3000);
      }
    } catch (err) {
      setError("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setStep(1);
    setError("");
    setSuccess(false);
    setForm(prev => ({ ...prev, newPassword: "", confirmPassword: "" }));
  };

  const handleResendVerification = async () => {
    setLoading(true);
    setError("");

    try {
      await API.post('/auth/forgot-password', {
        email: form.email
      });
      setSuccess(true);
    } catch (err) {
      setError("Failed to resend verification email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 sm:px-6 py-3 border-b border-slate-100">
        <div className="max-w-[95%] mx-auto">
          <Link to="/" className="flex items-center gap-2 w-fit">
            <ListFilter className="w-10 h-7 text-blue-500" />
            <div className="text-lg sm:text-xl font-extrabold text-blue-600">
              MegaMart
            </div>
          </Link>
        </div>
      </div>

      {/* Forgot Password Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            {/* Back Button - Only show when not coming from verification link */}
            {!(token && emailFromLink) && (
              <button
                onClick={step === 1 ? () => navigate("/login") : handleBackToEmail}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {step === 1 ? "Back to Login" : "Back to Email"}
                </span>
              </button>
            )}

            {step === 1 && (
              // Step 1: Email Input
              <>
                <div className="text-center mb-8">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-blue-600" />
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h1>
                  <p className="text-gray-600">
                    Enter your email address and we'll send you a verification link
                  </p>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Send Verification Link"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Remember your password?{" "}
                    <Link
                      to="/login"
                      className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                    >
                      Back to Login
                    </Link>
                  </p>
                </div>
              </>
            )}

            {step === 2 && (
              // Step 2: Verification Sent
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h2>
                <p className="text-gray-600 mb-4">
                  We've sent a password reset link to <strong>{form.email}</strong>
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  Click the link in the email to reset your password. The link will expire in 1 hour.
                </p>

                <div className="space-y-3">
                  <button
                    onClick={handleResendVerification}
                    disabled={loading}
                    className="w-full py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition disabled:opacity-50"
                  >
                    {loading ? "Resending..." : "Resend Verification Link"}
                  </button>
                  
                  <button
                    onClick={handleBackToEmail}
                    className="w-full py-3 text-gray-600 font-semibold rounded-lg hover:bg-gray-50 transition"
                  >
                    Use Different Email
                  </button>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-sm font-semibold text-blue-800 mb-2">📧 Can't find the email?</h3>
                  <ul className="text-xs text-blue-700 space-y-1 text-left">
                    <li>• Check your spam or junk folder</li>
                    <li>• Make sure you entered the correct email address</li>
                    <li>• Wait a few minutes and try again</li>
                  </ul>
                </div>
              </div>
            )}

            {(step === 3 || (token && emailFromLink)) && (
              // Step 3: Reset Password Form (accessed via verification link)
              <>
                <div className="text-center mb-8">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-8 h-8 text-blue-600" />
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Password</h1>
                  <p className="text-gray-600">
                    {token && emailFromLink 
                      ? "Set your new password for your account"
                      : "Enter your new password below"
                    }
                  </p>
                  {form.email && (
                    <p className="text-sm text-gray-500 mt-2">
                      For: <strong>{form.email}</strong>
                    </p>
                  )}
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {error}
                  </div>
                )}

                {success ? (
                  // Success state after password reset
                  <div className="text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Reset Successfully!</h2>
                    <p className="text-gray-600 mb-6">
                      Your password has been updated successfully. Redirecting to login...
                    </p>
                    <Link
                      to="/login"
                      className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                    >
                      Go to Login Now
                    </Link>
                  </div>
                ) : (
                  // Password reset form
                  <form onSubmit={handlePasswordReset} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={form.newPassword}
                          onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your new password"
                          required
                          minLength="6"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showNewPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Password must be at least 6 characters long
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={form.confirmPassword}
                          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Confirm your new password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Resetting...
                        </span>
                      ) : (
                        "Reset Password"
                      )}
                    </button>
                  </form>
                )}

                {/* Security Tips */}
                {!success && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-sm font-semibold text-blue-800 mb-2">💡 Security Tips</h3>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• Use a strong, unique password</li>
                      <li>• Include letters, numbers, and special characters</li>
                      <li>• Avoid using personal information</li>
                      <li>• Don't reuse passwords from other sites</li>
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}