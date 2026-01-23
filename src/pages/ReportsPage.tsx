"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MainLayout } from "@/components/layout/MainLayout";
import { students as initialStudents, trainers, recentActivity } from "@/lib/mockData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Student = typeof initialStudents[number];

const STUDENTS_PER_PAGE = 20;

export default function ReportsPage() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    trade: "",
    batch: "",
    center: "",
    district: "",
    status: "Active" as "Active" | "Completed" | "Dropped",
    attendance: 0,
    performance: 0,
    phone: "",
    id: 0,
  });

  // --- Filtered students ---
  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.trade.toLowerCase().includes(search.toLowerCase()) ||
    s.batch.toLowerCase().includes(search.toLowerCase()) ||
    s.center.toLowerCase().includes(search.toLowerCase()) ||
    s.district.toLowerCase().includes(search.toLowerCase())
  );

  // --- Pagination ---
  const totalPages = Math.ceil(filteredStudents.length / STUDENTS_PER_PAGE);
  const startIndex = (currentPage - 1) * STUDENTS_PER_PAGE;
  const endIndex = startIndex + STUDENTS_PER_PAGE;
  const paginatedStudents = filteredStudents.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const totalStudents = filteredStudents.length;
  const totalTrainers = trainers.length;
  const avgPerformance =
    filteredStudents.reduce((sum, s) => sum + s.performance, 0) /
    (filteredStudents.length || 1);

  // --- Export CSV ---
  const exportCSV = (studentsToExport: Student[] = filteredStudents) => {
    const headers = ["Name", "Email", "Trade", "Batch", "Center", "District", "Status", "Attendance %", "Performance"];
    const rows = studentsToExport.map(s => [
      s.name,
      s.email,
      s.trade,
      s.batch,
      s.center,
      s.district,
      s.status,
      s.attendance,
      s.performance
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(r => r.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- Add new student ---
  const handleAddStudent = () => {
    if (!newStudent.name.trim() || !newStudent.email.trim()) return;

    const studentToAdd: Student = {
      ...newStudent,
      id: students.length + 1,
    };

    setStudents([...students, studentToAdd]);

    // Reset form
    setNewStudent({
      name: "",
      email: "",
      trade: "",
      batch: "",
      center: "",
      district: "",
      status: "Active",
      attendance: 0,
      performance: 0,
      phone: "",
      id: 0,
    });
    setShowAddForm(false);
  };

  return (
    <MainLayout>
      {/* Header */}
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h1 className="page-title">Reports</h1>
          <p className="page-description">Summary of training program statistics</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          />
          <Button onClick={() => exportCSV()}>Export All CSV</Button>
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? "Cancel Add" : "Add Student"}
          </Button>
        </div>
      </div>

      {/* Add Student Form */}
      {showAddForm && (
        <div className="mb-4 p-4 border rounded-lg max-w-md space-y-3">
          <input
            placeholder="Name"
            value={newStudent.name}
            onChange={e => setNewStudent({ ...newStudent, name: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            placeholder="Email"
            value={newStudent.email}
            onChange={e => setNewStudent({ ...newStudent, email: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            placeholder="Trade"
            value={newStudent.trade}
            onChange={e => setNewStudent({ ...newStudent, trade: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            placeholder="Batch"
            value={newStudent.batch}
            onChange={e => setNewStudent({ ...newStudent, batch: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            placeholder="Center"
            value={newStudent.center}
            onChange={e => setNewStudent({ ...newStudent, center: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            placeholder="District"
            value={newStudent.district}
            onChange={e => setNewStudent({ ...newStudent, district: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
          <select
            value={newStudent.status}
            onChange={e => setNewStudent({ ...newStudent, status: e.target.value as "Active" | "Completed" | "Dropped" })}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="Dropped">Dropped</option>
          </select>
          <input
            type="number"
            placeholder="Attendance %"
            value={newStudent.attendance}
            onChange={e => setNewStudent({ ...newStudent, attendance: Number(e.target.value) })}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="number"
            placeholder="Performance %"
            value={newStudent.performance}
            onChange={e => setNewStudent({ ...newStudent, performance: Number(e.target.value) })}
            className="w-full px-3 py-2 border rounded"
          />
          <Button onClick={handleAddStudent}>Add Student</Button>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="p-5">
          <h2 className="text-sm text-muted-foreground">Total Students</h2>
          <p className="text-2xl font-semibold">{totalStudents}</p>
        </Card>
        <Card className="p-5">
          <h2 className="text-sm text-muted-foreground">Total Trainers</h2>
          <p className="text-2xl font-semibold">{totalTrainers}</p>
        </Card>
        <Card className="p-5">
          <h2 className="text-sm text-muted-foreground">Avg Performance</h2>
          <p className="text-2xl font-semibold">{avgPerformance.toFixed(1)}%</p>
        </Card>
        <Card className="p-5">
          <h2 className="text-sm text-muted-foreground">Recent Activities</h2>
          <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
            {recentActivity.map(act => (
              <li key={act.id}>{act.text}</li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Students Table with Individual Report */}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Trade</th>
              <th className="px-4 py-2 border">Batch</th>
              <th className="px-4 py-2 border">Center</th>
              <th className="px-4 py-2 border">District</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Attendance %</th>
              <th className="px-4 py-2 border">Performance %</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedStudents.map(s => (
              <tr key={s.id}>
                <td className="px-4 py-2 border">{s.name}</td>
                <td className="px-4 py-2 border">{s.email}</td>
                <td className="px-4 py-2 border">{s.trade}</td>
                <td className="px-4 py-2 border">{s.batch}</td>
                <td className="px-4 py-2 border">{s.center}</td>
                <td className="px-4 py-2 border">{s.district}</td>
                <td className="px-4 py-2 border">{s.status}</td>
                <td className="px-4 py-2 border">{s.attendance}%</td>
                <td className="px-4 py-2 border">{s.performance}%</td>
                <td className="px-4 py-2 border">
                  <Button size="sm" onClick={() => exportCSV([s])}>Report</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <button 
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={cn("flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors", currentPage === 1 && "opacity-50 cursor-not-allowed")}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            const showPage = page <= 3 || page > totalPages - 2 || (page >= currentPage - 1 && page <= currentPage + 1);
            if (!showPage && page !== 4 && page !== totalPages - 3) return null;
            
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={cn(
                  "w-9 h-9 rounded-lg text-sm font-medium transition-colors",
                  currentPage === page ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                )}
              >
                {page}
              </button>
            );
          })}
        </div>
        <button 
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={cn("flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors", currentPage === totalPages && "opacity-50 cursor-not-allowed")}
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </MainLayout>
  );
}
