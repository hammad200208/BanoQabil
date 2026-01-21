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
    <div className="stat-card animate-fade-in w-full flex flex-col justify-between p-4">
  <div className="flex justify-between items-start gap-2">
    <div className="space-y-1 flex-1 min-w-0">
      <p className="stat-label text-sm font-medium text-muted-foreground ">
        {title}
      </p>
      <p className="stat-value text-lg font-semibold text-foreground whitespace-nowrap">
        {value}
      </p>
      {change !== undefined && (
        <div className={cn(
          "flex items-center text-xs mt-1",
          isPositive ? "text-success" : isNegative ? "text-destructive" : "text-muted-foreground"
        )}>
          {isPositive && <TrendingUp className="w-3 h-3" />}
          {isNegative && <TrendingDown className="w-3 h-3" />}
          <span className="ml-1">
            {isPositive && "+"}{change}% {changeLabel}
          </span>
        </div>
      )}
    </div>
    <div className={cn("p-3 rounded-xl shrink-0", iconColor)}>
      <Icon className="w-6 h-6" />
    </div>
  </div>
</div>
  );
}
