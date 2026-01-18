import { Trophy, Medal, Award } from "lucide-react";
import { cn } from "@/lib/utils";

const topCenters = [
  { rank: 1, name: "DHA Center", district: "Karachi", score: 94.5, students: 180 },
  { rank: 2, name: "Gulshan Campus", district: "Karachi", score: 92.3, students: 165 },
  { rank: 3, name: "Model Town", district: "Lahore", score: 91.8, students: 145 },
  { rank: 4, name: "F-8 Center", district: "Islamabad", score: 90.2, students: 120 },
  { rank: 5, name: "Saddar Campus", district: "Karachi", score: 88.7, students: 155 },
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="w-5 h-5 text-warning" />;
    case 2:
      return <Medal className="w-5 h-5 text-muted-foreground" />;
    case 3:
      return <Award className="w-5 h-5 text-warning/70" />;
    default:
      return <span className="w-5 h-5 flex items-center justify-center text-sm font-semibold text-muted-foreground">{rank}</span>;
  }
};

export function TopPerformers() {
  return (
    <div className="stat-card">
      <div className="mb-4">
        <h3 className="font-semibold text-foreground">Top Performing Centers</h3>
        <p className="text-sm text-muted-foreground">Based on overall performance score</p>
      </div>
      <div className="space-y-3">
        {topCenters.map((center) => (
          <div
            key={center.rank}
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg transition-colors",
              center.rank <= 3 ? "bg-muted/50" : "hover:bg-muted/30"
            )}
          >
            <div className="w-8 flex justify-center">{getRankIcon(center.rank)}</div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-foreground">{center.name}</p>
              <p className="text-xs text-muted-foreground">{center.district}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-sm text-foreground">{center.score}%</p>
              <p className="text-xs text-muted-foreground">{center.students} students</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
