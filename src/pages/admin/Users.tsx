import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RoleRow { id: string; user_id: string; role: string; created_at: string | null; }

const Users = () => {
  const [rows, setRows] = useState<RoleRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState<"admin" | "editor">("editor");
  const { toast } = useToast();

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("user_roles").select("*").order("created_at", { ascending: false });
    if (error) toast({ title: "Load error", description: error.message, variant: "destructive" });
    setRows((data as RoleRow[]) ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const assign = async () => {
    if (!userId) return toast({ title: "User ID required", variant: "destructive" });
    const { error } = await supabase.rpc("assign_role", { _target_user: userId, _role: role });
    if (error) toast({ title: "Assign failed", description: error.message, variant: "destructive" });
    else { toast({ title: "Role assigned" }); setUserId(""); load(); }
  };

  const revoke = async (uid: string, r: string) => {
    const { error } = await supabase.rpc("revoke_role", { _target_user: uid, _role: r as any });
    if (error) toast({ title: "Revoke failed", description: error.message, variant: "destructive" });
    else load();
  };

  return (
    <AdminLayout requireAdmin>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold">Users & Roles</h1>
          <p className="text-sm text-muted-foreground">
            Grant <code>admin</code> or <code>editor</code> access. Users must already have an account on the site.
          </p>
        </div>

        <Card className="p-4 space-y-3">
          <h2 className="font-semibold">Assign role</h2>
          <div className="grid sm:grid-cols-3 gap-2">
            <div className="sm:col-span-2 space-y-1">
              <Label>User ID (UUID from auth)</Label>
              <Input value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="00000000-0000-0000-0000-..." />
            </div>
            <div className="space-y-1">
              <Label>Role</Label>
              <select value={role} onChange={(e) => setRole(e.target.value as any)} className="w-full h-10 rounded-md border bg-background px-3 text-sm">
                <option value="editor">editor</option>
                <option value="admin">admin</option>
              </select>
            </div>
          </div>
          <Button onClick={assign}><Plus className="h-4 w-4" /> Assign</Button>
          <p className="text-xs text-muted-foreground">
            Tip: ask the user to sign up first, then copy their User ID from the Users area in the backend dashboard.
          </p>
        </Card>

        <Card className="p-4">
          <h2 className="font-semibold mb-3">Current role assignments</h2>
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <div className="space-y-2">
              {rows.map((r) => (
                <div key={r.id} className="flex items-center justify-between border rounded-md p-2 text-sm">
                  <div className="min-w-0">
                    <code className="text-xs">{r.user_id}</code>
                    <Badge className="ml-2" variant={r.role === "admin" ? "default" : "secondary"}>{r.role}</Badge>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => revoke(r.user_id, r.role)}><X className="h-4 w-4" /></Button>
                </div>
              ))}
              {rows.length === 0 && <p className="text-sm text-muted-foreground">No roles assigned yet.</p>}
            </div>
          )}
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Users;
