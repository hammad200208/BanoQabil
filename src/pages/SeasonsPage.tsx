import { MainLayout } from "@/components/layout/MainLayout";
import { students } from "@/lib/mockData";
import { Card } from "@/components/ui/card";

type Season = {
  key: string;
  name: string;
};

const seasons: Season[] = [
  { key: "season1", name: "Spring 2026" },
  { key: "season2", name: "Summer 2026" },
  { key: "season3", name: "Fall 2026" },
];

export default function SeasonsPage() {
  return (
    <MainLayout>
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Seasons</h1>
        <p className="page-description">
          Training seasons and enrolled students
        </p>
      </div>

      {/* Seasons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {seasons.map((season) => (
          <Card key={season.key} className="p-5 space-y-2">
            <h2 className="text-lg font-semibold">{season.name}</h2>
            <div className="text-sm text-muted-foreground">
              Students Enrolled:{" "}
              <span className="font-medium text-foreground">
                {students.length}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
}
