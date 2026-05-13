import { Link, useRouter } from "@tanstack/react-router";
import { Moon, Sun, Undo2, Redo2, RotateCcw, FlaskConical } from "lucide-react";
import { useHabits } from "@/lib/habits/HabitsProvider";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function AppHeader() {
  const { theme, setTheme, undo, redo, canUndo, canRedo, reset, mode } = useHabits();
  const router = useRouter();

  const handleReset = () => {
    reset();
    router.navigate({ to: "/" });
  };

  return (
    <TooltipProvider delayDuration={200}>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-primary/10 text-primary">
              <FlaskConical className="h-4 w-4" />
            </span>
            <span className="text-sm sm:text-base">Atomic Habits Lab</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/lab">Lab</NavLink>
            <NavLink to="/learn">Learn</NavLink>
          </nav>

          <div className="flex items-center gap-1">
            <span
              className={`mr-2 hidden rounded-full border px-2 py-0.5 text-xs font-medium sm:inline-block ${
                mode === "live"
                  ? "border-primary/30 bg-primary/10 text-primary"
                  : "border-border bg-muted text-muted-foreground"
              }`}
            >
              {mode === "live" ? "Live" : "Simulated"}
            </span>
            <IconBtn label="Undo (⌘Z)" onClick={undo} disabled={!canUndo}>
              <Undo2 className="h-4 w-4" />
            </IconBtn>
            <IconBtn label="Redo (⌘⇧Z)" onClick={redo} disabled={!canRedo}>
              <Redo2 className="h-4 w-4" />
            </IconBtn>
            <IconBtn label="Reset to home" onClick={handleReset}>
              <RotateCcw className="h-4 w-4" />
            </IconBtn>
            <IconBtn
              label={theme === "dark" ? "Switch to light" : "Switch to dark"}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </IconBtn>
          </div>
        </div>
        <nav className="flex items-center gap-1 border-t border-border px-4 py-1.5 md:hidden">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/lab">Lab</NavLink>
          <NavLink to="/learn">Learn</NavLink>
        </nav>
      </header>
    </TooltipProvider>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      activeProps={{ className: "rounded-md px-3 py-1.5 text-sm bg-muted text-foreground" }}
      activeOptions={{ exact: true }}
    >
      {children}
    </Link>
  );
}

function IconBtn({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={label}
          onClick={onClick}
          disabled={disabled}
          className="h-9 w-9"
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}