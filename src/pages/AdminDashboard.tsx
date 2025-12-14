import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Loader2, Mail, MessageSquare, Activity, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribed_at: string;
  is_active: boolean;
}

interface ContactMessage {
  id: number;
  name: string | null;
  email: string;
  message: string;
  submitted_at: string | null;
}

interface AnalyticsLog {
  id: number;
  created_at: string | null;
  event_type: string;
  calculator_slug: string | null;
  user_id: string | null;
  metadata: any | null;
}

export const AdminDashboard = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [logs, setLogs] = useState<AnalyticsLog[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
          setIsAdmin(false);
          setIsLoading(false);
          return;
        }

        // Check admin role using RLS-protected user_roles table
        const { data: roles, error: rolesError } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id);

        if (rolesError) {
          console.error("Error loading roles", rolesError);
          toast({
            title: "Access Error",
            description: "Could not verify your admin permissions.",
            variant: "destructive",
          });
          setIsAdmin(false);
          setIsLoading(false);
          return;
        }

        const hasAdminRole = roles?.some((r) => r.role === "admin");
        setIsAdmin(hasAdminRole ?? false);

        if (!hasAdminRole) {
          setIsLoading(false);
          return;
        }

        // Load admin datasets (RLS ensures only admins can read)
        const [subRes, msgRes, logRes] = await Promise.all([
          supabase
            .from("newsletter_subscribers")
            .select("id, email, subscribed_at, is_active")
            .order("subscribed_at", { ascending: false })
            .limit(200),
          supabase
            .from("contact_messages")
            .select("id, name, email, message, submitted_at")
            .order("submitted_at", { ascending: false })
            .limit(200),
          supabase
            .from("analytics_logs")
            .select("id, created_at, event_type, calculator_slug, user_id, metadata")
            .order("created_at", { ascending: false })
            .limit(300),
        ]);

        if (subRes.error || msgRes.error || logRes.error) {
          console.error("Admin data load error", subRes.error, msgRes.error, logRes.error);
          toast({
            title: "Load Error",
            description: "Failed to load one or more admin datasets.",
            variant: "destructive",
          });
        }

        setSubscribers(subRes.data || []);
        setMessages(msgRes.data || []);
        setLogs((logRes.data as any) || []);
      } catch (error) {
        console.error("Unexpected admin dashboard error", error);
        toast({
          title: "Unexpected Error",
          description: "Something went wrong loading the admin dashboard.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [toast]);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <PageHeader
        title="Admin Dashboard"
        description="Internal view of newsletter subscribers, contact messages, and calculator analytics."
        category="business"
      />

      <section aria-label="Admin dashboard content" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Secure Admin Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-10 text-muted-foreground">
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Loading admin data...
              </div>
            ) : isAdmin ? (
              <Tabs defaultValue="subscribers" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="subscribers" className="flex items-center gap-1">
                    <Mail className="h-4 w-4" /> Subscribers
                  </TabsTrigger>
                  <TabsTrigger value="messages" className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" /> Messages
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="flex items-center gap-1">
                    <Activity className="h-4 w-4" /> Analytics
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="subscribers" className="space-y-2">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Subscribed At</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subscribers.map((s) => (
                        <TableRow key={s.id}>
                          <TableCell>{s.email}</TableCell>
                          <TableCell>{s.subscribed_at ? new Date(s.subscribed_at).toLocaleString() : "-"}</TableCell>
                          <TableCell>{s.is_active ? "Active" : "Inactive"}</TableCell>
                        </TableRow>
                      ))}
                      {subscribers.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center text-muted-foreground">
                            No subscribers found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="messages" className="space-y-2">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Submitted At</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {messages.map((m) => (
                        <TableRow key={m.id}>
                          <TableCell>{m.name || "-"}</TableCell>
                          <TableCell>{m.email}</TableCell>
                          <TableCell className="max-w-md truncate" title={m.message}>
                            {m.message}
                          </TableCell>
                          <TableCell>{m.submitted_at ? new Date(m.submitted_at).toLocaleString() : "-"}</TableCell>
                        </TableRow>
                      ))}
                      {messages.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center text-muted-foreground">
                            No messages found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-2">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Time</TableHead>
                        <TableHead>Event</TableHead>
                        <TableHead>Calculator</TableHead>
                        <TableHead>User ID</TableHead>
                        <TableHead>Metadata (JSON)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {logs.map((l) => (
                        <TableRow key={l.id}>
                          <TableCell>{l.created_at ? new Date(l.created_at).toLocaleString() : "-"}</TableCell>
                          <TableCell>{l.event_type}</TableCell>
                          <TableCell>{l.calculator_slug || "-"}</TableCell>
                          <TableCell className="max-w-[160px] truncate" title={l.user_id || undefined}>
                            {l.user_id || "-"}
                          </TableCell>
                          <TableCell className="max-w-md truncate" title={l.metadata ? JSON.stringify(l.metadata) : undefined}>
                            {l.metadata ? JSON.stringify(l.metadata) : "-"}
                          </TableCell>
                        </TableRow>
                      ))}
                      {logs.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-muted-foreground">
                            No analytics events found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            ) : (
              <p className="py-4 text-sm text-muted-foreground">
                You do not have permission to view this page. Admin access is required.
              </p>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default AdminDashboard;
