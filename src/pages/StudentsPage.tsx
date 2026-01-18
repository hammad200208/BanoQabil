import { useState } from "react";
import {
  Search,
  Plus,
  Download,
  Upload,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { cn } from "@/lib/utils";

const students = [
  {
    id: 1,
    name: "Ahmed Hassan",
    email: "ahmed.h@email.com",
    phone: "+92 300 1234567",
    trade: "Web Development",
    batch: "BQ3-WD-001",
    center: "DHA Center",
    status: "Active",
    attendance: 92,
    performance: 85,
  },
  {
    id: 2,
    name: "Fatima Ali",
    email: "fatima.ali@email.com",
    phone: "+92 301 2345678",
    trade: "Graphic Design",
    batch: "BQ3-GD-002",
    center: "Gulshan Campus",
    status: "Active",
    attendance: 88,
    performance: 91,
  },
  {
    id: 3,
    name: "Muhammad Usman",
    email: "m.usman@email.com",
    phone: "+92 302 3456789",
    trade: "Digital Marketing",
    batch: "BQ3-DM-001",
    center: "Model Town",
    status: "Active",
    attendance: 95,
    performance: 78,
  },
  {
    id: 4,
    name: "Sara Khan",
    email: "sara.k@email.com",
    phone: "+92 303 4567890",
    trade: "Web Development",
    batch: "BQ3-WD-003",
    center: "F-8 Center",
    status: "Dropped",
    attendance: 45,
    performance: 52,
  },
  {
    id: 5,
    name: "Ali Raza",
    email: "ali.raza@email.com",
    phone: "+92 304 5678901",
    trade: "Mobile App Dev",
    batch: "BQ3-MA-001",
    center: "Saddar Campus",
    status: "Active",
    attendance: 89,
    performance: 82,
  },
  {
    id: 6,
    name: "Ayesha Malik",
    email: "ayesha.m@email.com",
    phone: "+92 305 6789012",
    trade: "Graphic Design",
    batch: "BQ3-GD-001",
    center: "DHA Center",
    status: "Completed",
    attendance: 97,
    performance: 94,
  },
];

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusBadge = (status: string) => {
    const styles = {
      Active: "badge-active",
      Dropped: "bg-destructive/10 text-destructive",
      Completed: "bg-info/10 text-info",
    };
    return styles[status as keyof typeof styles] || "badge-inactive";
  };

  return (
    <MainLayout>
      {/* Header */}
      <div className="page-header flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="page-title">Students</h1>
          <p className="page-description">
            Manage and monitor all enrolled students
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="filter-button">
            <Upload className="w-4 h-4" />
            <span>Import</span>
          </button>
          <button className="filter-button">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <FilterBar />

      {/* Search and Table */}
      <div className="stat-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full sm:w-80 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">6</span> of{" "}
            <span className="font-medium text-foreground">12,458</span> students
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Trade</th>
                <th>Batch</th>
                <th>Center</th>
                <th>Status</th>
                <th>Attendance</th>
                <th>Performance</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>
                    <div>
                      <p className="font-medium text-foreground">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{student.email}</p>
                    </div>
                  </td>
                  <td>{student.trade}</td>
                  <td>
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {student.batch}
                    </code>
                  </td>
                  <td>{student.center}</td>
                  <td>
                    <span className={cn("badge-status", getStatusBadge(student.status))}>
                      {student.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            student.attendance >= 80 ? "bg-success" : student.attendance >= 60 ? "bg-warning" : "bg-destructive"
                          )}
                          style={{ width: `${student.attendance}%` }}
                        />
                      </div>
                      <span className="text-sm">{student.attendance}%</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            student.performance >= 80 ? "bg-primary" : student.performance >= 60 ? "bg-info" : "bg-muted-foreground"
                          )}
                          style={{ width: `${student.performance}%` }}
                        />
                      </div>
                      <span className="text-sm">{student.performance}%</span>
                    </div>
                  </td>
                  <td>
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <button className="filter-button">
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
          <div className="flex items-center gap-1">
            {[1, 2, 3, "...", 124, 125].map((page, i) => (
              <button
                key={i}
                className={cn(
                  "w-9 h-9 rounded-lg text-sm font-medium transition-colors",
                  page === 1
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted text-muted-foreground"
                )}
              >
                {page}
              </button>
            ))}
          </div>
          <button className="filter-button">
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
