import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  MapPin,
  GraduationCap,
  Users,
  UserCheck,
  Calendar,
  ClipboardList,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  Layers,
  BookOpen,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  icon: React.ElementType;
  href?: string;
  children?: { title: string; href: string }[];
}

const navigation: NavItem[] = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/" },
  {
    title: "Program Setup",
    icon: Layers,
    children: [
      { title: "Programs", href: "/programs" },
      { title: "Phases", href: "/phases" },
      { title: "Seasons", href: "/seasons" },
    ],
  },
  {
    title: "Locations",
    icon: MapPin,
    children: [
      { title: "Districts", href: "/districts" },
      { title: "Centers", href: "/centers" },
    ],
  },
  {
    title: "Academics",
    icon: BookOpen,
    children: [
      { title: "Trades / Courses", href: "/trades" },
      { title: "Batches", href: "/batches" },
    ],
  },
  { title: "Students", icon: GraduationCap, href: "/students" },
  { title: "Trainers", icon: Users, href: "/trainers" },
  { title: "Attendance", icon: Calendar, href: "/attendance" },
  { title: "Performance", icon: ClipboardList, href: "/performance" },
  { title: "Reports", icon: BarChart3, href: "/reports" },
  { title: "Settings", icon: Settings, href: "/settings" },
];

export function AppSidebar() {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(["Program Setup", "Locations", "Academics"]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleExpand = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const isActive = (href: string) => location.pathname === href;

  const NavContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sidebar-primary flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-sidebar-foreground text-lg">Bano Qabil</h1>
            <p className="text-xs text-sidebar-muted">Training Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto scrollbar-thin">
        <ul className="space-y-1">
          {navigation.map((item) => (
            <li key={item.title}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleExpand(item.title)}
                    className="nav-item w-full justify-between"
                  >
                    <span className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </span>
                    {expandedItems.includes(item.title) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  {expandedItems.includes(item.title) && (
                    <ul className="ml-8 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            to={child.href}
                            onClick={() => setIsMobileOpen(false)}
                            className={cn(
                              "nav-item text-sm",
                              isActive(child.href) && "nav-item-active"
                            )}
                          >
                            {child.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  to={item.href!}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "nav-item",
                    isActive(item.href!) && "nav-item-active"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* User */}
      <div className="px-4 py-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-sidebar-accent flex items-center justify-center">
            <UserCheck className="w-5 h-5 text-sidebar-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">Admin User</p>
            <p className="text-xs text-sidebar-muted truncate">admin@banoquabil.pk</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card shadow-lg border border-border"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-40 w-64 bg-sidebar transition-transform duration-300",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <NavContent />
      </aside>
    </>
  );
}
