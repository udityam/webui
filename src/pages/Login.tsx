import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Lock, User, ArrowRight, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios"

const features = [
  "Centralized privileged access management",
  "Real-time session monitoring and audit",
  "Zero-trust authentication and MFA",
];

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

const onSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  sessionStorage.removeItem("isLoggedIn");
  setLoading(true);
  setError("");

  const username =
    (document.getElementById("username") as HTMLInputElement).value;

  const password =
    (document.getElementById("password") as HTMLInputElement).value;

  try {
   const response = await axios.post(
  `${window.location.origin}/api/v1/auth/login`,
  { username, password },
  {
    withCredentials: true,
  }
);

console.log("LOGIN RESPONSE:", response.data);

 if (response.status === 200) {

  const token =
  response.data.access_token ||
  response.data.token ||
  response.data.accessToken;

  sessionStorage.setItem("token", token);
  localStorage.setItem("token", token);

  axios.defaults.headers.common["Authorization"] =
    `Bearer ${token}`;

  sessionStorage.setItem("isLoggedIn", "true");

  window.location.href = "/console/dashboard";
}

  } catch (err: any) {

    if (err.response?.status === 401) {
      setError("Invalid credentials");
    } else {
      setError("Something went wrong");
    }

  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Hero panel */}
      <div
        className="hidden lg:flex flex-col justify-between p-12 text-primary-foreground relative overflow-hidden"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="absolute inset-0 bg-dots opacity-40" />
        <div className="absolute -top-32 -right-32 size-96 rounded-full bg-primary-glow/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 size-96 rounded-full bg-primary/30 blur-3xl" />

        <div className="relative flex items-center gap-3">
          <div className="size-11 rounded-xl bg-primary-foreground/10 grid place-items-center backdrop-blur-md ring-1 ring-primary-foreground/20">
            <ShieldCheck className="size-6" />
          </div>
          <div>
            <div className="text-lg font-semibold tracking-tight">Infosoft</div>
            <div className="text-xs text-primary-foreground/60">Secure Access Console</div>
          </div>
        </div>

        <div className="relative space-y-6 max-w-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-foreground/10 border border-primary-foreground/15 text-xs font-medium backdrop-blur">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Enterprise PAM Platform
          </div>
          <h2 className="text-4xl font-semibold leading-[1.15] tracking-tight">
            Privileged access,<br /> simplified and secure.
          </h2>
          <p className="text-primary-foreground/70 leading-relaxed">
            Manage assets, sessions, users, and audits from a single unified console designed for modern enterprises.
          </p>
          <ul className="space-y-2.5 pt-2">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-primary-foreground/85">
                <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-primary-foreground/50">
          © {new Date().getFullYear()} Infosoft Technologies. All rights reserved.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center p-6 lg:p-12 bg-background relative">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
        <div className="w-full max-w-sm relative">
          <div className="lg:hidden flex items-center gap-2 mb-10">
            <div className="size-10 rounded-xl bg-gradient-to-br from-primary to-primary-glow grid place-items-center shadow-[var(--shadow-elegant)]">
              <ShieldCheck className="size-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Infosoft</span>
          </div>

          <div className="space-y-1.5">
            <h1 className="text-3xl font-semibold tracking-tight">Sign in</h1>
            <p className="text-sm text-muted-foreground">
              Welcome back. Enter your credentials to continue.
            </p>
          </div>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Username
              </Label>
              <div className="relative">
                <User className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input id="username" placeholder="admin" className="pl-9 h-11" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Password
              </Label>
              <div className="relative">
                <Lock className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input id="password" type="password" placeholder="••••••••" className="pl-9 h-11" required />
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox /> <span className="text-muted-foreground">Remember me</span>
              </label>
              <a href="#" className="text-primary hover:underline font-medium">Forgot password?</a>
            </div>
             {error && (
                 <p className="text-red-500 text-sm">
                  {error}
                </p>
              )}
            <Button type="submit" className="w-full h-11 group" disabled={loading}>
              {loading ? "Signing in…" : (<>Sign in <ArrowRight className="size-4 ml-1 group-hover:translate-x-0.5 transition-transform" /></>)}
            </Button>
          </form>

          <p className="mt-8 text-xs text-center text-muted-foreground">
            Secured by Infosoft · Protected by enterprise-grade encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
