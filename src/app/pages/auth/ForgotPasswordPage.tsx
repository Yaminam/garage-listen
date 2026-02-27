import { Link } from "react-router";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { ArrowLeft } from "lucide-react";

export function ForgotPasswordPage() {
  return (
    <Card className="border-0 shadow-2xl">
      <CardHeader className="space-y-1 pb-6">
        <CardTitle className="text-2xl text-center">Forgot password?</CardTitle>
        <CardDescription className="text-center">
          Enter your email and we'll send you a reset link
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@company.com"
            className="h-11"
          />
        </div>
        <Button className="w-full h-11 bg-primary hover:bg-primary-600" size="lg">
          Send reset link
        </Button>
        <Link
          to="/auth/login"
          className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to login
        </Link>
      </CardContent>
    </Card>
  );
}
