import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield, Loader2, CheckCircle2, AlertCircle, LogIn } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AdminSetup = () => {
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const { isAdmin, refresh, isLoading: roleLoading } = useUserRole();
  const [adminExists, setAdminExists] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(true);
  const [claiming, setClaiming] = useState(false);

  useEffect(() => {
    (async () => {
      setChecking(true);
      const { data, error } = await supabase.rpc("admin_exists");
      if (error) {
        console.error(error);
        toast({ title: "Could not check admin status", description: error.message, variant: "destructive" });
      }
      setAdminExists(Boolean(data));
      setChecking(false);
    })();
  }, []);

  useEffect(() => {
    if (isAdmin) navigate("/admin/cms", { replace: true });
  }, [isAdmin, navigate]);

  const handleClaim = async () => {
    setClaiming(true);
    const { error } = await supabase.rpc("claim_first_admin");
    setClaiming(false);
    if (error) {
      toast({ title: "Could not claim admin", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "You are now an admin", description: "Redirecting to the dashboard…" });
    await refresh();
    navigate("/admin/cms", { replace: true });
  };

  const loading = authLoading || roleLoading || checking;

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Admin Setup</CardTitle>
          <CardDescription>Bootstrap the first admin for the CMS dashboard.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-6 text-muted-foreground">
              <Loader2 className="h-5 w-5 mr-2 animate-spin" /> Checking…
            </div>
          ) : !user ? (
            <div className="space-y-3 text-center">
              <p className="text-sm text-muted-foreground">
                Sign in first with the account you want to make admin.
              </p>
              <Button asChild className="w-full">
                <Link to={`/auth?redirect=${encodeURIComponent("/admin/setup")}`}>
                  <LogIn className="h-4 w-4 mr-2" /> Sign in / Sign up
                </Link>
              </Button>
            </div>
          ) : adminExists ? (
            <div className="space-y-3">
              <div className="flex items-start gap-2 rounded-md border bg-muted/40 p-3 text-sm">
                <AlertCircle className="h-4 w-4 mt-0.5 text-amber-500 shrink-0" />
                <div>
                  <p className="font-medium">Admin already configured.</p>
                  <p className="text-muted-foreground">
                    Ask an existing admin to grant you access from{" "}
                    <span className="font-mono text-xs">/admin/cms/users</span>.
                  </p>
                </div>
              </div>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/">Back to site</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="rounded-md border bg-muted/40 p-3 text-sm">
                <p className="font-medium">Signed in as</p>
                <p className="text-muted-foreground break-all">{user.email}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                No admin exists yet. Click below to assign yourself the <strong>admin</strong> role.
                This can only be done once.
              </p>
              <Button onClick={handleClaim} disabled={claiming} className="w-full">
                {claiming ? (
                  <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Claiming…</>
                ) : (
                  <><CheckCircle2 className="h-4 w-4 mr-2" /> Make me admin</>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSetup;
