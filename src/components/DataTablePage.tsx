import { Plus, Search, Download, RefreshCw, SlidersHorizontal, MoreVertical, } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { PageHeader } from "@/components/PageHeader";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ModuleConfig } from "@/lib/moduleConfigs";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const STATUS_KEYS = new Set(["status", "state", "valid", "result", "risk", "severity", "linked", "enabled", "default"]);
const goodValues = new Set(["active", "yes", "success", "approved", "running", "enabled", "normal", "online"]);
const badValues = new Set(["down", "failed", "rejected", "no", "disabled", "high", "offline"]);
const warnValues = new Set(["pending", "partial", "medium", "ended", "warning"]);

const statusBadge = (value: string) => {
  const v = value.toLowerCase();
  if (goodValues.has(v))
    return "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] border-[hsl(var(--success))]/20 hover:bg-[hsl(var(--success))]/15";
  if (badValues.has(v))
    return "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/15";
  if (warnValues.has(v))
    return "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))] border-[hsl(var(--warning))]/20 hover:bg-[hsl(var(--warning))]/15";
  return "bg-secondary text-secondary-foreground border-border";
};

const renderCell = (key: string, value: string) => {
  if (STATUS_KEYS.has(key)) {
    const v = value.toLowerCase();
    const dot = goodValues.has(v)
      ? "bg-[hsl(var(--success))]"
      : badValues.has(v)
        ? "bg-destructive"
        : warnValues.has(v)
          ? "bg-[hsl(var(--warning))]"
          : "bg-muted-foreground";
    return (
      <Badge variant="outline" className={`${statusBadge(value)} font-medium gap-1.5 capitalize`}>
        <span className={`size-1.5 rounded-full ${dot}`} />
        {value}
      </Badge>
    );
  }
  if (["username", "address", "ip", "endpoint", "url", "command", "cron"].includes(key)) {
    return <span className="font-mono text-xs text-foreground/90">{value}</span>;
  }
  return value;
};

