import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, ShieldCheck } from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { SECTIONS } from "@/lib/nav";
import { useMemo } from "react";

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const activeSection = useMemo(
    () => SECTIONS.find((s) => pathname.startsWith(s.url)) ?? SECTIONS[0],
    [pathname]
  );

  return (
    <Sidebar collapsible="icon" className="border-sidebar-border">
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2">
          <div className="size-9 shrink-0 rounded-lg bg-gradient-to-br from-primary to-primary-glow grid place-items-center shadow-elegant">
            <ShieldCheck className="size-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="leading-tight min-w-0">
              <div className="font-semibold tracking-tight truncate">Infosoft</div>
              <div className="text-xs text-sidebar-foreground/60 truncate">Access Console</div>
            </div>
          )}
        </div>
      </SidebarHeader>

      {!collapsed && (
        <div className="px-3 pt-3">
          <Select value={activeSection.url} onValueChange={(v) => navigate(v)}>
            <SelectTrigger className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SECTIONS.map((s) => (
                <SelectItem key={s.url} value={s.url}>
                  <div className="flex items-center gap-2">
                    <s.icon className="size-4" />
                    {s.title}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <SidebarContent>
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>{activeSection.title}</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {activeSection.groups.map((g) => {
                const Icon = g.icon;
                if (!g.items) {
                  const active = pathname === g.url || (g.url && pathname.startsWith(g.url + "/"));
                  return (
                    <SidebarMenuItem key={g.title}>
                      <SidebarMenuButton asChild isActive={!!active} tooltip={g.title}>
                        <NavLink to={g.url!}>
                          <Icon className="size-4" />
                          <span>{g.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }
                const open = g.items.some((i) => pathname.startsWith(i.url));
                return (
                  <Collapsible key={g.title} defaultOpen={open} className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={g.title}>
                          <Icon className="size-4" />
                          <span>{g.title}</span>
                          <ChevronDown className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {g.items.map((i) => (
                            <SidebarMenuSubItem key={i.url}>
                              <SidebarMenuSubButton asChild isActive={pathname === i.url}>
                                <NavLink to={i.url}>{i.title}</NavLink>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        {!collapsed && (
          <div className="text-xs text-sidebar-foreground/60 px-2 py-1">
            © {new Date().getFullYear()} Infosoft
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
