"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MainLayout } from "@/components/layout/MainLayout";
import { students as initialStudents } from "@/lib/mockData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type Student = typeof initialStudents[number];

const STUDENTS_PER_PAGE = 20;

export default function AttendancePage() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"" | "Active" | "Completed" | "Dropped">("");
  const [batchFilter, setBatchFilter] = useState("");
  const [centerFilter, setCenterFilter] = useState("");
  const [tradeFilter, setTradeFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newStudent, setNewStudent] = useState({
    id: 0,
    name: "",
    email: "",
    trade: "",
    batch: "",
    center: "",
    district: "",
    status: "Active" as "Active" | "Completed" | "Dropped",
    attendance: 0,
    phone: "",
    performance: 0,
  });

  // --- Unique values for filters ---
  const uniqueBatches = Array.from(new Set(students.map(s => s.batch)));
  const uniqueCenters = Array.from(new Set(students.map(s => s.center)));
  const uniqueTrades = Array.from(new Set(students.map(s => s.trade)));
  const uniqueDistricts = Array.from(new Set(students.map(s => s.district)));

  // --- Filtered students ---
  const filteredStudents = students.filter(s => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.trade.toLowerCase().includes(search.toLowerCase()) ||
      s.batch.toLowerCase().includes(search.toLowerCase()) ||
      s.center.toLowerCase().includes(search.toLowerCase()) ||
      s.district.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter ? s.status === statusFilter : true;
    const matchesBatch = batchFilter ? s.batch === batchFilter : true;
    const matchesCenter = centerFilter ? s.center === centerFilter : true;
    const matchesTrade = tradeFilter ? s.trade === tradeFilter : true;
    const matchesDistrict = districtFilter ? s.district === districtFilter : true;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesBatch &&
      matchesCenter &&
      matchesTrade &&
      matchesDistrict
    );
  });

  // --- Pagination ---
  const totalPages = Math.ceil(filteredStudents.length / STUDENTS_PER_PAGE);
  const startIndex = (currentPage - 1) * STUDENTS_PER_PAGE;
  const endIndex = startIndex + STUDENTS_PER_PAGE;
  const paginatedStudents = filteredStudents.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, batchFilter, centerFilter, tradeFilter, districtFilter]);

  // --- Export CSV ---
  const exportCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Trade",
      "Batch",
      "Center",
      "District",
      "Status",
      "Attendance %",
    ];
    const rows = filteredStudents.map(s => [
      s.name,
      s.email,
      s.trade,
      s.batch,
      s.center,
      s.district,
      s.status,
      s.attendance,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "attendance.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- Add new student ---
  const handleAddStudent = () => {
    if (!newStudent.name.trim() || !newStudent.email.trim()) return;

    const studentToAdd: Student = {
      ...newStudent,
      id: students.length + 1, // number id
    };

    setStudents([...students, studentToAdd]);

    // Reset form
    setNewStudent({
      id: 0,
      name: "",
      email: "",
      trade: "",
      batch: "",
      center: "",
      district: "",
      status: "Active",
      attendance: 0,
      phone: "",
      performance: 0,
    });
    setShowAddForm(false);
  };

  return (
    <MainLayout>
      {/* Header + Filters */}
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h1 className="page-title">Attendance</h1>
          <p className="page-description">Overview of student attendance</p>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <input
            type="text"
            placeholder="Search by name, email, trade..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          />

          <select
            value={statusFilter}
            onChange={e =>
              setStatusFilter(e.target.value as "" | "Active" | "Completed" | "Dropped")
            }
            className="px-3 py-2 border rounded-lg"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="Dropped">Dropped</option>
          </select>

          <select
            value={batchFilter}
            onChange={e => setBatchFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="">All Batches</option>
            {uniqueBatches.map(b => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          <select
            value={centerFilter}
            onChange={e => setCenterFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="">All Centers</option>
            {uniqueCenters.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={tradeFilter}
            onChange={e => setTradeFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="">All Trades</option>
            {uniqueTrades.map(t => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <select
            value={districtFilter}
            onChange={e => setDistrictFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="">All Districts</option>
            {uniqueDistricts.map(d => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <Button onClick={exportCSV}>Export CSV</Button>
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
            onChange={e =>
              setNewStudent({
                ...newStudent,
                status: e.target.value as "Active" | "Completed" | "Dropped",
              })
            }
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
            onChange={e =>
              setNewStudent({ ...newStudent, attendance: Number(e.target.value) })
            }
            className="w-full px-3 py-2 border rounded"
          />
          <Button onClick={handleAddStudent}>Add Student</Button>
        </div>
      )}

      {/* Attendance Table */}
      <div className="overflow-x-auto mt-4">
        <Table className="table-auto">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Trade</TableHead>
              <TableHead>Batch</TableHead>
              <TableHead>Center</TableHead>
              <TableHead>District</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Attendance </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedStudents.map(student => (
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
