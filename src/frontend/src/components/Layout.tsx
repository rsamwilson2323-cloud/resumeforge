import { Button } from "@/components/ui/button";
import { Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { FileText } from "lucide-react";

export default function Layout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand */}
          <button
            type="button"
            onClick={() => navigate({ to: "/editor" })}
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
            data-ocid="header.brand_link"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <FileText className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-semibold text-foreground tracking-tight">
              ResumeForge
            </span>
          </button>

          {/* Nav actions */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              ATS-optimized resume builder
            </span>
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-4">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            © {new Date().getFullYear()} ResumeForge. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </span>
          <span className="hidden sm:inline">ATS-optimized resume builder</span>
        </div>
      </footer>
    </div>
  );
}
