import { Clock, UserPlus, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const activities = [
  {
    id: 1,
    type: "enrollment",
    message: "25 new students enrolled in Web Development batch",
    location: "Karachi Central",
    time: "2 hours ago",
    icon: UserPlus,
    iconColor: "text-info bg-info/10",
  },
  {
    id: 2,
    type: "attendance",
    message: "Low attendance alert for Graphic Design batch",
    location: "Lahore Campus",
    time: "4 hours ago",
    icon: AlertTriangle,
    iconColor: "text-warning bg-warning/10",
  },
  {
    id: 3,
    type: "completion",
    message: "Batch #BQ3-001 completed Phase 1 training",
    location: "Islamabad",
    time: "6 hours ago",
    icon: CheckCircle,
    iconColor: "text-success bg-success/10",
  },
  {
    id: 4,
    type: "performance",
    message: "Performance report generated for Winter 2024",
    location: "All Centers",
    time: "1 day ago",
    icon: TrendingUp,
    iconColor: "text-primary bg-primary/10",
  },
];

export function RecentActivity() {
  return (
    <div className="stat-card">
      <div className="mb-4">
        <h3 className="font-semibold text-foreground">Recent Activity</h3>
        <p className="text-sm text-muted-foreground">Latest updates across all centers</p>
      </div>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-3 animate-slide-in-left">
            <div className={cn("p-2 rounded-lg shrink-0", activity.iconColor)}>
              <activity.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">{activity.message}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground">{activity.location}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {activity.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
