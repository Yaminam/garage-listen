import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Mail, CheckCircle2 } from "lucide-react";

export function EmailVerificationPage() {
  return (
    <Card className="border-0 shadow-2xl">
      <CardHeader className="space-y-1 pb-6">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-accent-50 rounded-full flex items-center justify-center">
            <Mail className="w-8 h-8 text-accent-600" />
          </div>
        </div>
        <CardTitle className="text-2xl text-center">Check your email</CardTitle>
        <CardDescription className="text-center">
          We've sent a verification link to your email
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-accent-600 mt-0.5" />
            <div>
              <p className="text-sm">Click the link in your email to verify your account</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-accent-600 mt-0.5" />
            <div>
              <p className="text-sm">The link will expire in 24 hours</p>
            </div>
          </div>
        </div>
        <Button className="w-full h-11 bg-primary hover:bg-primary-600" size="lg">
          Open email app
        </Button>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Didn't receive the email?{" "}
            <button className="text-primary hover:underline">
              Resend verification
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
