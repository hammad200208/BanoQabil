import { MainLayout } from "@/components/layout/MainLayout";
import { students } from "@/lib/mockData";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { Card } from "@/components/ui/card";

export default function PerformancePage() {
  const avgPerformance =
    students.reduce((sum, s) => sum + s.performance, 0) / students.length;

  const topPerformer = students.reduce((top, s) =>
    s.performance > top.performance ? s : top,
    students[0]
  );

  return (
    <MainLayout>
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Performance</h1>
        <p className="page-description">
          Student performance overview
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Card className="p-5">
          <h2 className="text-sm text-muted-foreground">Total Students</h2>
          <p className="text-2xl font-semibold">{students.length}</p>
        </Card>

        <Card className="p-5">
          <h2 className="text-sm text-muted-foreground">Avg Performance</h2>
          <p className="text-2xl font-semibold">{avgPerformance.toFixed(1)}%</p>
        </Card>

        <Card className="p-5">
          <h2 className="text-sm text-muted-foreground">Top Performer</h2>
          <p className="text-2xl font-semibold">{topPerformer.name}</p>
          <p className="text-sm text-muted-foreground">{topPerformer.performance}%</p>
        </Card>
      </div>

      {/* Performance Chart */}
      <div className="mb-6">
        <PerformanceChart />
      </div>
    </MainLayout>
  );
}
