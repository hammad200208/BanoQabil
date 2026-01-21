import { MainLayout } from "@/components/layout/MainLayout";
import { students } from "@/lib/mockData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AttendancePage() {
  return (
    <MainLayout>
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Attendance</h1>
        <p className="page-description">
          Overview of student attendance
        </p>
      </div>

      {/* Attendance Table */}
      <div className="overflow-x-auto mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Trade</TableHead>
              <TableHead>Batch</TableHead>
              <TableHead>Center</TableHead>
              <TableHead>District</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Attendance %</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map(student => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.trade}</TableCell>
                <TableCell>{student.batch}</TableCell>
                <TableCell>{student.center}</TableCell>
                <TableCell>{student.district}</TableCell>
                <TableCell>{student.status}</TableCell>
                <TableCell>{student.attendance}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </MainLayout>
  );
}
