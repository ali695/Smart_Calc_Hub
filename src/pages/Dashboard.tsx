import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useRealtimeFavorites } from "@/hooks/useRealtimeFavorites";
import { useRealtimeHistory } from "@/hooks/useRealtimeHistory";
import { useUserStats } from "@/hooks/useUserStats";
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
  Loader2, ExternalLink, Clock, TrendingUp, Settings, BarChart3
} from "lucide-react";
import { format } from "date-fns";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

const Dashboard = () => {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "overview");
  
  const { favorites, isLoading: favLoading, toggleFavorite } = useRealtimeFavorites();
  const { history, isLoading: histLoading, deleteHistory } = useRealtimeHistory();
  const { stats, isLoading: statsLoading } = useUserStats();

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
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview" className="gap-2">
                <Calculator className="h-4 w-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="favorites" className="gap-2">
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">Favorites</span>
                <Badge variant="secondary" className="ml-1 text-xs">{favorites.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="history" className="gap-2">
                <History className="h-4 w-4" />
                <span className="hidden sm:inline">History</span>
                <Badge variant="secondary" className="ml-1 text-xs">{history.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Analytics</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Welcome Card */}
              <Card className="bg-gradient-to-r from-primary/10 to-primary-accent/10 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">Welcome back!</h2>
                      <p className="text-muted-foreground">{user.email}</p>
                    </div>
                    <Button asChild variant="outline">
                      <Link to="/profile">
                        <Settings className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total Calculations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{stats.totalCalculations}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Favorites
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-rose-500">{stats.favoriteCount}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Most Used
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-semibold truncate">
                      {stats.mostUsedCalculator 
                        ? getCalculatorName(stats.mostUsedCalculator) 
                        : "N/A"}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Member Since
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-semibold">
                      {stats.accountCreated 
                        ? format(new Date(stats.accountCreated), "MMM yyyy") 
                        : "N/A"}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Recent History */}
                {history.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <History className="h-5 w-5 text-blue-500" />
                        Recent Calculations
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {history.slice(0, 3).map((entry) => (
                        <div key={entry.id} className="flex items-center justify-between py-2 border-b last:border-0">
                          <div>
                            <p className="font-medium text-sm">{getCalculatorName(entry.calculator_slug)}</p>
                            <p className="text-xs text-muted-foreground">
                              {format(new Date(entry.created_at!), "MMM d, HH:mm")}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={getCalculatorUrl(entry.calculator_slug)}>
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Favorites Quick Access */}
                {favorites.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Heart className="h-5 w-5 text-rose-500" />
                        Favorite Calculators
                      </CardTitle>
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
              </div>

              {/* Continue Last Calculator */}
              {history.length > 0 && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Continue where you left off</p>
                        <p className="text-sm text-muted-foreground">
                          {getCalculatorName(history[0].calculator_slug)}
                        </p>
                      </div>
                      <Button asChild className="bg-gradient-to-r from-primary to-primary-accent">
                        <Link to={getCalculatorUrl(history[0].calculator_slug)}>
                          Continue
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
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

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Activity Overview
                  </CardTitle>
                  <CardDescription>Your calculation activity over the last 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  {statsLoading ? (
                    <div className="flex justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : stats.recentActivity.length > 0 ? (
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={stats.recentActivity}>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis 
                            dataKey="date" 
                            tick={{ fontSize: 12 }}
                            tickFormatter={(value) => format(new Date(value), "EEE")}
                          />
                          <YAxis tick={{ fontSize: 12 }} />
                          <Tooltip 
                            labelFormatter={(value) => format(new Date(value), "MMM d, yyyy")}
                            contentStyle={{
                              backgroundColor: 'hsl(var(--card))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px',
                            }}
                          />
                          <Bar 
                            dataKey="count" 
                            fill="hsl(var(--primary))" 
                            radius={[4, 4, 0, 0]}
                            name="Calculations"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No activity data yet. Start using calculators to see your stats!</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total Calculations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{stats.totalCalculations}</p>
                    <p className="text-xs text-muted-foreground mt-1">All time</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Most Used Calculator
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold truncate">
                      {stats.mostUsedCalculator 
                        ? getCalculatorName(stats.mostUsedCalculator) 
                        : "N/A"}
                    </p>
                    {stats.mostUsedCalculator && (
                      <Button variant="link" className="p-0 h-auto text-xs" asChild>
                        <Link to={getCalculatorUrl(stats.mostUsedCalculator)}>
                          Open Calculator
                        </Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Saved Favorites
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-rose-500">{stats.favoriteCount}</p>
                    <p className="text-xs text-muted-foreground mt-1">Quick access calculators</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
