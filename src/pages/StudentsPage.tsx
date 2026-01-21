"use client";
import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Download,
  Upload,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Trash,
  Edit,
} from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { cn } from "@/lib/utils";
import { students as mockStudents, Student } from "@/lib/mockData";

export default function StudentsPage() {
  // --- State ---
  const [studentsData, setStudentsData] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    trade: "",
    batch: "",
    center: "",
    district: "",
    status: "Active" as Student["status"],
    attendance: 0,
    performance: 0,
  });

  // --- Load data from localStorage or mock ---
  useEffect(() => {
    const stored = localStorage.getItem("students");
    setStudentsData(stored ? JSON.parse(stored) : mockStudents);
  }, []);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(studentsData));
  }, [studentsData]);

  // --- Helper Functions ---
  const getStatusBadge = (status: string) => {
    const styles = {
      Active: "badge-active",
      Dropped: "bg-destructive/10 text-destructive",
      Completed: "bg-info/10 text-info",
    };
    return styles[status as keyof typeof styles] || "badge-inactive";
  };

  const filteredStudents = studentsData.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAddModal = () => {
    setEditingStudent(null);
    setForm({
      name: "",
      email: "",
      phone: "",
      trade: "",
      batch: "",
      center: "",
      district: "",
      status: "Active",
      attendance: 0,
      performance: 0,
    });
    setModalOpen(true);
  };

  const openEditModal = (student: Student) => {
    setEditingStudent(student);
    setForm({ ...student });
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this student?")) {
      setStudentsData((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const handleSubmit = () => {
    if (editingStudent) {
      // Edit
      setStudentsData((prev) =>
        prev.map((s) => (s.id === editingStudent.id ? { ...form, id: editingStudent.id } : s))
      );
    } else {
      // Add
      const newStudent: Student = { ...form, id: Date.now() };
      setStudentsData((prev) => [...prev, newStudent]);
    }
    setModalOpen(false);
  };

  // --- JSX ---
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
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <FilterBar />

      {/* Search & Table */}
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
            Showing <span className="font-medium text-foreground">{filteredStudents.length}</span> of{" "}
            <span className="font-medium text-foreground">{studentsData.length}</span> students
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
                <th>District</th>
                <th>Status</th>
                <th>Attendance</th>
                <th>Performance</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>
                    <div>
                      <p className="font-medium text-foreground">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{student.email}</p>
                    </div>
                  </td>
                  <td>{student.trade}</td>
                  <td>
                    <code className="text-xs bg-muted px-2 py-1 rounded">{student.batch}</code>
                  </td>
                  <td>{student.center}</td>
                  <td className="text-muted-foreground">{student.district}</td>
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
                            student.attendance >= 80
                              ? "bg-success"
                              : student.attendance >= 60
                              ? "bg-warning"
                              : "bg-destructive"
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
                            student.performance >= 80
                              ? "bg-primary"
                              : student.performance >= 60
                              ? "bg-info"
                              : "bg-muted-foreground"
                          )}
                          style={{ width: `${student.performance}%` }}
                        />
                      </div>
                      <span className="text-sm">{student.performance}%</span>
                    </div>
                  </td>
                  <td className="flex gap-2">
                    <button onClick={() => openEditModal(student)} className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(student.id)} className="p-2 hover:bg-red-100 rounded-lg transition-colors">
                      <Trash className="w-4 h-4 text-destructive" />
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
                  page === 1 ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground"
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

      {/* --- Modal --- */}
{modalOpen && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-background p-6 rounded-xl w-full max-w-lg shadow-xl">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          {editingStudent ? "Edit Student" : "Add New Student"}
        </h2>
        <p className="text-sm text-muted-foreground">
          Fill in the student details below
        </p>
      </div>

      {/* Form */}
      <div className="space-y-6">

        {/* --- Personal Information --- */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-muted-foreground">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="form-label">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input-field"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-field"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="input-field"
                placeholder="+91 98765 43210"
              />
            </div>
          </div>
        </div>

        {/* --- Academic Details --- */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-muted-foreground">
            Academic Details
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="form-label">Trade</label>
              <input
                type="text"
                value={form.trade}
                onChange={(e) => setForm({ ...form, trade: e.target.value })}
                className="input-field"
                placeholder="Electrician"
              />
            </div>

            <div>
              <label className="form-label">Batch</label>
              <input
                type="text"
                value={form.batch}
                onChange={(e) => setForm({ ...form, batch: e.target.value })}
                className="input-field"
                placeholder="2024-A"
              />
            </div>

            <div>
              <label className="form-label">Center</label>
              <input
                type="text"
                value={form.center}
                onChange={(e) => setForm({ ...form, center: e.target.value })}
                className="input-field"
                placeholder="Delhi Training Center"
              />
            </div>

            <div>
              <label className="form-label">District</label>
              <input
                type="text"
                value={form.district}
                onChange={(e) => setForm({ ...form, district: e.target.value })}
                className="input-field"
                placeholder="South Delhi"
              />
            </div>
          </div>
        </div>

        {/* --- Performance --- */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-muted-foreground">
            Performance
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="form-label">Attendance (%)</label>
              <input
                type="number"
                min={0}
                max={100}
                value={form.attendance}
                onChange={(e) => setForm({ ...form, attendance: Number(e.target.value) })}
                className="input-field"
              />
            </div>

            <div>
              <label className="form-label">Performance (%)</label>
              <input
                type="number"
                min={0}
                max={100}
                value={form.performance}
                onChange={(e) => setForm({ ...form, performance: Number(e.target.value) })}
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* --- Status --- */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-muted-foreground">
            Student Status
          </h3>
          <select
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value as Student["status"] })
            }
            className="input-field"
          >
            <option value="Active">Active</option>
            <option value="Dropped">Dropped</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setModalOpen(false)}
          className="filter-button"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="bg-primary text-primary-foreground px-5 py-2 rounded-lg font-medium"
        >
          {editingStudent ? "Update Student" : "Add Student"}
        </button>
      </div>
    </div>
  </div>
)}
    </MainLayout>
  );
}
