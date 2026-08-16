import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext";
import { logout } from "@/lib/auth";
import logo from "@/assets/image.png";
const navItems = [
  {
    to: "/",
    label: "Home",
  },
  {
    to: "/about",
    label: "About",
  },
  {
    to: "/courses",
    label: "Courses",
  },
  {
    to: "/plans",
    label: "Plans",
  },
  {
    to: "/careers",
    label: "Careers",
  },
  {
    to: "/contact",
    label: "Contact",
  },
];
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState("light");
  const { user } = useAuth();
  const canViewDashboard = user?.emailVerified;

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    const preferredTheme =
      storedTheme ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    document.documentElement.classList.toggle("dark", preferredTheme === "dark");
    setTheme(preferredTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    window.localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${scrolled ? "glass border-b" : "border-b border-transparent"}`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8"
      >
        <Link to="/" className="flex min-w-0 items-center gap-2.5" onClick={() => setOpen(false)}>
          <img
            src={logo}
            alt="Crimson Valley Academy logo"
            width={36}
            height={36}
            className="h-9 w-9 shrink-0"
          />
          <span className="min-w-0 truncate font-display text-sm font-semibold tracking-tight sm:text-base">
            Crimson Valley <span className="text-primary">Academy</span>
          </span>
        </Link>

        <ul className="ml-auto hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                activeOptions={{
                  exact: item.to === "/",
                }}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-primary"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto hidden items-center gap-2 lg:ml-4 lg:flex">
          <Button variant="ghost" size="sm" onClick={toggleTheme} aria-label="Toggle dark mode">
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
          {user && user.emailVerified ? (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <span className="rounded-full bg-surface px-3 py-2 text-xs font-medium text-muted-foreground shadow-sm ring-1 ring-border">
                Signed in as {user.email}
              </span>
              <Button variant="secondary" size="sm" onClick={logout}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild variant="hero" size="sm">
                <Link to="/enroll">Enroll Now</Link>
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="ml-auto inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border text-foreground lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div className="glass border-t lg:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{
                    exact: item.to === "/",
                  }}
                  className="block rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground data-[status=active]:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-3 flex flex-col gap-3">
              {user ? (
                <>
                  <Button asChild variant="ghost" size="lg" className="w-full">
                    <Link to="/dashboard" onClick={() => setOpen(false)}>
                      Dashboard
                    </Link>
                  </Button>
                  <span className="rounded-full bg-surface px-3 py-2 text-sm font-medium text-muted-foreground shadow-sm ring-1 ring-border">
                    Signed in as {user.email}
                  </span>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full"
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                  >
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="glass" size="lg" className="flex-1">
                    <Link to="/login" onClick={() => setOpen(false)}>
                      Login
                    </Link>
                  </Button>
                  <Button asChild variant="hero" size="lg" className="flex-1">
                    <Link to="/enroll" onClick={() => setOpen(false)}>
                      Enroll Now
                    </Link>
                  </Button>
                </>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
