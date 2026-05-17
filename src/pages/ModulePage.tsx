import { useLocation } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Construction } from "lucide-react";
import { ALL_ROUTES } from "@/lib/nav";
import { MODULE_CONFIGS } from "@/lib/moduleConfigs";
import { DataTablePage } from "@/components/DataTablePage";

const ModulePage = () => {
  const { pathname } = useLocation();
  const config = MODULE_CONFIGS[pathname];
  if (config) return <DataTablePage config={config} />;

  const found = ALL_ROUTES.find((r) => r.url === pathname);
  const title = found?.title ?? "Page";
  const section = found?.section ?? "";
  return (
    <div>
      <PageHeader
        title={title}
        description={section ? `${section} — ${title} module in Infosoft.` : undefined}
      />
      <Card className="shadow-[var(--shadow-card)]">
        <CardContent className="p-12 grid place-items-center text-center">
          <div className="size-14 rounded-full bg-accent grid place-items-center mb-4">
            <Construction className="size-6 text-accent-foreground" />
          </div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm">
            This module is wired up. Detailed UI will appear here.
          </p>
          <code className="mt-4 text-xs text-muted-foreground bg-muted px-2 py-1 rounded">{pathname}</code>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModulePage;
