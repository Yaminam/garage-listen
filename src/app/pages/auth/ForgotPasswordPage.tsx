import { useState } from "react";
import { Link } from "react-router";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { ArrowLeft, Loader2, AlertCircle, MailCheck } from "lucide-react";
import { validateEmail } from "../../lib/validation";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    const err = validateEmail(email);
    if (err) { setEmailError(err); return; }
    setEmailError("");
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1000);
  };

  return (
    <Card className="border-0 shadow-2xl">
      <CardHeader className="space-y-1 pb-6">
        <CardTitle className="text-2xl text-center">Forgot password?</CardTitle>
        <CardDescription className="text-center">
          {sent ? "Check your inbox for the reset link" : "Enter your email and we'll send you a reset link"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {sent ? (
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
              <MailCheck className="w-8 h-8 text-emerald-600" />
            </div>
            <div className="text-center">
              <p className="font-medium text-gray-900">Email sent to</p>
              <p className="text-primary font-semibold">{email}</p>
              <p className="text-sm text-gray-500 mt-2">Didn't receive it? Check your spam folder or{" "}
                <button onClick={() => setSent(false)} className="text-primary hover:underline">try again</button>.
              </p>
            </div>
            <Link to="/auth/login" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mt-2">
              <ArrowLeft className="w-4 h-4" /> Back to login
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                className={`h-11 ${emailError ? "border-red-500" : ""}`}
                value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                autoComplete="email"
              />
              {emailError && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{emailError}</p>}
            </div>
            <Button className="w-full h-11 bg-primary hover:bg-primary-600" size="lg" onClick={handleSubmit} disabled={loading}>
              {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending…</> : "Send reset link"}
            </Button>
            <Link to="/auth/login" className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4" /> Back to login
            </Link>
          </>
        )}
      </CardContent>
    </Card>
  );
}
