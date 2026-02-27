import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { validateMinLength, validatePasswordMatch, getPasswordStrength } from "../../lib/validation";
import { toast } from "sonner";

export function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const strength = getPasswordStrength(password);

  function validate() {
    const e: typeof errors = {};
    const pw = validateMinLength(password, 8, "Password"); if (pw) e.password = pw;
    const cm = validatePasswordMatch(password, confirm); if (cm) e.confirm = cm;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  const handleReset = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Password reset successfully! Please sign in.");
      navigate("/auth/login");
    }, 900);
  };

  return (
    <Card className="border-0 shadow-2xl">
      <CardHeader className="space-y-1 pb-6">
        <CardTitle className="text-2xl text-center">Reset password</CardTitle>
        <CardDescription className="text-center">
          Create a new password for your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="password">New password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              className={`h-11 pr-10 ${errors.password ? "border-red-500" : ""}`}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })); }}
              autoComplete="new-password"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
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
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword">Confirm new password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm new password"
              className={`h-11 pr-10 ${errors.confirm ? "border-red-500" : ""}`}
              value={confirm}
              onChange={(e) => { setConfirm(e.target.value); setErrors((p) => ({ ...p, confirm: undefined })); }}
              autoComplete="new-password"
            />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {/* Match indicator */}
          {confirm && !errors.confirm && password === confirm && (
            <p className="text-xs text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Passwords match</p>
          )}
          {errors.confirm && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.confirm}</p>}
        </div>

        <Button className="w-full h-11 bg-primary hover:bg-primary-600" size="lg" onClick={handleReset} disabled={loading}>
          {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Resetting…</> : "Reset password"}
        </Button>
        <Link to="/auth/login" className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-900">
          Back to login
        </Link>
      </CardContent>
    </Card>
  );
}
    </Card>
  );
}
