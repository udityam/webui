import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Server, Users, Shield, TrendingUp, ArrowUpRight, Clock, AlertTriangle } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";

const stats = [
  { label: "Total Assets", value: "1,284", icon: Server, delta: "+12", trend: "up", hint: "this week" },
  { label: "Active Sessions", value: "37", icon: Activity, delta: "+3", trend: "up", hint: "vs yesterday" },
  { label: "Total Users", value: "246", icon: Users, delta: "+5", trend: "up", hint: "this month" },
  { label: "Permissions", value: "89", icon: Shield, delta: "0", trend: "flat", hint: "stable" },
];

const data = Array.from({ length: 14 }, (_, i) => ({
  day: `D${i + 1}`,
  sessions: Math.round(20 + Math.random() * 40),
  logins: Math.round(40 + Math.random() * 60),
}));

const recentActivity = [
  { user: "admin", action: "logged into prod-db-01", time: "2m ago", type: "session" },
  { user: "alice.k", action: "created asset web-server-12", time: "14m ago", type: "asset" },
  { user: "bob.m", action: "updated ACL rule #221", time: "1h ago", type: "policy" },
  { user: "system", action: "rotated secrets vault key", time: "3h ago", type: "secret" },
];

const alerts = [
  { level: "high", text: "Failed login spike on bastion-east", time: "12m ago" },
  { level: "medium", text: "Secret expiring in 3 days: api-prod", time: "2h ago" },
];

const Dashboard = () => (
  <div>
    <PageHeader
      title="Dashboard"
      description="Real-time overview of your Infosoft access management environment."
    />

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <Card key={s.label} className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-shadow border-border/60">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.label}</p>
                <p className="text-3xl font-semibold mt-2 tracking-tight">{s.value}</p>
              </div>
              <div className="size-10 rounded-lg bg-accent grid place-items-center">
                <s.icon className="size-5 text-accent-foreground" />
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-4 text-xs">
              <span className={`inline-flex items-center gap-0.5 font-medium ${s.trend === "up" ? "text-[hsl(var(--success))]" : "text-muted-foreground"}`}>
                <TrendingUp className="size-3" /> {s.delta}
              </span>
              <span className="text-muted-foreground">{s.hint}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

    <div className="grid gap-4 lg:grid-cols-3 mt-6">
      <Card className="lg:col-span-2 shadow-[var(--shadow-card)] border-border/60">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-base">Activity overview</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">Sessions & logins · last 14 days</p>
          </div>
          <Badge variant="secondary" className="font-normal">Live</Badge>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary-glow))" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(var(--primary-glow))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 12,
                    boxShadow: "var(--shadow-soft)",
                  }}
                />
                <Area type="monotone" dataKey="logins" stroke="hsl(var(--primary-glow))" strokeWidth={2} fill="url(#g2)" />
                <Area type="monotone" dataKey="sessions" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-[var(--shadow-card)] border-border/60">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <AlertTriangle className="size-4 text-[hsl(var(--warning))]" />
            Active alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {alerts.map((a, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-border/60 bg-secondary/40">
              <span className={`mt-1 size-2 rounded-full shrink-0 ${a.level === "high" ? "bg-destructive" : "bg-[hsl(var(--warning))]"}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-snug">{a.text}</p>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <Clock className="size-3" /> {a.time}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>

    <Card className="mt-6 shadow-[var(--shadow-card)] border-border/60">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base">Recent activity</CardTitle>
        <button className="text-xs text-primary font-medium hover:underline inline-flex items-center gap-0.5">
          View all <ArrowUpRight className="size-3" />
        </button>
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-border/60">
          {recentActivity.map((a, i) => (
            <div key={i} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
              <div className="size-8 rounded-full bg-accent grid place-items-center text-xs font-semibold text-accent-foreground shrink-0">
                {a.user.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-medium">{a.user}</span>{" "}
                  <span className="text-muted-foreground">{a.action}</span>
                </p>
              </div>
              <Badge variant="secondary" className="font-normal text-xs capitalize">{a.type}</Badge>
              <span className="text-xs text-muted-foreground shrink-0 hidden sm:block">{a.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

export default Dashboard;