export const DataTablePage = ({ config }: { config: ModuleConfig }) => {
  const [q, setQ] = useState("");
  const [rows, setRows] = useState(config.rows);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [deleting, setDeleting] = useState(false);

  const loadUsers = async () => {
    if (config.title !== "Users") return;

    try {
      setLoading(true);

      const token =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");

      const response = await axios.get(
        `${window.location.origin}/api/v1/users`,
        {
          withCredentials: true,
        }
      );

      const users = response.data;


      setRows(
        users.map((u: any) => ({
          user_id: u.user_id ?? u.id,
          username: u.username ?? "—",
          name: `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim() || "—",
          email: u.email ?? "—",
          roles: u.roles?.join(", ") ?? "—",
          enabled: u.enabled ? "Yes" : "No",
        }))
      );

    } catch (err: any) {
      console.error("List users failed", err);

      if (err.response?.status === 401) {
        console.error("Unauthorized");
      }
    } finally {
      setLoading(false);
    }
  };

  const loadRoles = async () => {
    if (config.title !== "Roles") return;

    try {
      setLoading(true);

      const response = await axios.get(
        `${window.location.origin}/api/v1/roles`
      );

      setRows(
        response.data.map((r: any) => ({
          name: r.name ?? "—",
          description: r.description ?? "—",
          composite: r.composite ? "Yes" : "No",
          clientRole: r.clientRole ? "Yes" : "No",
        }))
      );
    } catch (err) {
      console.error("LOAD ROLES ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
    loadRoles();
  }, []);

  const filtered = useMemo(() => {
    if (!q.trim()) return rows;
    const s = q.toLowerCase();
    return rows.filter((r) => Object.values(r).some((v) => v.toLowerCase().includes(s)));
  }, [q, rows]);

  return (
    <div>
      {(
        config.title === "Users" ||
        config.title === "Roles"
      ) && (
          <div className="mb-6 border-b border-slate-100 dark:border-zinc-800/80 w-full">
            <div className="flex gap-4">

              {/* 1. User Tab Button */}
              <button
                onClick={() => navigate("/console/settings/users")}
                className={`
        relative flex items-center gap-2 px-4 py-3.5 text-sm font-semibold transition-all duration-300 select-none group outline-none
        ${location.pathname.includes("/console/settings/users")
                    ? "text-primary dark:text-indigo-400 font-bold"
                    : "text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                  }
      `}
              >
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${location.pathname.includes("/console/settings/users")
                      ? "text-primary scale-110"
                      : "text-slate-400 dark:text-zinc-500 group-hover:text-slate-600 dark:group-hover:text-zinc-300 group-hover:scale-105"
                    }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>User</span>

                {/* Sliding Glowing Line Indicator */}
                {location.pathname.includes("/console/settings/users") && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-primary dark:bg-indigo-400 rounded-t-full shadow-lg shadow-primary/50" />
                )}
              </button>

              {/* 2. Roles Tab Button */}
              <button
                onClick={() => navigate("/console/settings/roles")}
                className={`
        relative flex items-center gap-2 px-4 py-3.5 text-sm font-semibold transition-all duration-300 select-none group outline-none
        ${location.pathname.includes("/console/settings/roles")
                    ? "text-primary dark:text-indigo-400 font-bold"
                    : "text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                  }
      `}
              >
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${location.pathname.includes("/console/settings/roles")
                      ? "text-primary scale-110"
                      : "text-slate-400 dark:text-zinc-500 group-hover:text-slate-600 dark:group-hover:text-zinc-300 group-hover:scale-105"
                    }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Roles</span>

                {/* Sliding Glowing Line Indicator */}
                {location.pathname.includes("/console/settings/roles") && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-primary dark:bg-indigo-400 rounded-t-full shadow-lg shadow-primary/50" />
                )}
              </button>

            </div>
          </div>
        )}
      <PageHeader
        title={config.title}
        description={config.description}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Download className="size-4" /> Export
            </Button>
            {config.addLabel && (
              <Button
                size="sm"
                className="gap-1.5 shadow-sm"
                onClick={() =>
                  navigate(
                    config.title === "Roles"
                      ? "/console/settings/roles/create"
                      : "/console/settings/users/create"
                  )
                }
              >
                <Plus className="size-4" />
                {config.addLabel}
              </Button>
            )}
          </>
        }
      />
      <Card className="shadow-[var(--shadow-card)] border-border/60 overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 p-4 border-b border-border/60 bg-secondary/30">
          <div className="relative max-w-sm flex-1 min-w-[200px]">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={`Search ${config.title.toLowerCase()}…`}
              className="pl-9 h-9 bg-background"
            />
          </div>
          <Button variant="outline" size="sm" className="gap-1.5 h-9">
            <SlidersHorizontal className="size-3.5" /> Filters
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            aria-label="Refresh"
            onClick={loadUsers}
          >
            <RefreshCw className="size-4" />
          </Button>
          <div className="text-xs text-muted-foreground ml-auto font-medium">
            {filtered.length} {filtered.length === 1 ? "result" : "results"}
          </div>
        </div>
        {loading && (
          <div className="p-4 text-sm text-muted-foreground">
            Loading users...
          </div>
        )}
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/20 hover:bg-secondary/20 border-border/60">
                {config.columns.map((c) => (
                  <TableHead key={c.key} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground h-11">
                    {c.label}
                  </TableHead>
                ))}
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r, i) => (
                <TableRow key={i} className="border-border/60 hover:bg-secondary/40 transition-colors">
                  {config.columns.map((c, j) => (
                    <TableCell key={c.key} className={j === 0 ? "font-medium" : "text-foreground/80"}>
                      {c.key === "username" ? (
                        <button
                          className="text-blue-600 hover:underline"
                          onClick={() =>
                            navigate(`/console/settings/users/${r.user_id}`)
                          }
                        >
                          {r.username}
                        </button>
                      ) : (
                        renderCell(c.key, r[c.key] ?? "—")
                      )}
                    </TableCell>
                  ))}
                  <TableCell>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">

                        <DropdownMenuItem
                          onClick={() => {
                            if (config.title === "Roles") {
                              navigate(`/console/settings/roles/${r.name}/update`);
                            } else {
                              navigate(`/console/settings/users/${r.user_id}/update`);
                            }
                          }}
                        >
                          Update
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-500"
                          onClick={async () => {

                            const itemName =
                              config.title === "Roles"
                                ? r.name
                                : r.user_id;

                            const confirmDelete = window.confirm(
                              `Delete ${itemName}?`
                            );

                            if (!confirmDelete) return;

                            try {

                              setDeleting(true);

                              if (config.title === "Roles") {

                                await axios.delete(
                                  `${window.location.origin}/api/v1/roles/${r.name}`
                                );

                                alert("Role deleted successfully");

                              } else {

                                await axios.delete(
                                  `${window.location.origin}/api/v1/users/${r.user_id}`
                                );

                                alert("User deleted successfully");
                              }

                              window.location.reload();

                            } catch (err) {

                              console.error(
                                "DELETE ERROR:",
                                err
                              );

                              alert("Delete failed");

                            } finally {

                              setDeleting(false);

                            }
                          }}
                        >
                          {deleting ? "Deleting..." : "Delete"}
                        </DropdownMenuItem>

                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={config.columns.length + 1} className="text-center text-sm text-muted-foreground py-16">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="size-8 text-muted-foreground/40" />
                      <p>No results match your search.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {filtered.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-border/60 bg-secondary/20 text-xs text-muted-foreground">
            <span>Showing 1–{filtered.length} of {filtered.length}</span>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="h-7 text-xs" disabled>Previous</Button>
              <Button variant="ghost" size="sm" className="h-7 text-xs" disabled>Next</Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
