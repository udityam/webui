// Per-route table configuration to mirror JumpServer's Vue list pages,
// rebranded as Infosoft. Keeps it lightweight: columns + small mock dataset.

export type ColumnDef = { key: string; label: string };
export type ModuleConfig = {
  title: string;
  description?: string;
  columns: ColumnDef[];
  rows: Record<string, string>[];
  addLabel?: string;
};

const ts = (mins: number) => `${mins} min ago`;

export const MODULE_CONFIGS: Record<string, ModuleConfig> = {
  // ===== Console / Users =====
  "/console/users": {
  title: "Users",
  description: "Manage console users and access roles.",
  addLabel: "Create user",

  columns: [
    { key: "username", label: "Username" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "roles", label: "Roles" },
    { key: "enabled", label: "Enabled" },
  ],

  rows: [],
},

  "/console/users/groups": {
    title: "User groups", description: "Group users for permission assignment.",
    addLabel: "Create group",
    columns: [
      { key: "name", label: "Name" },
      { key: "users", label: "Users" },
      { key: "comment", label: "Comment" },
      { key: "created", label: "Created" },
    ],
    rows: [
      { name: "DevOps", users: "12", comment: "Infrastructure team", created: "2025-08-12" },
      { name: "DBAs", users: "5", comment: "Database admins", created: "2025-09-01" },
      { name: "Auditors", users: "3", comment: "Read-only auditors", created: "2025-10-04" },
    ],
  },

  // ===== Console / Assets =====
  "/console/assets": {
    title: "Assets", description: "All managed assets in your inventory.",
    addLabel: "Create asset",
    columns: [
      { key: "name", label: "Name" }, { key: "address", label: "Address" },
      { key: "type", label: "Type" }, { key: "platform", label: "Platform" },
      { key: "zone", label: "Zone" }, { key: "status", label: "Status" },
    ],
    rows: [
      { name: "prod-web-01", address: "10.0.1.21", type: "Host", platform: "Linux", zone: "Default", status: "Active" },
      { name: "prod-db-02", address: "10.0.2.15", type: "Database", platform: "MySQL", zone: "DB", status: "Active" },
      { name: "win-jump-05", address: "10.0.3.5", type: "Host", platform: "Windows", zone: "Office", status: "Active" },
      { name: "k8s-cluster-1", address: "10.0.4.10", type: "Cloud", platform: "Kubernetes", zone: "Cloud", status: "Active" },
      { name: "fw-edge-01", address: "10.0.0.1", type: "Device", platform: "Cisco", zone: "Edge", status: "Down" },
    ],
  },
  "/console/assets/hosts": {
    title: "Hosts", description: "Linux / Windows / Unix hosts.",
    addLabel: "Create host",
    columns: [
      { key: "name", label: "Name" }, { key: "address", label: "Address" },
      { key: "platform", label: "Platform" }, { key: "protocol", label: "Protocol" },
      { key: "status", label: "Status" },
    ],
    rows: [
      { name: "prod-web-01", address: "10.0.1.21", platform: "Linux", protocol: "SSH", status: "Active" },
      { name: "prod-app-02", address: "10.0.1.22", platform: "Linux", protocol: "SSH", status: "Active" },
      { name: "win-jump-05", address: "10.0.3.5", platform: "Windows", protocol: "RDP", status: "Active" },
      { name: "bastion-01", address: "10.0.0.10", platform: "Linux", protocol: "SSH", status: "Active" },
    ],
  },
  "/console/assets/databases": {
    title: "Databases", description: "MySQL, PostgreSQL, Oracle and more.",
    addLabel: "Create database",
    columns: [
      { key: "name", label: "Name" }, { key: "address", label: "Address" },
      { key: "engine", label: "Engine" }, { key: "port", label: "Port" }, { key: "status", label: "Status" },
    ],
    rows: [
      { name: "prod-db-02", address: "10.0.2.15", engine: "MySQL", port: "3306", status: "Active" },
      { name: "analytics-pg", address: "10.0.2.20", engine: "PostgreSQL", port: "5432", status: "Active" },
      { name: "legacy-oracle", address: "10.0.2.30", engine: "Oracle", port: "1521", status: "Active" },
    ],
  },
  "/console/assets/devices": {
    title: "Devices", description: "Network and security devices.",
    addLabel: "Create device",
    columns: [
      { key: "name", label: "Name" }, { key: "address", label: "Address" },
      { key: "vendor", label: "Vendor" }, { key: "type", label: "Type" }, { key: "status", label: "Status" },
    ],
    rows: [
      { name: "fw-edge-01", address: "10.0.0.1", vendor: "Cisco", type: "Firewall", status: "Active" },
      { name: "sw-core-01", address: "10.0.0.2", vendor: "Juniper", type: "Switch", status: "Active" },
      { name: "rt-wan-01", address: "10.0.0.3", vendor: "MikroTik", type: "Router", status: "Down" },
    ],
  },
  "/console/assets/clouds": {
    title: "Clouds", description: "Cloud workloads and Kubernetes clusters.",
    addLabel: "Create cloud asset",
    columns: [
      { key: "name", label: "Name" }, { key: "provider", label: "Provider" },
      { key: "region", label: "Region" }, { key: "type", label: "Type" }, { key: "status", label: "Status" },
    ],
    rows: [
      { name: "k8s-cluster-1", provider: "AWS", region: "ap-south-1", type: "Kubernetes", status: "Active" },
      { name: "gcp-vm-pool", provider: "GCP", region: "us-central1", type: "VM", status: "Active" },
      { name: "azure-aks-prod", provider: "Azure", region: "westeurope", type: "Kubernetes", status: "Active" },
    ],
  },
  "/console/assets/webs": {
    title: "Web applications", description: "Web apps managed via SSO and recording.",
    addLabel: "Create web",
    columns: [
      { key: "name", label: "Name" }, { key: "url", label: "URL" },
      { key: "category", label: "Category" }, { key: "status", label: "Status" },
    ],
    rows: [
      { name: "Jenkins", url: "https://ci.infosoft.io", category: "DevOps", status: "Active" },
      { name: "Grafana", url: "https://grafana.infosoft.io", category: "Monitoring", status: "Active" },
      { name: "Confluence", url: "https://wiki.infosoft.io", category: "Docs", status: "Active" },
    ],
  },
  "/console/assets/gpts": {
    title: "GPT assets", description: "AI / GPT endpoints under managed access.",
    addLabel: "Create GPT",
    columns: [
      { key: "name", label: "Name" }, { key: "endpoint", label: "Endpoint" },
      { key: "model", label: "Model" }, { key: "status", label: "Status" },
    ],
    rows: [
      { name: "OpenAI Prod", endpoint: "api.openai.com", model: "gpt-4o", status: "Active" },
      { name: "Internal LLM", endpoint: "llm.infosoft.io", model: "llama-3-70b", status: "Active" },
    ],
  },
  "/console/assets/customs": {
    title: "Custom assets", description: "User-defined custom asset types.",
    addLabel: "Create custom",
    columns: [
      { key: "name", label: "Name" }, { key: "address", label: "Address" },
      { key: "type", label: "Type" }, { key: "status", label: "Status" },
    ],
    rows: [
      { name: "iot-gateway-01", address: "10.0.5.1", type: "IoT", status: "Active" },
      { name: "scada-1", address: "10.0.5.2", type: "SCADA", status: "Active" },
    ],
  },
  "/console/assets/zones": {
    title: "Zones", description: "Network zones for grouping assets.",
    addLabel: "Create zone",
    columns: [
      { key: "name", label: "Name" }, { key: "type", label: "Type" },
      { key: "assets", label: "Assets" }, { key: "comment", label: "Comment" },
    ],
    rows: [
      { name: "Default", type: "Standard", assets: "120", comment: "Primary zone" },
      { name: "DB", type: "Restricted", assets: "18", comment: "Database tier" },
      { name: "Edge", type: "DMZ", assets: "7", comment: "Internet facing" },
    ],
  },
  "/console/assets/gateways": {
    title: "Gateways", description: "Bastion and proxy gateways.",
    addLabel: "Create gateway",
    columns: [
      { key: "name", label: "Name" }, { key: "address", label: "Address" },
      { key: "port", label: "Port" }, { key: "status", label: "Status" },
    ],
    rows: [
      { name: "gw-mumbai-01", address: "10.10.0.1", port: "2222", status: "Active" },
      { name: "gw-singapore-01", address: "10.20.0.1", port: "2222", status: "Active" },
    ],
  },
  "/console/assets/platforms": {
    title: "Platforms", description: "Asset platform definitions.",
    addLabel: "Create platform",
    columns: [
      { key: "name", label: "Name" }, { key: "category", label: "Category" },
      { key: "type", label: "Type" }, { key: "charset", label: "Charset" },
    ],
    rows: [
      { name: "Linux", category: "Host", type: "linux", charset: "utf-8" },
      { name: "Windows", category: "Host", type: "windows", charset: "gbk" },
      { name: "MySQL", category: "Database", type: "mysql", charset: "utf-8" },
      { name: "Kubernetes", category: "Cloud", type: "k8s", charset: "utf-8" },
    ],
  },

  // ===== Console / Accounts =====
  "/console/accounts": {
    title: "Asset accounts", description: "Stored accounts and credentials per asset.",
    addLabel: "Create account",
    columns: [
      { key: "name", label: "Name" }, { key: "username", label: "Username" },
      { key: "asset", label: "Asset" }, { key: "type", label: "Secret type" },
      { key: "privileged", label: "Privileged" },
    ],
    rows: [
      { name: "root@prod-web-01", username: "root", asset: "prod-web-01", type: "Password", privileged: "Yes" },
      { name: "deploy@prod-app-02", username: "deploy", asset: "prod-app-02", type: "SSH key", privileged: "No" },
      { name: "sa@prod-db-02", username: "sa", asset: "prod-db-02", type: "Password", privileged: "Yes" },
    ],
  },
  "/console/accounts/virtual": {
    title: "Virtual accounts", description: "Logical accounts not tied to a single asset.",
    addLabel: "Create virtual account",
    columns: [
      { key: "alias", label: "Alias" }, { key: "username", label: "Username" },
      { key: "secretType", label: "Secret type" }, { key: "comment", label: "Comment" },
    ],
    rows: [
      { alias: "@INPUT", username: "manual input", secretType: "—", comment: "Prompt user at connect" },
      { alias: "@USER", username: "current user", secretType: "—", comment: "Reuse session user" },
    ],
  },
  "/console/accounts/templates": {
    title: "Account templates", description: "Reusable templates for account creation.",
    addLabel: "Create template",
    columns: [
      { key: "name", label: "Name" }, { key: "username", label: "Username" },
      { key: "secretType", label: "Secret type" }, { key: "platform", label: "Platform" },
    ],
    rows: [
      { name: "linux-root", username: "root", secretType: "Password", platform: "Linux" },
      { name: "win-admin", username: "Administrator", secretType: "Password", platform: "Windows" },
      { name: "db-sa", username: "sa", secretType: "Password", platform: "MySQL" },
    ],
  },

  // ===== Console / Permissions / More =====
  "/console/perms/asset": {
    title: "Asset permissions", description: "Authorize users to access assets.",
    addLabel: "Create permission",
    columns: [
      { key: "name", label: "Name" }, { key: "users", label: "Users" },
      { key: "assets", label: "Assets" }, { key: "actions", label: "Actions" },
      { key: "valid", label: "Valid" },
    ],
    rows: [
      { name: "DevOps → Prod Web", users: "DevOps (12)", assets: "prod-web-*", actions: "connect, upload", valid: "Yes" },
      { name: "DBAs → Databases", users: "DBAs (5)", assets: "All databases", actions: "connect", valid: "Yes" },
      { name: "Auditors readonly", users: "Auditors (3)", assets: "All", actions: "view", valid: "Yes" },
    ],
  },
  "/console/labels": {
    title: "Labels", description: "Tag assets, users and accounts.",
    addLabel: "Create label",
    columns: [
      { key: "name", label: "Name" }, { key: "value", label: "Value" },
      { key: "resources", label: "Resources" }, { key: "color", label: "Color" },
    ],
    rows: [
      { name: "env", value: "prod", resources: "152", color: "Red" },
      { name: "env", value: "stage", resources: "48", color: "Amber" },
      { name: "team", value: "devops", resources: "76", color: "Blue" },
    ],
  },
  "/console/cloud": {
    title: "Cloud sync", description: "Synchronize assets from cloud providers.",
    addLabel: "New sync task",
    columns: [
      { key: "name", label: "Name" }, { key: "provider", label: "Provider" },
      { key: "lastRun", label: "Last run" }, { key: "status", label: "Status" },
    ],
    rows: [
      { name: "AWS prod sync", provider: "AWS", lastRun: ts(15), status: "Success" },
      { name: "Azure subs sync", provider: "Azure", lastRun: ts(60), status: "Success" },
      { name: "GCP fleet sync", provider: "GCP", lastRun: ts(180), status: "Failed" },
    ],
  },
  "/console/cloud/strategy": {
    title: "Sync strategy", description: "Policies for cloud asset synchronization.",
    addLabel: "New strategy",
    columns: [
      { key: "name", label: "Name" }, { key: "match", label: "Match" },
      { key: "action", label: "Action" }, { key: "priority", label: "Priority" },
    ],
    rows: [
      { name: "Tag prod → Default zone", match: "tag:env=prod", action: "Set zone Default", priority: "10" },
      { name: "Skip terminated", match: "state=terminated", action: "Skip", priority: "20" },
    ],
  },

  // ===== PAM =====
  "/pam/acls/login": {
    title: "Login ACLs", description: "Control how users sign in.",
    addLabel: "Create ACL",
    columns: [
      { key: "name", label: "Name" }, { key: "user", label: "User" },
      { key: "ip", label: "IP group" }, { key: "action", label: "Action" }, { key: "priority", label: "Priority" },
    ],
    rows: [
      { name: "Office only", user: "All", ip: "203.0.113.0/24", action: "Accept", priority: "10" },
      { name: "Block CN", user: "All", ip: "geo:CN", action: "Reject", priority: "20" },
    ],
  },
  "/pam/acls/login-asset": {
    title: "Asset login ACLs", description: "Control connections to assets.",
    addLabel: "Create ACL",
    columns: [
      { key: "name", label: "Name" }, { key: "user", label: "User" },
      { key: "asset", label: "Asset" }, { key: "action", label: "Action" }, { key: "priority", label: "Priority" },
    ],
    rows: [
      { name: "MFA required prod", user: "All", asset: "env:prod", action: "Confirm + MFA", priority: "10" },
      { name: "Auditors readonly", user: "Auditors", asset: "All", action: "Read-only", priority: "20" },
    ],
  },
  "/pam/acls/cmd": {
    title: "Command filter ACLs", description: "Filter commands during sessions.",
    addLabel: "Create ACL",
    columns: [
      { key: "name", label: "Name" }, { key: "group", label: "Group" },
      { key: "action", label: "Action" }, { key: "priority", label: "Priority" },
    ],
    rows: [
      { name: "Block destructive", group: "destructive", action: "Reject", priority: "10" },
      { name: "Confirm sudo", group: "sudo", action: "Confirm", priority: "20" },
    ],
  },
  "/pam/acls/cmd-groups": {
    title: "Command groups", description: "Reusable groups of commands.",
    addLabel: "Create group",
    columns: [
      { key: "name", label: "Name" }, { key: "type", label: "Type" },
      { key: "content", label: "Content" }, { key: "ignoreCase", label: "Ignore case" },
    ],
    rows: [
      { name: "destructive", type: "Regex", content: "rm\\s+-rf|mkfs", ignoreCase: "Yes" },
      { name: "sudo", type: "Command", content: "sudo, su", ignoreCase: "No" },
    ],
  },
  "/pam/acls/connect-method": {
    title: "Connect method ACLs", description: "Restrict allowed connection methods.",
    addLabel: "Create ACL",
    columns: [
      { key: "name", label: "Name" }, { key: "user", label: "User" },
      { key: "methods", label: "Methods" }, { key: "action", label: "Action" },
    ],
    rows: [
      { name: "No web SSH for vendors", user: "Vendors", methods: "web_cli", action: "Reject" },
      { name: "Allow RDP for IT", user: "IT", methods: "rdp", action: "Accept" },
    ],
  },
  "/pam/acls/data-masking": {
    title: "Data masking", description: "Mask sensitive data in transcripts.",
    addLabel: "Create rule",
    columns: [
      { key: "name", label: "Name" }, { key: "pattern", label: "Pattern" }, { key: "replace", label: "Replace" },
    ],
    rows: [
      { name: "Mask credit cards", pattern: "\\d{4}-\\d{4}-\\d{4}-\\d{4}", replace: "****-****-****-****" },
      { name: "Mask emails", pattern: "[\\w.-]+@[\\w.-]+", replace: "[redacted]" },
    ],
  },
  "/pam/sessions": {
    title: "Sessions", description: "Live and recent privileged sessions.",
    columns: [
      { key: "user", label: "User" }, { key: "asset", label: "Asset" },
      { key: "protocol", label: "Protocol" }, { key: "started", label: "Started" }, { key: "status", label: "Status" },
    ],
    rows: [
      { user: "aisha", asset: "prod-web-01", protocol: "SSH", started: ts(2), status: "Active" },
      { user: "ravi", asset: "prod-db-02", protocol: "MySQL", started: ts(14), status: "Active" },
      { user: "maya", asset: "win-jump-05", protocol: "RDP", started: ts(60), status: "Ended" },
    ],
  },
  "/pam/commands": {
    title: "Commands", description: "Commands executed inside sessions.",
    columns: [
      { key: "user", label: "User" }, { key: "asset", label: "Asset" },
      { key: "command", label: "Command" }, { key: "risk", label: "Risk" }, { key: "time", label: "Time" },
    ],
    rows: [
      { user: "aisha", asset: "prod-web-01", command: "systemctl restart nginx", risk: "Normal", time: ts(3) },
      { user: "ravi", asset: "prod-db-02", command: "select * from users limit 10", risk: "Normal", time: ts(7) },
      { user: "maya", asset: "win-jump-05", command: "rm -rf /tmp/old", risk: "High", time: ts(12) },
    ],
  },
  "/pam/terminal": {
    title: "Web terminal", description: "Browser-based SSH/RDP terminal.",
    columns: [
      { key: "asset", label: "Asset" }, { key: "account", label: "Account" }, { key: "method", label: "Method" },
    ],
    rows: [
      { asset: "prod-web-01", account: "deploy", method: "SSH" },
      { asset: "prod-db-02", account: "sa", method: "MySQL" },
    ],
  },
  "/pam/files": {
    title: "File management", description: "Upload and download files to assets.",
    columns: [
      { key: "user", label: "User" }, { key: "asset", label: "Asset" },
      { key: "file", label: "File" }, { key: "size", label: "Size" },
      { key: "action", label: "Action" }, { key: "time", label: "Time" },
    ],
    rows: [
      { user: "aisha", asset: "prod-web-01", file: "deploy.tar.gz", size: "12 MB", action: "upload", time: ts(20) },
      { user: "ravi", asset: "prod-db-02", file: "backup.sql", size: "240 MB", action: "download", time: ts(60) },
    ],
  },

  // ===== Audits =====
  "/audit/sessions": {
    title: "Sessions audit", description: "Searchable history of all sessions.",
    columns: [
      { key: "user", label: "User" }, { key: "asset", label: "Asset" },
      { key: "protocol", label: "Protocol" }, { key: "duration", label: "Duration" }, { key: "ended", label: "Ended" },
    ],
    rows: [
      { user: "aisha", asset: "prod-web-01", protocol: "SSH", duration: "23m", ended: ts(60) },
      { user: "ravi", asset: "prod-db-02", protocol: "MySQL", duration: "12m", ended: ts(120) },
      { user: "maya", asset: "win-jump-05", protocol: "RDP", duration: "1h 4m", ended: ts(240) },
    ],
  },
  "/audit/audits": {
    title: "Logs audit", description: "Operation, login and password change logs.",
    columns: [
      { key: "user", label: "User" }, { key: "action", label: "Action" },
      { key: "resource", label: "Resource" }, { key: "ip", label: "IP" }, { key: "time", label: "Time" },
    ],
    rows: [
      { user: "aisha", action: "Login", resource: "Console", ip: "203.0.113.10", time: ts(5) },
      { user: "ravi", action: "Update user", resource: "maya", ip: "203.0.113.11", time: ts(35) },
      { user: "maya", action: "Password changed", resource: "self", ip: "203.0.113.12", time: ts(180) },
    ],
  },
  "/audit/jobs": {
    title: "Jobs audit", description: "Execution history of jobs and playbooks.",
    columns: [
      { key: "name", label: "Job" }, { key: "user", label: "Started by" },
      { key: "result", label: "Result" }, { key: "duration", label: "Duration" }, { key: "time", label: "Time" },
    ],
    rows: [
      { name: "Restart nginx fleet", user: "aisha", result: "Success", duration: "42s", time: ts(8) },
      { name: "Apply OS patches", user: "ravi", result: "Partial", duration: "6m 12s", time: ts(120) },
    ],
  },
  "/audit/tickets": {
    title: "Tickets audit", description: "All approval tickets across the platform.",
    columns: [
      { key: "id", label: "ID" }, { key: "type", label: "Type" },
      { key: "applicant", label: "Applicant" }, { key: "state", label: "State" }, { key: "time", label: "Time" },
    ],
    rows: [
      { id: "T-1024", type: "Login confirm", applicant: "aisha", state: "Approved", time: ts(30) },
      { id: "T-1025", type: "Command confirm", applicant: "maya", state: "Pending", time: ts(8) },
      { id: "T-1026", type: "Asset perm request", applicant: "karan", state: "Rejected", time: ts(240) },
    ],
  },
  "/audit/reports": {
    title: "Reports", description: "Pre-built compliance and operational reports.",
    columns: [
      { key: "name", label: "Report" }, { key: "category", label: "Category" }, { key: "updated", label: "Updated" },
    ],
    rows: [
      { name: "Privileged access summary", category: "Compliance", updated: "Today" },
      { name: "Top risky commands", category: "Security", updated: "Yesterday" },
      { name: "Inactive users", category: "Hygiene", updated: "2 days ago" },
    ],
  },

  // ===== Workbench =====
  "/workbench/assets": {
    title: "Connect assets", description: "Quickly connect to your authorized assets.",
    columns: [
      { key: "name", label: "Name" }, { key: "address", label: "Address" },
      { key: "platform", label: "Platform" }, { key: "protocols", label: "Protocols" },
    ],
    rows: [
      { name: "prod-web-01", address: "10.0.1.21", platform: "Linux", protocols: "SSH, SFTP" },
      { name: "prod-db-02", address: "10.0.2.15", platform: "MySQL", protocols: "MySQL" },
    ],
  },
  "/workbench/assets/file-transfer": {
    title: "File transfer", description: "Move files to/from your assets.",
    columns: [
      { key: "asset", label: "Asset" }, { key: "file", label: "File" },
      { key: "direction", label: "Direction" }, { key: "size", label: "Size" }, { key: "time", label: "Time" },
    ],
    rows: [
      { asset: "prod-web-01", file: "config.yml", direction: "upload", size: "4 KB", time: ts(2) },
      { asset: "prod-db-02", file: "dump.sql", direction: "download", size: "180 MB", time: ts(20) },
    ],
  },
  "/workbench/assets/k8s": {
    title: "Kubernetes", description: "Authorized clusters and pods.",
    columns: [
      { key: "cluster", label: "Cluster" }, { key: "namespace", label: "Namespace" },
      { key: "pod", label: "Pod" }, { key: "status", label: "Status" },
    ],
    rows: [
      { cluster: "k8s-cluster-1", namespace: "prod", pod: "web-7d9c", status: "Running" },
      { cluster: "k8s-cluster-1", namespace: "prod", pod: "api-5f6a", status: "Running" },
    ],
  },
  "/workbench/jobs": {
    title: "Jobs", description: "Saved automation jobs.",
    addLabel: "Create job",
    columns: [
      { key: "name", label: "Name" }, { key: "type", label: "Type" },
      { key: "owner", label: "Owner" }, { key: "lastRun", label: "Last run" },
    ],
    rows: [
      { name: "Restart nginx", type: "Adhoc", owner: "aisha", lastRun: ts(8) },
      { name: "OS patching", type: "Playbook", owner: "ravi", lastRun: ts(120) },
    ],
  },
  "/workbench/jobs/adhoc": {
    title: "Adhoc", description: "One-off ansible-style commands.",
    addLabel: "New adhoc",
    columns: [
      { key: "name", label: "Name" }, { key: "module", label: "Module" }, { key: "owner", label: "Owner" },
    ],
    rows: [
      { name: "Disk usage", module: "shell", owner: "aisha" },
      { name: "Uptime", module: "command", owner: "ravi" },
    ],
  },
  "/workbench/jobs/playbook": {
    title: "Playbook", description: "Reusable playbooks.",
    addLabel: "New playbook",
    columns: [{ key: "name", label: "Name" }, { key: "owner", label: "Owner" }, { key: "version", label: "Version" }],
    rows: [
      { name: "patch-os", owner: "ravi", version: "v3" },
      { name: "deploy-app", owner: "aisha", version: "v12" },
    ],
  },
  "/workbench/jobs/schedules": {
    title: "Schedules", description: "Cron-style schedules for jobs.",
    addLabel: "New schedule",
    columns: [
      { key: "name", label: "Name" }, { key: "job", label: "Job" },
      { key: "cron", label: "Cron" }, { key: "next", label: "Next run" },
    ],
    rows: [
      { name: "Nightly patch", job: "patch-os", cron: "0 2 * * *", next: "Tonight 02:00" },
      { name: "Hourly health", job: "Disk usage", cron: "0 * * * *", next: "Top of hour" },
    ],
  },
  "/workbench/jobs/logs": {
    title: "Job logs", description: "Output and status of executed jobs.",
    columns: [
      { key: "job", label: "Job" }, { key: "result", label: "Result" },
      { key: "duration", label: "Duration" }, { key: "time", label: "Time" },
    ],
    rows: [
      { job: "Restart nginx", result: "Success", duration: "42s", time: ts(8) },
      { job: "Apply OS patches", result: "Partial", duration: "6m 12s", time: ts(120) },
    ],
  },

  // ===== Tickets =====
  "/tickets/mine": {
    title: "My tickets", description: "Tickets you submitted.",
    columns: [
      { key: "id", label: "ID" }, { key: "type", label: "Type" },
      { key: "state", label: "State" }, { key: "time", label: "Submitted" },
    ],
    rows: [
      { id: "T-1024", type: "Login confirm", state: "Approved", time: ts(30) },
      { id: "T-1027", type: "Asset perm request", state: "Pending", time: ts(5) },
    ],
  },
  "/tickets/assigned": {
    title: "Assigned to me", description: "Tickets awaiting your approval.",
    columns: [
      { key: "id", label: "ID" }, { key: "type", label: "Type" },
      { key: "applicant", label: "Applicant" }, { key: "time", label: "Submitted" },
    ],
    rows: [
      { id: "T-1027", type: "Asset perm request", applicant: "karan", time: ts(5) },
      { id: "T-1028", type: "Command confirm", applicant: "maya", time: ts(2) },
    ],
  },
  "/tickets/all": {
    title: "All tickets", description: "Cross-organization ticket inventory.",
    columns: [
      { key: "id", label: "ID" }, { key: "type", label: "Type" },
      { key: "applicant", label: "Applicant" }, { key: "state", label: "State" }, { key: "time", label: "Time" },
    ],
    rows: [
      { id: "T-1024", type: "Login confirm", applicant: "aisha", state: "Approved", time: ts(30) },
      { id: "T-1025", type: "Command confirm", applicant: "maya", state: "Pending", time: ts(8) },
      { id: "T-1026", type: "Asset perm request", applicant: "karan", state: "Rejected", time: ts(240) },
    ],
  },
  "/tickets/flows": {
    title: "Flow settings", description: "Approval flows per ticket type.",
    addLabel: "New flow",
    columns: [
      { key: "type", label: "Ticket type" }, { key: "approvers", label: "Approvers" }, { key: "levels", label: "Levels" },
    ],
    rows: [
      { type: "Login confirm", approvers: "Admins", levels: "1" },
      { type: "Asset perm request", approvers: "Admins, Owners", levels: "2" },
    ],
  },

  // ===== Reports =====
  "/reports": {
    title: "Reports", description: "All built-in reports.",
    columns: [
      { key: "name", label: "Report" }, { key: "category", label: "Category" }, { key: "updated", label: "Updated" },
    ],
    rows: [
      { name: "Privileged access summary", category: "Compliance", updated: "Today" },
      { name: "Top risky commands", category: "Security", updated: "Yesterday" },
      { name: "Inactive users", category: "Hygiene", updated: "2 days ago" },
    ],
  },
  "/reports/risk": {
    title: "Risk reports", description: "High-risk activity at a glance.",
    columns: [
      { key: "name", label: "Risk" }, { key: "severity", label: "Severity" }, { key: "count", label: "Count" },
    ],
    rows: [
      { name: "Destructive commands", severity: "High", count: "7" },
      { name: "Off-hours access", severity: "Medium", count: "23" },
      { name: "Failed logins", severity: "Low", count: "112" },
    ],
  },

  // ===== Settings =====
  "/settings/basic": {
    title: "Basic", description: "Site name, URL and locale.",
    columns: [{ key: "key", label: "Setting" }, { key: "value", label: "Value" }],
    rows: [
      { key: "Site name", value: "Infosoft" },
      { key: "Site URL", value: "https://access.infosoft.io" },
      { key: "Default language", value: "English" },
    ],
  },
  "/settings/email": {
    title: "Email", description: "SMTP and email templates.",
    columns: [{ key: "key", label: "Setting" }, { key: "value", label: "Value" }],
    rows: [
      { key: "SMTP host", value: "smtp.infosoft.io" },
      { key: "From", value: "noreply@infosoft.io" },
      { key: "TLS", value: "Enabled" },
    ],
  },
  "/settings/auth": {
    title: "Authentication", description: "LDAP, OIDC, SAML and MFA.",
    columns: [{ key: "provider", label: "Provider" }, { key: "status", label: "Status" }],
    rows: [
      { provider: "Local", status: "Enabled" },
      { provider: "LDAP", status: "Enabled" },
      { provider: "OIDC (Google)", status: "Enabled" },
      { provider: "SAML", status: "Disabled" },
    ],
  },
  "/settings/terminal": {
    title: "Terminal", description: "Web terminal and recording settings.",
    columns: [{ key: "key", label: "Setting" }, { key: "value", label: "Value" }],
    rows: [
      { key: "Session record", value: "Enabled" },
      { key: "Idle timeout", value: "30 min" },
      { key: "Max sessions", value: "200" },
    ],
  },
  "/settings/storage": {
    title: "Storage", description: "Where recordings and files are stored.",
    columns: [{ key: "name", label: "Name" }, { key: "type", label: "Type" }, { key: "default", label: "Default" }],
    rows: [
      { name: "local-disk", type: "Local", default: "Yes" },
      { name: "s3-mumbai", type: "AWS S3", default: "No" },
    ],
  },
  "/settings/security": {
    title: "Security", description: "Password policy and brute-force protection.",
    columns: [{ key: "key", label: "Setting" }, { key: "value", label: "Value" }],
    rows: [
      { key: "Password min length", value: "12" },
      { key: "MFA required", value: "Admins" },
      { key: "Login lockout", value: "5 fails / 15 min" },
    ],
  },
  "/settings/messages": {
    title: "Message subscription", description: "Notification channels and topics.",
    columns: [{ key: "topic", label: "Topic" }, { key: "channels", label: "Channels" }],
    rows: [
      { topic: "Ticket pending", channels: "Email, Web" },
      { topic: "High-risk command", channels: "Email, Slack" },
    ],
  },
  "/settings/appearance": {
    title: "Appearance", description: "Logo, theme and color tokens.",
    columns: [{ key: "key", label: "Setting" }, { key: "value", label: "Value" }],
    rows: [
      { key: "Theme", value: "Light" },
      { key: "Primary color", value: "Infosoft Blue" },
      { key: "Logo", value: "Default" },
    ],
  },
  "/settings/languages": {
    title: "Languages", description: "Available locales.",
    columns: [{ key: "code", label: "Code" }, { key: "name", label: "Name" }, { key: "enabled", label: "Enabled" }],
    rows: [
      { code: "en", name: "English", enabled: "Yes" },
      { code: "hi", name: "Hindi", enabled: "Yes" },
      { code: "zh", name: "Chinese", enabled: "No" },
    ],
  },
  "/settings/license": {
    title: "License", description: "Edition and entitlements.",
    columns: [{ key: "key", label: "Setting" }, { key: "value", label: "Value" }],
    rows: [
      { key: "Edition", value: "Infosoft Enterprise" },
      { key: "Asset quota", value: "5,000" },
      { key: "Expiry", value: "2026-12-31" },
    ],
  },
  "/settings/tools": {
    title: "Tools", description: "Maintenance and diagnostic utilities.",
    columns: [{ key: "name", label: "Tool" }, { key: "description", label: "Description" }],
    rows: [
      { name: "Cache clear", description: "Flush server-side caches" },
      { name: "Re-index search", description: "Rebuild search indexes" },
      { name: "Health check", description: "Run platform self-diagnostic" },
    ],
  },
  "/settings/about": {
    title: "About", description: "Build info and licenses.",
    columns: [{ key: "key", label: "Field" }, { key: "value", label: "Value" }],
    rows: [
      { key: "Product", value: "Infosoft" },
      { key: "Version", value: "1.0.0" },
      { key: "Build", value: "infosoft-2026.05.05" },
    ],
  },

  // ===== Profile =====
  "/profile": {
    title: "Profile", description: "Your personal information.",
    columns: [{ key: "key", label: "Field" }, { key: "value", label: "Value" }],
    rows: [
      { key: "Name", value: "Admin" },
      { key: "Username", value: "admin" },
      { key: "Email", value: "admin@infosoft.io" },
      { key: "Role", value: "Super admin" },
    ],
  },
  "/profile/tokens": {
    title: "API tokens", description: "Personal API access tokens.",
    addLabel: "New token",
    columns: [
      { key: "name", label: "Name" }, { key: "created", label: "Created" }, { key: "expires", label: "Expires" },
    ],
    rows: [
      { name: "ci-bot", created: "2025-09-01", expires: "2026-09-01" },
      { name: "personal-cli", created: "2026-02-10", expires: "Never" },
    ],
  },
  "/profile/mfa": {
    title: "MFA", description: "Multi-factor authentication settings.",
    columns: [{ key: "method", label: "Method" }, { key: "status", label: "Status" }],
    rows: [
      { method: "TOTP (Authenticator)", status: "Enabled" },
      { method: "SMS", status: "Disabled" },
      { method: "Recovery codes", status: "Generated" },
    ],
  },
  "/profile/connections": {
    title: "Connections", description: "Linked identity providers.",
    columns: [{ key: "provider", label: "Provider" }, { key: "linked", label: "Linked" }],
    rows: [
      { provider: "Google", linked: "Yes" },
      { provider: "GitHub", linked: "No" },
    ],
  },
  "/profile/subscriptions": {
    title: "Subscriptions", description: "Notifications you receive.",
    columns: [{ key: "topic", label: "Topic" }, { key: "channels", label: "Channels" }],
    rows: [
      { topic: "Ticket pending", channels: "Email, Web" },
      { topic: "Session ended", channels: "Web" },
    ],
  },
  "/profile/files": {
    title: "Files", description: "Files you uploaded or downloaded.",
    columns: [
      { key: "file", label: "File" }, { key: "asset", label: "Asset" },
      { key: "direction", label: "Direction" }, { key: "time", label: "Time" },
    ],
    rows: [
      { file: "deploy.tar.gz", asset: "prod-web-01", direction: "upload", time: ts(20) },
      { file: "backup.sql", asset: "prod-db-02", direction: "download", time: ts(60) },
    ],
  },
};
