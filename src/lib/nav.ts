import {
  LayoutDashboard, Users as UsersIcon, Server, KeyRound, Shield, Tag,
  Activity, Terminal, FileText, Briefcase, FolderOpen, Ticket,
  Settings as SettingsIcon, User, BarChart3, Cloud, Shapes, Network,
  ScrollText, History, Workflow, ListChecks, Lock, Globe, Database,
  HardDrive, Bot, Package, MapPin, Building2, Mail, Bell, Palette,
  Languages, Wrench, FileBarChart, AlertTriangle, GitBranch,
} from "lucide-react";

export type NavChild = { title: string; url: string };
export type NavGroup = { title: string; url?: string; icon: React.ComponentType<{ className?: string }>; items?: NavChild[] };
export type NavSection = { title: string; url: string; icon: React.ComponentType<{ className?: string }>; groups: NavGroup[] };

export const SECTIONS: NavSection[] = [
  {
    title: "Console",
    url: "/console",
    icon: LayoutDashboard,
    groups: [
      {
        title: "Dashboard",
        url: "/console/dashboard",
        icon: LayoutDashboard,
      },

      {
        title: "Vault",
        icon: Shield,
        items: [
          { title: "Folders (Safes)", url: "/console/vault/folders" },
          { title: "Secret Templates", url: "/console/vault/templates" },
          { title: "Passwords", url: "/console/vault/passwords" },
          { title: "SSH Keys", url: "/console/vault/ssh-keys" },
          { title: "API Keys", url: "/console/vault/api-keys" },
          { title: "Certificates", url: "/console/vault/certificates" },
          { title: "Checkout / Check-in", url: "/console/vault/checkout" },
          { title: "Password History", url: "/console/vault/history" },
          { title: "A2A Access", url: "/console/vault/a2a" },
        ],
      },

      {
        title: "Assets",
        icon: Server,
        items: [
          { title: "Servers & Hosts", url: "/console/assets/servers" },
          { title: "Databases", url: "/console/assets/databases" },
          { title: "Network Devices", url: "/console/assets/network-devices" },
          { title: "Applications", url: "/console/assets/applications" },
          { title: "Cloud / Kubernetes", url: "/console/assets/cloud" },
          { title: "Discovery Wizard", url: "/console/assets/discovery" },
          { title: "Import & Bulk", url: "/console/assets/import" },
        ],
      },

      {
        title: "Access",
        icon: KeyRound,
        items: [
          { title: "Sessions", url: "/console/access/sessions" },
          { title: "Access Requests", url: "/console/access/requests" },
          { title: "Launchpad", url: "/console/access/launchpad" },
          { title: "Ad Hoc Connection", url: "/console/access/adhoc" },
          { title: "Emergency Access", url: "/console/access/emergency" },
          { title: "Privilege Elevation", url: "/console/access/elevation" },
          { title: "Vendor Access", url: "/console/access/vendor" },
        ],
      },

      {
        title: "Policies",
        icon: FileText,
        items: [
          { title: "Target Platforms", url: "/console/policies/platforms" },
          { title: "Password Rotation", url: "/console/policies/password-rotation" },
          { title: "Session Policies", url: "/console/policies/session" },
          { title: "Approval Workflows", url: "/console/policies/approval" },
          { title: "MFA Rules", url: "/console/policies/mfa" },
          { title: "Time Restrictions", url: "/console/policies/time" },
          { title: "Command Filters", url: "/console/policies/commands" },
          { title: "Risk Rules", url: "/console/policies/risk" },
          { title: "Geo-fencing", url: "/console/policies/geofence" },
        ],
      },

      {
        title: "Audit",
        icon: Activity,
        items: [
          { title: "Live Feed", url: "/console/audit/live-feed" },
          { title: "Reports", url: "/console/audit/reports" },
          { title: "Session Recordings", url: "/console/audit/recordings" },
          { title: "Analytics", url: "/console/audit/analytics" },
          { title: "Compliance Mapping", url: "/console/audit/compliance" },
        ],
      },

      {
        title: "Settings",
        icon: SettingsIcon,
        items: [
          { title: "User Management", url: "/console/settings/users" },
          { title: "Authentication", url: "/console/settings/authentication" },
          { title: "API & Webhooks", url: "/console/settings/api-webhooks" },
          { title: "Notifications", url: "/console/settings/notifications" },
          { title: "Backup & Restore", url: "/console/settings/backup-restore" },
          { title: "System Health", url: "/console/settings/system-health" },
          { title: "License", url: "/console/settings/license" },
        ],
      },
    ],
  },
  {
    title: "PAM", url: "/pam", icon: Lock,
    groups: [
      { title: "Dashboard", url: "/pam/dashboard", icon: LayoutDashboard },
      {
        title: "ACLs", icon: ListChecks, items: [
          { title: "Login ACLs", url: "/pam/acls/login" },
          { title: "Asset Login ACLs", url: "/pam/acls/login-asset" },
          { title: "Command Filter ACLs", url: "/pam/acls/cmd" },
          { title: "Command Groups", url: "/pam/acls/cmd-groups" },
          { title: "Connect Method ACLs", url: "/pam/acls/connect-method" },
          { title: "Data Masking", url: "/pam/acls/data-masking" },
        ]
      },
      {
        title: "Sessions", icon: Activity, items: [
          { title: "Sessions", url: "/pam/sessions" },
          { title: "Commands", url: "/pam/commands" },
          { title: "Web Terminal", url: "/pam/terminal" },
          { title: "File Management", url: "/pam/files" },
        ]
      },
    ],
  },
  {
    title: "Audits", url: "/audit", icon: BarChart3,
    groups: [
      { title: "Dashboard", url: "/audit/dashboard", icon: LayoutDashboard },
      { title: "Sessions Audit", url: "/audit/sessions", icon: History },
      { title: "Logs Audit", url: "/audit/audits", icon: ScrollText },
      { title: "Jobs Audit", url: "/audit/jobs", icon: Workflow },
      { title: "Tickets Audit", url: "/audit/tickets", icon: Ticket },
      { title: "Reports", url: "/audit/reports", icon: FileBarChart },
    ],
  },
  {
    title: "Workbench", url: "/workbench", icon: Briefcase,
    groups: [
      { title: "Overview", url: "/workbench/home", icon: LayoutDashboard },
      {
        title: "My Assets", icon: Server, items: [
          { title: "Connect Assets", url: "/workbench/assets" },
          { title: "File Transfer", url: "/workbench/assets/file-transfer" },
          { title: "K8s", url: "/workbench/assets/k8s" },
        ]
      },
      {
        title: "Job Center", icon: Terminal, items: [
          { title: "Jobs", url: "/workbench/jobs" },
          { title: "Adhoc", url: "/workbench/jobs/adhoc" },
          { title: "Playbook", url: "/workbench/jobs/playbook" },
          { title: "Schedules", url: "/workbench/jobs/schedules" },
          { title: "Job Logs", url: "/workbench/jobs/logs" },
        ]
      },
    ],
  },
  {
    title: "Tickets", url: "/tickets", icon: Ticket,
    groups: [
      { title: "My Tickets", url: "/tickets/mine", icon: Ticket },
      { title: "Assigned", url: "/tickets/assigned", icon: ListChecks },
      { title: "All Tickets", url: "/tickets/all", icon: FolderOpen },
      { title: "Flow Settings", url: "/tickets/flows", icon: GitBranch },
    ],
  },
  {
    title: "Reports", url: "/reports", icon: FileBarChart,
    groups: [
      { title: "Reports", url: "/reports", icon: FileText },
      { title: "Risk Reports", url: "/reports/risk", icon: AlertTriangle },
    ],
  },
  {
    title: "Settings", url: "/settings", icon: SettingsIcon,
    groups: [
      { title: "Basic", url: "/settings/basic", icon: SettingsIcon },
      { title: "Email", url: "/settings/email", icon: Mail },
      { title: "Auth", url: "/settings/auth", icon: Lock },
      { title: "Terminal", url: "/settings/terminal", icon: Terminal },
      { title: "Storage", url: "/settings/storage", icon: HardDrive },
      { title: "Security", url: "/settings/security", icon: Shield },
      { title: "Message Subscription", url: "/settings/messages", icon: Bell },
      { title: "Appearance", url: "/settings/appearance", icon: Palette },
      { title: "Languages", url: "/settings/languages", icon: Languages },
      { title: "License", url: "/settings/license", icon: Package },
      { title: "Tools", url: "/settings/tools", icon: Wrench },
      { title: "About", url: "/settings/about", icon: Building2 },
    ],
  },
  {
    title: "Profile", url: "/profile", icon: User,
    groups: [
      { title: "Profile", url: "/profile", icon: User },
      { title: "Tokens", url: "/profile/tokens", icon: KeyRound },
      { title: "MFA", url: "/profile/mfa", icon: Shield },
      { title: "Connections", url: "/profile/connections", icon: Network },
      { title: "Subscriptions", url: "/profile/subscriptions", icon: Bell },
      { title: "Files", url: "/profile/files", icon: FolderOpen },
    ],
  },
];

// flat list for placeholder route generation
export const ALL_ROUTES: { url: string; title: string; section: string }[] = SECTIONS.flatMap((s) =>
  s.groups.flatMap((g) => {
    if (g.url) return [{ url: g.url, title: g.title, section: s.title }];
    return (g.items ?? []).map((i) => ({ url: i.url, title: i.title, section: s.title }));
  })
);
