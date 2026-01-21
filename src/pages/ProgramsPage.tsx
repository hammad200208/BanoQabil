import { MainLayout } from "@/components/layout/MainLayout";
import { students } from "@/lib/mockData";
import { Card } from "@/components/ui/card";

type ProgramStat = {
  name: string;
  total: number;
  active: number;
  completed: number;
};

const programs: ProgramStat[] = Array.from(
  new Set(students.map((s) => s.trade))
).map((trade) => {
  const programStudents = students.filter((s) => s.trade === trade);

  return {
    name: trade,
    total: programStudents.length,
    active: programStudents.filter((s) => s.status === "Active").length,
    completed: programStudents.filter((s) => s.status === "Completed").length,
  };
});

export default function ProgramsPage() {
  return (
    <MainLayout>
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Programs</h1>
        <p className="page-description">
          Training programs offered under Bano Qabil KPK
        </p>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {programs.map((program) => {
          const completionRate =
            program.total > 0
              ? Math.round((program.completed / program.total) * 100)
              : 0;

          return (
            <Card key={program.name} className="p-5 space-y-2">
              <h2 className="text-lg font-semibold">{program.name}</h2>

              <div className="text-sm text-muted-foreground">
                Total Students:{" "}
                <span className="font-medium text-foreground">
                  {program.total}
                </span>
              </div>

              <div className="text-sm text-muted-foreground">
                Active Students:{" "}
                <span className="font-medium text-foreground">
                  {program.active}
                </span>
              </div>

              <div className="text-sm text-muted-foreground">
                Completion Rate:{" "}
                <span className="font-medium text-foreground">
                  {completionRate}%
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </MainLayout>
  );
}
