import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";

const AdminEntry = () => {
  const { user, isLoading: authLoading } = useAuth();
  const { isEditor, isLoading: roleLoading } = useUserRole();
  const [adminExists, setAdminExists] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.rpc("admin_exists").then(({ data }) => setAdminExists(Boolean(data)));
  }, []);

  if (authLoading || roleLoading || adminExists === null) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-muted-foreground">
        <Loader2 className="h-5 w-5 mr-2 animate-spin" /> Loading…
      </div>
    );
  }

  if (isEditor) return <Navigate to="/admin/cms" replace />;
  if (!adminExists) return <Navigate to="/admin/setup" replace />;
  if (!user) return <Navigate to="/auth?redirect=/admin" replace />;
  return <Navigate to="/admin/setup" replace />;
};

export default AdminEntry;
