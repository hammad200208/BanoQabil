import { MainLayout } from "@/components/layout/MainLayout";
import { students, trainers } from "@/lib/mockData";
import { Card } from "@/components/ui/card";

type DistrictStat = {
  name: string;
  studentCount: number;
  trainerCount: number;
};

const districts: DistrictStat[] = Array.from(
  new Set([...students.map(s => s.district), ...trainers.map(t => t.district)])
).map(district => {
  return {
    name: district,
    studentCount: students.filter(s => s.district === district).length,
    trainerCount: trainers.filter(t => t.district === district).length,
  };
});

export default function DistrictsPage() {
  return (
    <MainLayout>
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Districts</h1>
        <p className="page-description">
          Overview of training districts and participants
        </p>
      </div>

      {/* Districts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {districts.map(d => (
          <Card key={d.name} className="p-5 space-y-2">
            <h2 className="text-lg font-semibold">{d.name}</h2>
            <div className="text-sm text-muted-foreground">
              Students: <span className="font-medium text-foreground">{d.studentCount}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Trainers: <span className="font-medium text-foreground">{d.trainerCount}</span>
            </div>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
}
