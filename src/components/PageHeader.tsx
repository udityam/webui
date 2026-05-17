import { ReactNode } from "react";
import { useLocation, Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export const PageHeader = ({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) => {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <div className="mb-6">
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
        <Link to="/dashboard" className="flex items-center gap-1 hover:text-foreground transition-colors">
          <Home className="size-3.5" />
        </Link>
        {segments.map((seg, i) => {
          const href = "/" + segments.slice(0, i + 1).join("/");
          const isLast = i === segments.length - 1;
          const label = seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
          return (
            <span key={href} className="flex items-center gap-1.5">
              <ChevronRight className="size-3" />
              {isLast ? (
                <span className="text-foreground font-medium">{label}</span>
              ) : (
                <Link to={href} className="hover:text-foreground transition-colors capitalize">
                  {label}
                </Link>
              )}
            </span>
          );
        })}
      </nav>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 pb-5 border-b border-border">
        <div>
          <h1 className="text-[26px] font-semibold tracking-tight text-foreground">{title}</h1>
          {description && <p className="text-sm text-muted-foreground mt-1.5 max-w-2xl">{description}</p>}
        </div>
        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>
    </div>
  );
};
