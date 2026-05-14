import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type UserRole = "admin" | "editor" | "moderator" | "user" | null;

export const useUserRole = () => {
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const refresh = async () => {
    setIsLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setRoles([]);
      setUserId(null);
      setIsLoading(false);
      return;
    }
    setUserId(user.id);
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id);
    setRoles((data?.map((r) => r.role as UserRole) ?? []));
    setIsLoading(false);
  };

  useEffect(() => {
    refresh();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => refresh());
    return () => subscription.unsubscribe();
  }, []);

  const isAdmin = roles.includes("admin");
  const isEditor = isAdmin || roles.includes("editor");

  return { roles, isAdmin, isEditor, isLoading, userId, refresh };
};
