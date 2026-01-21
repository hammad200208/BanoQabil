import { MainLayout } from "@/components/layout/MainLayout";
import { students, trainers } from "@/lib/mockData";
import { Card } from "@/components/ui/card";

type CenterStat = {
  name: string;
  studentCount: number;
  trainerCount: number;
};

const centers: CenterStat[] = Array.from(
  new Set([...students.map(s => s.center), ...trainers.map(t => t.center)])
).map(center => ({
  name: center,
  studentCount: students.filter(s => s.center === center).length,
  trainerCount: trainers.filter(t => t.center === center).length,
}));

export default function CentersPage() {
  return (
    <MainLayout>
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Centers</h1>
        <p className="page-description">
          Overview of training centers and participants
        </p>
      </div>

      {/* Centers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {centers.map(c => (
          <Card key={c.name} className="p-5 space-y-2">
            <h2 className="text-lg font-semibold">{c.name}</h2>
            <div className="text-sm text-muted-foreground">
              Students: <span className="font-medium text-foreground">{c.studentCount}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Trainers: <span className="font-medium text-foreground">{c.trainerCount}</span>
            </div>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
}
