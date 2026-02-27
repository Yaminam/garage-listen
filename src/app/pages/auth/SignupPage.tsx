import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { validateEmail, validateRequired, validateMinLength, getPasswordStrength } from "../../lib/validation";

export function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const strength = getPasswordStrength(password);

  function validate() {
    const e: Record<string, string> = {};
    const fn = validateRequired(firstName, "First name"); if (fn) e.firstName = fn;
    const ln = validateRequired(lastName, "Last name"); if (ln) e.lastName = ln;
    const co = validateRequired(company, "Company"); if (co) e.company = co;
    const em = validateEmail(email); if (em) e.email = em;
    const pw = validateMinLength(password, 8, "Password"); if (pw) e.password = pw;
    if (!agreeTerms) e.terms = "You must accept the terms to continue";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  const handleSignUp = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      register({ email, firstName, lastName, company }, password);
      navigate("/onboarding");
    }, 900);
  };

  return (
    <Card className="border-0 shadow-2xl">
      <CardHeader className="space-y-1 pb-6">
        <CardTitle className="text-2xl text-center">Create an account</CardTitle>
        <CardDescription className="text-center">
          Get started with your 14-day free trial
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              placeholder="John"
              className={`h-11 ${errors.firstName ? "border-red-500" : ""}`}
              value={firstName}
              onChange={(e) => { setFirstName(e.target.value); setErrors((p) => ({ ...p, firstName: undefined! })); }}
            />
            {errors.firstName && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.firstName}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              placeholder="Doe"
              className={`h-11 ${errors.lastName ? "border-red-500" : ""}`}
              value={lastName}
              onChange={(e) => { setLastName(e.target.value); setErrors((p) => ({ ...p, lastName: undefined! })); }}
            />
            {errors.lastName && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.lastName}</p>}
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="company">Company name</Label>
          <Input
            id="company"
            placeholder="Acme Inc."
            className={`h-11 ${errors.company ? "border-red-500" : ""}`}
            value={company}
            onChange={(e) => { setCompany(e.target.value); setErrors((p) => ({ ...p, company: undefined! })); }}
          />
          {errors.company && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.company}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Work email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@company.com"
            className={`h-11 ${errors.email ? "border-red-500" : ""}`}
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined! })); }}
            autoComplete="email"
          />
          {errors.email && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              className={`h-11 pr-10 ${errors.password ? "border-red-500" : ""}`}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined! })); }}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {/* Strength meter */}
          {password && (
            <div className="space-y-1">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors ${s <= strength.score ? strength.color : "bg-gray-200"}`} />
                ))}
              </div>
              <p className={`text-xs font-medium ${strength.textColor}`}>{strength.label}</p>
            </div>
          )}
          {errors.password && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.password}</p>}
          {!errors.password && <p className="text-xs text-gray-500">Must be at least 8 characters</p>}
        </div>
        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            className="rounded border-gray-300 mt-0.5"
            checked={agreeTerms}
            onChange={(e) => { setAgreeTerms(e.target.checked); setErrors((p) => ({ ...p, terms: undefined! })); }}
          />
          <span className="text-gray-600">
            I agree to the{" "}
            <a href="#" className="text-primary hover:underline">Terms of Service</a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">Privacy Policy</a>
          </span>
        </label>
        {errors.terms && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.terms}</p>}
        <Button
          className="w-full h-11 bg-primary hover:bg-primary-600"
          size="lg"
          onClick={handleSignUp}
          disabled={loading}
        >
          {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Creating account…</> : "Create account"}
        </Button>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-center w-full text-gray-600">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
