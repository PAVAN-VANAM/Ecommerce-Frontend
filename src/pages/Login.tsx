import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from "sonner";
import { useShop } from '@/context/ShopContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup, isLoading } = useShop();

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginErrors, setLoginErrors] = useState<{ email?: string; password?: string }>({});

  // Signup state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirm, setSignupConfirm] = useState('');
  const [signupErrors, setSignupErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirm?: string;
  }>({});

  // Validate login form
  const validateLogin = () => {
    const errors: { email?: string; password?: string } = {};

    if (!loginEmail.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(loginEmail)) {
      errors.email = 'Email is invalid';
    }

    if (!loginPassword) {
      errors.password = 'Password is required';
    } else if (loginPassword.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setLoginErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validate signup form
  const validateSignup = () => {
    const errors: {
      name?: string;
      email?: string;
      password?: string;
      confirm?: string;
    } = {};

    if (!signupName.trim()) {
      errors.name = 'Name is required';
    }

    if (!signupEmail.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(signupEmail)) {
      errors.email = 'Email is invalid';
    }

    if (!signupPassword) {
      errors.password = 'Password is required';
    } else if (signupPassword.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (signupPassword !== signupConfirm) {
      errors.confirm = 'Passwords do not match';
    }

    setSignupErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle login submit
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateLogin()) {
      try {
        const response = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: loginEmail,
            password: loginPassword,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to login');
        }

        // Call the login function from context with the response data
        await login(loginEmail, loginPassword);
        toast.success('Login successful');

        // Navigate back to previous page or home
        const from = location.state?.from?.pathname || '/';
        navigate(from);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to login');
      }
    }
  };

  // Handle signup submit
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateSignup()) {
      try {
        const response = await fetch('http://localhost:3000/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: signupEmail,
            password: signupPassword,
            Name: signupName,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to create account');
        }

        // Call the signup function from context with the response data
        await signup(signupName, signupEmail, signupPassword);
        toast.success('Account created successfully');

        // Navigate back to previous page or home
        const from = location.state?.from?.pathname || '/';
        navigate(from);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to create account');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-flipkart-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-md rounded-md overflow-hidden">
        <div className="bg-coral p-6 text-white">
          <Link to="/" className="flex items-center justify-center">
            <span className="text-2xl font-bold italic">PavanShop-AI</span>
            <span className="text-xs text-flipkart-yellow italic ml-1 mt-1">Explore Plus</span>
          </Link>
        </div>

        <div className="p-6">
          <Tabs defaultValue="login">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* Login Form */}
            <TabsContent value="login">
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label htmlFor="login-email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <Input
                    id="login-email"
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className={loginErrors.email ? "border-red-500" : ""}
                    placeholder="Enter your email"
                  />
                  {loginErrors.email && (
                    <p className="text-red-500 text-xs mt-1">{loginErrors.email}</p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="login-password" className="block text-sm font-medium">
                      Password
                    </label>
                    <Link to="/forgot-password" className="text-flipkart-blue text-xs hover:underline">
                      Forgot Password?
                    </Link>
                  </div>
                  <Input
                    id="login-password"
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className={loginErrors.password ? "border-red-500" : ""}
                    placeholder="Enter your password"
                  />
                  {loginErrors.password && (
                    <p className="text-red-500 text-xs mt-1">{loginErrors.password}</p>
                  )}
                </div>

                <div>
                  <p className="text-xs text-flipkart-gray">
                    By continuing, you agree to FlipShop's Terms of Use and Privacy Policy.
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-flipkart-orange hover:bg-flipkart-orange/90"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Login"}
                </Button>
              </form>
            </TabsContent>

            {/* Signup Form */}
            <TabsContent value="signup">
              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <div>
                  <label htmlFor="signup-name" className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <Input
                    id="signup-name"
                    type="text"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    className={signupErrors.name ? "border-red-500" : ""}
                    placeholder="Enter your full name"
                  />
                  {signupErrors.name && (
                    <p className="text-red-500 text-xs mt-1">{signupErrors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="signup-email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className={signupErrors.email ? "border-red-500" : ""}
                    placeholder="Enter your email"
                  />
                  {signupErrors.email && (
                    <p className="text-red-500 text-xs mt-1">{signupErrors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="signup-password" className="block text-sm font-medium mb-1">
                    Password
                  </label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className={signupErrors.password ? "border-red-500" : ""}
                    placeholder="At least 6 characters"
                  />
                  {signupErrors.password && (
                    <p className="text-red-500 text-xs mt-1">{signupErrors.password}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="signup-confirm" className="block text-sm font-medium mb-1">
                    Confirm Password
                  </label>
                  <Input
                    id="signup-confirm"
                    type="password"
                    value={signupConfirm}
                    onChange={(e) => setSignupConfirm(e.target.value)}
                    className={signupErrors.confirm ? "border-red-500" : ""}
                    placeholder="Confirm your password"
                  />
                  {signupErrors.confirm && (
                    <p className="text-red-500 text-xs mt-1">{signupErrors.confirm}</p>
                  )}
                </div>

                <div>
                  <p className="text-xs text-flipkart-gray">
                    By signing up, you agree to FlipShop's Terms of Use and Privacy Policy.
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-flipkart-orange hover:bg-flipkart-orange/90"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>

        <div className="p-6 bg-gray-50 border-t text-center">
          <Link to="/" className="text-flipkart-blue hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
