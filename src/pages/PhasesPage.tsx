import { MainLayout } from "@/components/layout/MainLayout";
import { students } from "@/lib/mockData";
import { Card } from "@/components/ui/card";

type Phase = {
  name: string;
  key: string;
};

const phases: Phase[] = [
  { key: "phase1", name: "Orientation" },
  { key: "phase2", name: "Module 1" },
  { key: "phase3", name: "Module 2" },
  { key: "phase4", name: "Final Project" },
];

export default function PhasesPage() {
  return (
    <MainLayout>
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Phases</h1>
        <p className="page-description">
          Program phases and student progress
        </p>
      </div>

      {/* Phases Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {phases.map((phase) => {
          // Example: all students are in Phase 1 (static for now)
          const enrolled = students.length; 
          return (
            <Card key={phase.key} className="p-5 space-y-2">
              <h2 className="text-lg font-semibold">{phase.name}</h2>
              <div className="text-sm text-muted-foreground">
                Students Enrolled:{" "}
                <span className="font-medium text-foreground">{enrolled}</span>
              </div>
            </Card>
          );
        })}
      </div>
    </MainLayout>
  );
}
