import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import { useUserRole } from "@/hooks/useUserRole";
import { supabase } from "@/integrations/supabase/client";
import {
  LayoutDashboard, FileText, FileEdit, Calculator, Users, Loader2, Menu, X, ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  requireAdmin?: boolean;
}

const nav = [
  { to: "/admin/cms", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/cms/blogs", label: "Blogs", icon: FileText },
  { to: "/admin/cms/pages", label: "Pages", icon: FileEdit },
  { to: "/admin/cms/calculators", label: "Calculators", icon: Calculator },
  { to: "/admin/cms/users", label: "Users", icon: Users, adminOnly: true },
];

export const AdminLayout = ({ children, requireAdmin = false }: Props) => {
  const { isAdmin, isEditor, isLoading } = useUserRole();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [adminExists, setAdminExists] = useState<boolean | null>(null);

  useEffect(() => {
    if (!isLoading && !isEditor) {
      supabase.rpc("admin_exists").then(({ data }) => setAdminExists(Boolean(data)));
    }
  }, [isLoading, isEditor]);

  if (isLoading || (!isEditor && adminExists === null)) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-muted-foreground">
        <Loader2 className="h-5 w-5 mr-2 animate-spin" /> Loading...
      </div>
    );
  }

  if (!isEditor) {
    return <Navigate to={adminExists ? "/auth" : "/admin/setup"} replace />;
  }
  if (requireAdmin && !isAdmin) return <Navigate to="/admin/cms" replace />;

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <h1 className="text-xl font-semibold">Admin CMS</h1>
          <Button variant="outline" size="sm" onClick={() => setOpen((o) => !o)}>
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <aside
            className={cn(
              "lg:w-60 lg:block bg-card border rounded-lg p-3 h-fit lg:sticky lg:top-20",
              open ? "block" : "hidden",
            )}
          >
            <Link to="/" className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Back to site
            </Link>
            <nav className="space-y-1 mt-2">
              {nav
                .filter((n) => !n.adminOnly || isAdmin)
                .map((item) => {
                  const Icon = item.icon;
                  const active = item.exact
                    ? location.pathname === item.to
                    : location.pathname.startsWith(item.to);
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                        active
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      <Icon className="h-4 w-4" /> {item.label}
                    </Link>
                  );
                })}
            </nav>
          </aside>

          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
};
