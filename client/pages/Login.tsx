
import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Shield } from "lucide-react";
import { useAuth } from "@/lib/auth";
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";

const Logo = () => (
    <div className="flex items-center gap-3">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24.7279 20.267C26.5455 18.0526 26.4428 14.9083 24.4819 12.8055C22.521 10.7027 19.5587 10.4284 17.3484 11.9923L14.0003 15.3404L16.6599 18L24.7279 20.267Z" fill="white"/>
            <path d="M11.3401 14L7.27211 11.733C5.45455 13.9474 5.55724 17.0917 7.51813 19.1945C9.47903 21.2973 12.4413 21.5716 14.6516 20.0077L18.0003 16.659L11.3401 14Z" fill="white" fillOpacity="0.8"/>
        </svg>
        <span className="text-2xl font-semibold text-white">seqxio</span>
    </div>
);

export default function LoginPage() {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const validate = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    }

    return isValid;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    setLoading(true);
    setError('');

    try {
        await login(email, password, rememberMe);
        const redirectPath = new URLSearchParams(location.search).get('redirect') || '/dashboard';
        navigate(redirectPath);
    } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        }
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      <div style={{backgroundImage: 'url(/src/assets/green-texture.png)'}} className="relative hidden items-center justify-center bg-gray-900 bg-cover bg-center text-white lg:flex flex-col gap-8 p-16 text-center">
        <div className="absolute top-12 left-12">
            <Logo />
        </div>
        
        <h1 className="text-6xl font-bold leading-tight">
            Powering
            <br />
            Smarter,
            <br />
            Cleaner Cities
        </h1>

        <div className="absolute bottom-12 left-12 bg-black/30 backdrop-blur-sm rounded-lg p-4 max-w-sm text-left border border-white/20">
            <div className="flex items-center gap-3">
                <Shield size={24} />
                <h3 className="font-semibold">Platform security</h3>
            </div>
            <p className="text-sm text-white/80 mt-2">Data protected in transit and at rest.</p>
        </div>
      </div>
      
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-left">
            <h1 className="text-3xl font-bold">Sign in</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email and password to login.
            </p>
          </div>
          
          {error && (
             <Alert variant="destructive">
                <AlertDescription>
                    {error}
                </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSignIn} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={emailError ? 'border-red-500' : ''}
              />
              {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
            </div>
            <div className="grid gap-2 relative">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={passwordError ? 'border-red-500 pr-10' : 'pr-10'}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute bottom-2 right-3 text-muted-foreground"
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                {passwordError && <p className="text-red-500 text-xs">{passwordError}</p>}
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Checkbox id="remember-me" checked={rememberMe} onCheckedChange={(checkedState) => setRememberMe(Boolean(checkedState.valueOf()))} />
                    <Label htmlFor="remember-me" className="text-sm font-normal">Remember me</Label>
                </div>
                <Link to="#" className="text-sm text-green-600 hover:underline">
                    Forgot password?
                </Link>
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={loading}>
              {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>}
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don’t have an account?{" "}
            <Link to="#" className="underline text-green-600">
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
