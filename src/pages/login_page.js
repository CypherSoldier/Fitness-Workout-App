import { useState } from 'react';
import { auth, googleProvider } from '../components/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useAuth } from '../hooks/useAuth';

function LoginPage() {
  const { loginWithJWT } = useAuth();
  
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [displayName, setDisplayName] = useState('');

  // Firebase Google Sign-In
  const signInWithGoogle = async (e) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, googleProvider);
      // useAuth hook will automatically detect Firebase user
      window.location.href = '/';
    } catch (err) {
      console.error("Google sign-in error:", err);
      setError(err.message);
    }
  };

  // JWT Backend Login/Register
  const createAccount = async (event) => {
    event.preventDefault();
    setError(null);
    
    const payload = isSignUpMode 
      ? { display_name: displayName, email, password }
      : { email, password };

    try {
      const response = await fetch(
        isSignUpMode ? 'http://localhost:5001/register' : 'http://localhost:5001/login', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      if (isSignUpMode) {
        console.log('Account created:', data);
        setIsSignUpMode(false);
        setError('Account created! Please sign in.');
      } else {
        // Login with JWT through the hook
        loginWithJWT(data.accessToken);
        console.log('Logged in successfully');
        // No need for window.location.href - useAuth will handle the state change
        window.location.href = '/';
      }
    } catch (err) {
      console.error(isSignUpMode ? 'Error creating account:' : 'Error logging in:', err);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e2225] px-4">
      <div className="bg-[#191a1c] p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-8 text-white">
          {isSignUpMode ? "Create Account" : "Sign In"}
        </h2>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r">
            {error}
          </div>
        )}

        <form onSubmit={createAccount} className="space-y-5">
          {isSignUpMode && (
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your name"
                required
                className="text-white w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="text-white w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              className="text-white w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 mt-2"
            style={{ backgroundColor: 'rgba(17,183,122,.856)' }}
          >
            {isSignUpMode ? "Create Account" : "Sign In"}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-[#191a1c] text-[#27ce11]">or</span>
          </div>
        </div>

        <button
          type="button"
          onClick={signInWithGoogle}
          className="w-full py-3 px-4 border border-gray-300 hover:bg-gray-50 text-white font-medium rounded-lg transition duration-200 flex items-center justify-center gap-3"
          style={{ backgroundColor: 'rgba(17,183,122,.856)' }}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            {/* Google icon paths */}
          </svg>
          Sign in with Google
        </button>

        <div className="text-center mt-6 text-sm">
          {isSignUpMode ? (
            <p>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsSignUpMode(false)}
                className="text-white hover:text-blue-800 font-medium underline"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p className="text-white">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setIsSignUpMode(true)}
                className="text-[#12D332] hover:text-blue-800 font-medium underline"
              >
                Create Account
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;