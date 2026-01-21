import { MainLayout } from "@/components/layout/MainLayout";
import { students } from "@/lib/mockData";
import { Card } from "@/components/ui/card";

type TradeStat = {
  name: string;
  total: number;
  completed: number;
};

const trades: TradeStat[] = Array.from(new Set(students.map(s => s.trade))).map(trade => {
  const tradeStudents = students.filter(s => s.trade === trade);
  return {
    name: trade,
    total: tradeStudents.length,
    completed: tradeStudents.filter(s => s.status === "Completed").length,
  };
});

export default function TradesPage() {
  return (
    <MainLayout>
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Trades / Courses</h1>
        <p className="page-description">
          Overview of all training trades and student progress
        </p>
      </div>

      {/* Trades Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {trades.map(t => {
          const completionRate = t.total > 0 ? Math.round((t.completed / t.total) * 100) : 0;

          return (
            <Card key={t.name} className="p-5 space-y-2">
              <h2 className="text-lg font-semibold">{t.name}</h2>
              <div className="text-sm text-muted-foreground">
                Total Students: <span className="font-medium text-foreground">{t.total}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Completed: <span className="font-medium text-foreground">{t.completed}</span>
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
