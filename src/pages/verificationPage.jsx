import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Mail, AlertCircle, Loader2, Home, LogIn, User, Send } from 'lucide-react';
import { API_URL } from '../utils/api-axios';

export default function EmailVerificationPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(5);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [resendEmail, setResendEmail] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [resendError, setResendError] = useState('');

  // Get token from URL query parameter
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  // Initialize resendEmail with URL param if available
  useEffect(() => {
    if (email) {
      setResendEmail(email);
    }
  }, [email]);

  useEffect(() => {
    // Verify email with token
    const verifyEmail = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Invalid verification link. No token provided.');
        return;
      }

      try {
        // Call the verification endpoint with the token from the URL
        const response = await fetch(`${API_URL}/auth/verify-email?token=${encodeURIComponent(token)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          credentials: 'include'
        });

        if (!response.ok) {
            let errorMessage = `HTTP error! status: ${response.status} ${response.statusText}`;
            try {
                // Try to get error details from response body
                const errorData = await response.json();
                if (errorData.message) {
                    errorMessage = errorData.message;
                }
            } catch (e) {
                // If response isn't JSON, use the status text
                console.error('Failed to parse error response:', e);
            }
            throw new Error(errorMessage);
        }
        const data = await response.json();
        
        // Check for expired token first
        if (response.status === 410 || data.message?.includes('expired')) {
            setStatus('expired');
            setMessage(data.message || 'This verification link has expired.');
            return;
        }
        
        // Check for already verified
        if (response.status === 200 && data.message?.toLowerCase().includes('already verified')) {
            setStatus('already-verified');
            setMessage(data.message || 'This email has already been verified.');
            return;
        }
        
        // If we get here, verification was successful
        setStatus('success');
        setMessage(data.message || 'Your email has been successfully verified!');
        
        // Start countdown for auto-redirect
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate('/login');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        
        // Cleanup interval on component unmount
        return () => clearInterval(timer);
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
        setMessage(error.message || 'Failed to verify email. Please try again later.');
      }
    };

    verifyEmail();
  }, [token, navigate]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleResendVerification = async (e) => {
    if (e) e.preventDefault();
    
    // If we're not showing form yet, show it
    if (!showEmailForm && !email) {
      setShowEmailForm(true);
      return;
    }

    // Validate email if we have one
    if (resendEmail && !validateEmail(resendEmail)) {
      setResendError('Please enter a valid email address');
      return;
    }

    try {
      setIsResending(true);
      setResendError('');
      
      // If no email is provided (shouldn't happen at this point)
      if (!resendEmail) {
        throw new Error('Email address is required');
      }

      const response = await fetch(`${API_URL}/auth/resend-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email: resendEmail }),
        credentials: 'include'
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to resend verification email');
      }
      
      // Hide the form and show success message
      setShowEmailForm(false);
      setStatus('resend');
      setMessage('A new verification email has been sent to ' + resendEmail + '. Please check your inbox.');
      return;
    } catch (error) {
      console.error('Resend verification error:', error);
      setResendError(error.message || 'An error occurred. Please try again later.');
    } finally {
      setIsResending(false);
    }
  };

  const renderEmailForm = () => (
    <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-blue-100 p-2 rounded-lg">
          <User className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg text-left font-semibold text-gray-900">Enter Your Email</h3>
          <p className="text-gray-600 text-sm">
            Please enter the email address you used for registration
          </p>
        </div>
      </div>
      
      <form onSubmit={handleResendVerification} className="space-y-4">
        <div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              id="resendEmail"
              value={resendEmail}
              onChange={(e) => {
                setResendEmail(e.target.value);
                setResendError('');
              }}
              placeholder="you@example.com"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              required
              disabled={isResending}
            />
          </div>
          {resendError && (
            <p className="mt-2 text-sm text-red-600">{resendError}</p>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={isResending}
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isResending ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Send Verification Email
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setShowEmailForm(false);
              setResendError('');
            }}
            className="inline-flex items-center justify-center px-6 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
            disabled={isResending}
          >
            Cancel
          </button>
        </div>
        
        <div className="text-center pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
              Register here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <Loader2 className="w-20 h-20 text-blue-500 animate-spin" />
                <Mail className="w-10 h-10 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Verifying Your Email
            </h1>
            <p className="text-gray-600 text-lg">
              Please wait while we verify your email address...
            </p>
          </div>
        );

      case 'resend':
        return (
            <div className="text-center">
            <div className="mb-6 flex justify-center">
                <div className="bg-blue-100 rounded-full p-4">
                <Send className="w-20 h-20 text-blue-500" />
                </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Check Your Email
            </h1>
            <p className="text-gray-600 text-lg mb-6">
                {message || 'A new verification link has been sent to your email address.'}
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 max-w-md mx-auto">
                <p className="text-blue-800 font-medium">
                Didn't receive the email? <br />
                Check your spam folder or try again.
                </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                onClick={handleResendVerification}
                disabled={isResending}
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                {isResending ? (
                    <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending...
                    </>
                ) : (
                    <>
                    <Mail className="w-5 h-5 mr-2" />
                    Resend Verification Email
                    </>
                )}
                </button>
                <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                >
                <Home className="w-5 h-5 mr-2" />
                Go to Home
                </Link>
            </div>
            </div>
        );
      
      case 'success':
        return (
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="bg-green-100 rounded-full p-4">
                <CheckCircle className="w-20 h-20 text-green-500" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Email Verified Successfully!
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              {message}
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800 font-medium">
                Redirecting to login page in {countdown} seconds...
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                <LogIn className="w-5 h-5 mr-2" />
                Go to Login
              </Link>
              <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
              >
                <Home className="w-5 h-5 mr-2" />
                Go to Home
              </Link>
            </div>
          </div>
        );

      case 'already-verified':
        return (
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="bg-blue-100 rounded-full p-4">
                <AlertCircle className="w-20 h-20 text-blue-500" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Already Verified
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              {message}
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800">
                Your account is ready to use. You can now log in.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                <LogIn className="w-5 h-5 mr-2" />
                Go to Login
              </Link>
              <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
              >
                <Home className="w-5 h-5 mr-2" />
                Go to Home
              </Link>
            </div>
          </div>
        );

      case 'expired':
        return (
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="bg-yellow-100 rounded-full p-4">
                <AlertCircle className="w-20 h-20 text-yellow-500" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Verification Link Expired
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              {message}
            </p>
            
            {showEmailForm ? (
              renderEmailForm()
            ) : (
              <>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <p className="text-yellow-800">
                    Don't worry! You can request a new verification link.
                    {email && (
                      <span className="block mt-1 font-medium">
                        Your registered email: {email}
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => {
                      if (email) {
                        // If email is in URL, use it directly
                        handleResendVerification();
                      } else {
                        // Otherwise show email form
                        setShowEmailForm(true);
                      }
                    }}
                    className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Resend Verification Email
                  </button>
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center px-6 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                  >
                    <Home className="w-5 h-5 mr-2" />
                    Go to Home
                  </Link>
                </div>
              </>
            )}
          </div>
        );

      case 'error':
      default:
        return (
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="bg-red-100 rounded-full p-4">
                <XCircle className="w-20 h-20 text-red-500" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Verification Failed
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              {message}
            </p>
            
            {showEmailForm ? (
              renderEmailForm()
            ) : (
              <>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-800 font-medium mb-2">
                    Possible reasons:
                  </p>
                  <ul className="text-red-700 text-sm text-left list-disc list-inside space-y-1">
                    <li>The verification link is invalid or corrupted</li>
                    <li>The link has already been used</li>
                    <li>The link has expired</li>
                    <li>There was a server error</li>
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => {
                      if (email) {
                        // If email is in URL, use it directly
                        handleResendVerification();
                      } else {
                        // Otherwise show email form
                        setShowEmailForm(true);
                      }
                    }}
                    className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Resend Verification Email
                  </button>
                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center px-6 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                  >
                    Back to Register
                  </Link>
                </div>
              </>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <Mail className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">MegaMart</span>
          </Link>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
          {renderContent()}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm">
            Need help?{' '}
            <Link to="/support" className="text-blue-600 hover:text-blue-700 font-medium">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}