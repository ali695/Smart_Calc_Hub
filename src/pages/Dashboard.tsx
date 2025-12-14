import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useRealtimeFavorites } from "@/hooks/useRealtimeFavorites";
import { useRealtimeHistory } from "@/hooks/useRealtimeHistory";
import { SEOHead } from "@/components/SEOHead";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { calculators } from "@/data/calculators";
import { 
  User, Heart, History, Trash2, Calculator, 
  Loader2, ExternalLink, Clock 
} from "lucide-react";
import { format } from "date-fns";

const Dashboard = () => {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "overview");
  
  const { favorites, isLoading: favLoading } = useRealtimeFavorites();
  const { history, isLoading: histLoading, deleteHistory } = useRealtimeHistory();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth", { replace: true });
    }
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  const getCalculatorName = (slug: string) => {
    const calc = calculators.find(c => c.id === slug);
    return calc?.title || slug;
  };

  const getCalculatorUrl = (slug: string) => {
    return `/calculator/${slug}`;
  };

  return (
    <>
      <SEOHead
        title="Dashboard | SmartCalc Hub"
        description="View your saved calculations, favorites, and personalized calculator experience."
        canonicalUrl="https://smartcalchub.com/dashboard"
      />

      <PageHeader
        title="Your Dashboard"
        description="View your favorites, calculation history, and personalized experience"
        icon={<User className="h-10 w-10" />}
        category="utility"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="overview" className="gap-2">
                <Calculator className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="favorites" className="gap-2">
                <Heart className="h-4 w-4" />
                Favorites ({favorites.length})
              </TabsTrigger>
              <TabsTrigger value="history" className="gap-2">
                <History className="h-4 w-4" />
                History ({history.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Heart className="h-5 w-5 text-red-500" />
                      Favorites
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{favorites.length}</p>
                    <p className="text-sm text-muted-foreground">Saved calculators</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <History className="h-5 w-5 text-blue-500" />
                      Calculations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{history.length}</p>
                    <p className="text-sm text-muted-foreground">Recent calculations</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="h-5 w-5 text-green-500" />
                      Account
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-medium truncate">{user.email}</p>
                    <p className="text-sm text-muted-foreground">Active</p>
                  </CardContent>
                </Card>
              </div>

              {favorites.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5" />
                      Quick Access
                    </CardTitle>
                    <CardDescription>Your favorite calculators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {favorites.slice(0, 6).map((fav) => (
                        <Button key={fav.id} variant="outline" size="sm" asChild>
                          <Link to={getCalculatorUrl(fav.calculator_slug)}>
                            {getCalculatorName(fav.calculator_slug)}
                          </Link>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="favorites" className="space-y-4">
              {favLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : favorites.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-lg font-medium">No favorites yet</p>
                    <p className="text-muted-foreground mb-4">
                      Start adding calculators to your favorites for quick access
                    </p>
                    <Button asChild>
                      <Link to="/categories">Browse Calculators</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {favorites.map((fav) => (
                    <Card key={fav.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <p className="font-medium">{getCalculatorName(fav.calculator_slug)}</p>
                          <p className="text-sm text-muted-foreground">
                            Added {format(new Date(fav.created_at), "MMM d, yyyy")}
                          </p>
                        </div>
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={getCalculatorUrl(fav.calculator_slug)}>
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              {histLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : history.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <History className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-lg font-medium">No calculation history</p>
                    <p className="text-muted-foreground mb-4">
                      Your calculations will appear here after you use any calculator
                    </p>
                    <Button asChild>
                      <Link to="/categories">Start Calculating</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {history.map((entry) => (
                    <Card key={entry.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <p className="font-medium">{getCalculatorName(entry.calculator_slug)}</p>
                              <Badge variant="secondary" className="text-xs">
                                <Clock className="h-3 w-3 mr-1" />
                                {format(new Date(entry.created_at), "MMM d, HH:mm")}
                              </Badge>
                            </div>
                            {entry.result_data && (
                              <div className="text-sm text-muted-foreground">
                                <span className="font-medium">Result: </span>
                                {Object.entries(entry.result_data).slice(0, 2).map(([key, val], i) => (
                                  <span key={key}>
                                    {i > 0 && ", "}
                                    {key}: {String(val)}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" asChild>
                              <Link to={getCalculatorUrl(entry.calculator_slug)}>
                                <ExternalLink className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteHistory(entry.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
