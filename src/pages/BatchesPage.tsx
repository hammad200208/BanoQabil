import { MainLayout } from "@/components/layout/MainLayout";
import { students } from "@/lib/mockData";
import { Card } from "@/components/ui/card";

type BatchStat = {
  name: string;
  total: number;
  active: number;
  completed: number;
};

const batches: BatchStat[] = Array.from(new Set(students.map(s => s.batch))).map(batch => {
  const batchStudents = students.filter(s => s.batch === batch);
  return {
    name: batch,
    total: batchStudents.length,
    active: batchStudents.filter(s => s.status === "Active").length,
    completed: batchStudents.filter(s => s.status === "Completed").length,
  };
});

export default function BatchesPage() {
  return (
    <MainLayout>
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Batches</h1>
        <p className="page-description">
          Overview of all training batches and student progress
        </p>
      </div>

      {/* Batches Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {batches.map(b => {
          const completionRate = b.total > 0 ? Math.round((b.completed / b.total) * 100) : 0;

          return (
            <Card key={b.name} className="p-5 space-y-2">
              <h2 className="text-lg font-semibold">{b.name}</h2>
              <div className="text-sm text-muted-foreground">
                Total Students: <span className="font-medium text-foreground">{b.total}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Active Students: <span className="font-medium text-foreground">{b.active}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Completion Rate: <span className="font-medium text-foreground">{completionRate}%</span>
              </div>
            </Card>
          );
        })}
      </div>
    </MainLayout>
  );
}
