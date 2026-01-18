import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  iconColor?: string;
}

export function StatCard({
  title,
  value,
  change,
  changeLabel = "vs last month",
  icon: Icon,
  iconColor = "text-primary",
}: StatCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <div className="stat-card animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="stat-label">{title}</p>
          <p className="stat-value">{value}</p>
          {change !== undefined && (
            <div
              className={cn(
                "stat-change",
                isPositive && "stat-change-positive",
                isNegative && "stat-change-negative",
                !isPositive && !isNegative && "text-muted-foreground"
              )}
            >
              {isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : isNegative ? (
                <TrendingDown className="w-3 h-3" />
              ) : null}
              <span>
                {isPositive && "+"}
                {change}% {changeLabel}
              </span>
            </div>
          )}
        </div>
        <div className={cn("p-3 rounded-xl bg-primary/10", iconColor)}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
