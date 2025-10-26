import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, UserCircle, Shield } from 'lucide-react';

interface LoginProps {
  onToggle: () => void;
}

const TEST_ACCOUNTS = [
  {
    email: 'admin@nonprofit.org',
    password: 'admin123',
    role: 'Admin',
    icon: Shield,
  },
  {
    email: 'testuser@nonprofit.org',
    password: 'test123',
    role: 'Donor',
    icon: UserCircle,
  },
];

export const Login = ({ onToggle }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleQuickLogin = (testEmail: string, testPassword: string) => {
    setEmail(testEmail);
    setPassword(testPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-blue-600 p-3 rounded-full">
            <LogIn className="w-8 h-8 text-white" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome Back</h2>
        <p className="text-center text-gray-600 mb-6">Sign in to your account</p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm font-semibold text-blue-800 mb-3 text-center">Test Accounts</p>
          <div className="space-y-2">
            {TEST_ACCOUNTS.map((account) => {
              const Icon = account.icon;
              return (
                <button
                  key={account.email}
                  type="button"
                  onClick={() => handleQuickLogin(account.email, account.password)}
                  className="w-full flex items-center justify-between p-3 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition group"
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 text-blue-600" />
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-800">{account.role}</p>
                      <p className="text-xs text-gray-500">{account.email}</p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 group-hover:text-blue-600 transition">
                    Click to use
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={onToggle}
              className="text-blue-600 font-semibold hover:text-blue-700 transition"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
