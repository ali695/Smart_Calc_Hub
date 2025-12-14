import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { SEOHead } from "@/components/SEOHead";
import { PageHeader } from "@/components/PageHeader";
import { LogIn, UserPlus, KeyRound, Loader2 } from "lucide-react";
import { z } from "zod";

const emailSchema = z.string().email("Please enter a valid email address");
const passwordSchema = z.string().min(6, "Password must be at least 6 characters");

const Auth = () => {
  const { user, signIn, signUp, resetPassword, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [activeTab, setActiveTab] = useState(searchParams.get("mode") === "signup" ? "signup" : "login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user && !authLoading) {
      navigate("/", { replace: true });
    }
  }, [user, authLoading, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      emailSchema.parse(email);
      passwordSchema.parse(password);
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: err.errors[0].message,
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }
    }

    const { error } = await signIn(email, password);
    setIsLoading(false);

    if (error) {
      let message = "Failed to sign in";
      if (error.message.includes("Invalid login")) {
        message = "Invalid email or password";
      } else if (error.message.includes("Email not confirmed")) {
        message = "Please verify your email before signing in";
      }
      toast({
        title: "Sign In Failed",
        description: message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in."
      });
      navigate("/");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      emailSchema.parse(email);
      passwordSchema.parse(password);
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: err.errors[0].message,
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    const { error } = await signUp(email, password);
    setIsLoading(false);

    if (error) {
      let message = "Failed to create account";
      if (error.message.includes("already registered")) {
        message = "This email is already registered. Please sign in instead.";
      }
      toast({
        title: "Sign Up Failed",
        description: message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Account created!",
        description: "You can now sign in with your credentials."
      });
      setActiveTab("login");
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      emailSchema.parse(email);
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: err.errors[0].message,
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }
    }

    const { error } = await resetPassword(email);
    setIsLoading(false);

    if (error) {
      toast({
        title: "Reset Failed",
        description: "Failed to send reset email. Please try again.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Check your email",
        description: "We've sent you a password reset link."
      });
      setShowReset(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Sign In | SmartCalc Hub"
        description="Sign in to SmartCalc Hub to save your calculator history, favorites, and access personalized features."
        canonicalUrl="https://smartcalchub.com/auth"
      />

      <PageHeader
        title="Welcome to SmartCalc Hub"
        description="Sign in to save your calculations, access favorites, and sync across devices"
        icon={<LogIn className="h-10 w-10" />}
        category="utility"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          {showReset ? (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <KeyRound className="h-5 w-5" />
                  Reset Password
                </CardTitle>
                <CardDescription>
                  Enter your email to receive a password reset link
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleResetPassword}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reset-email">Email</Label>
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : null}
                    Send Reset Link
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowReset(false)}
                  >
                    Back to Sign In
                  </Button>
                </CardFooter>
              </form>
            </Card>
          ) : (
            <Card className="animate-fade-in">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <CardHeader>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login" className="flex items-center gap-2">
                      <LogIn className="h-4 w-4" />
                      Sign In
                    </TabsTrigger>
                    <TabsTrigger value="signup" className="flex items-center gap-2">
                      <UserPlus className="h-4 w-4" />
                      Sign Up
                    </TabsTrigger>
                  </TabsList>
                </CardHeader>

                <TabsContent value="login">
                  <form onSubmit={handleSignIn}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email">Email</Label>
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="login-password">Password</Label>
                        <Input
                          id="login-password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-primary to-primary-accent"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : null}
                        Sign In
                      </Button>
                      <Button
                        type="button"
                        variant="link"
                        onClick={() => setShowReset(true)}
                        className="text-sm"
                      >
                        Forgot your password?
                      </Button>
                    </CardFooter>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignUp}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-confirm">Confirm Password</Label>
                        <Input
                          id="signup-confirm"
                          type="password"
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-primary to-primary-accent"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : null}
                        Create Account
                      </Button>
                    </CardFooter>
                  </form>
                </TabsContent>
              </Tabs>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default Auth;
