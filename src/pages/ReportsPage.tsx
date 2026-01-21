import { MainLayout } from "@/components/layout/MainLayout";
import { stats, students, trainers, recentActivity } from "@/lib/mockData";
import { Card } from "@/components/ui/card";

export default function ReportsPage() {
  return (
    <MainLayout>
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Reports</h1>
        <p className="page-description">
          Summary of training program statistics
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="p-5">
          <h2 className="text-sm text-muted-foreground">Total Students</h2>
          <p className="text-2xl font-semibold">{stats.totalStudents}</p>
        </Card>
        <Card className="p-5">
          <h2 className="text-sm text-muted-foreground">Total Trainers</h2>
          <p className="text-2xl font-semibold">{stats.totalTrainers}</p>
        </Card>
        <Card className="p-5">
          <h2 className="text-sm text-muted-foreground">Avg Performance</h2>
          <p className="text-2xl font-semibold">{stats.avgPerformance}%</p>
        </Card>
        <Card className="p-5">
          <h2 className="text-sm text-muted-foreground">Recent Activities</h2>
          <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
            {recentActivity.map(act => (
              <li key={act.id}>{act.text}</li>
            ))}
          </ul>
        </Card>
      </div>
    </MainLayout>
  );
}
