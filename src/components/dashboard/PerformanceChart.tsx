import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", attendance: 85, performance: 72 },
  { month: "Feb", attendance: 88, performance: 75 },
  { month: "Mar", attendance: 82, performance: 78 },
  { month: "Apr", attendance: 90, performance: 82 },
  { month: "May", attendance: 87, performance: 79 },
  { month: "Jun", attendance: 92, performance: 85 },
  { month: "Jul", attendance: 89, performance: 83 },
  { month: "Aug", attendance: 94, performance: 88 },
];

export function PerformanceChart() {
  return (
    <div className="stat-card h-80">
      <div className="mb-4">
        <h3 className="font-semibold text-foreground">Performance Trends</h3>
        <p className="text-sm text-muted-foreground">Attendance vs Performance over time</p>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(168 76% 45%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(168 76% 45%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPerformance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(199 89% 48%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(199 89% 48%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 90%)" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(215 15% 45%)", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(215 15% 45%)", fontSize: 12 }}
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(0 0% 100%)",
              border: "1px solid hsl(214 20% 90%)",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px hsl(215 25% 15% / 0.1)",
            }}
          />
          <Area
            type="monotone"
            dataKey="attendance"
            stroke="hsl(168 76% 45%)"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorAttendance)"
            name="Attendance %"
          />
          <Area
            type="monotone"
            dataKey="performance"
            stroke="hsl(199 89% 48%)"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorPerformance)"
            name="Performance %"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
