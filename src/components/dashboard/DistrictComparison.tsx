import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { district: "Peshawar", students: 1450, completion: 88 },
  { district: "Swat", students: 1120, completion: 85 },
  { district: "Mardan", students: 980, completion: 82 },
  { district: "DI Khan", students: 870, completion: 79 },
  { district: "Abbottabad", students: 820, completion: 86 },
  { district: "Swabi", students: 750, completion: 84 },
  { district: "Upper Dir", students: 680, completion: 81 },
  { district: "Kohat", students: 620, completion: 77 },
];

export function DistrictComparison() {
  return (
    <div className="stat-card h-80">
      <div className="mb-4">
        <h3 className="font-semibold text-foreground">District Performance</h3>
        <p className="text-sm text-muted-foreground">Students enrolled by district</p>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 90%)" horizontal={true} vertical={false} />
          <XAxis
            type="number"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(215 15% 45%)", fontSize: 12 }}
          />
          <YAxis
            type="category"
            dataKey="district"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(215 15% 45%)", fontSize: 11 }}
            width={100}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(0 0% 100%)",
              border: "1px solid hsl(214 20% 90%)",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px hsl(215 25% 15% / 0.1)",
            }}
          />
          <Bar
            dataKey="students"
            fill="hsl(168 76% 45%)"
            radius={[0, 4, 4, 0]}
            name="Students"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
