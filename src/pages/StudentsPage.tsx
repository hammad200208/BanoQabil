"use client";
import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Download,
  Upload,
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
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const STUDENTS_PER_PAGE = 20;

  const initialForm: Partial<Student> = {
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
    phase: "",
    season: "",
  };

  const [form, setForm] = useState<Partial<Student>>(initialForm);

  // --- Load data from localStorage or mock ---
  useEffect(() => {
  const stored = localStorage.getItem("students");
  const loaded = stored ? JSON.parse(stored) : [];
  // Only include students that have phase and season properties
  const validLoaded = loaded.filter((s: Student) => s.phase && s.season);
  setStudentsData([...mockStudents, ...validLoaded]);
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

  // Normalize function to ensure consistent comparisons
  const normalize = (value?: string) =>
    value?.toLowerCase().replace(/\s+/g, "").trim() || "";

  const filteredStudents = studentsData.filter((s) => {
    // Search filter
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Program filter - normalize both values for comparison
    const programFilter = activeFilters["Program"];
    const matchesProgram = programFilter
      ? normalize(s.program) === normalize(programFilter)
      : true;
    
    // Phase filter - normalize both values for comparison
    const phaseFilter = activeFilters["Phase"];
    const matchesPhase = phaseFilter
      ? normalize(s.phase) === normalize(phaseFilter)
      : true;
    
    // Season filter - normalize both values for comparison
    const seasonFilter = activeFilters["Season"];
    const matchesSeason = seasonFilter
      ? normalize(s.season) === normalize(seasonFilter)
      : true;
    
    // Region filter - normalize both values for comparison
    const regionFilter = activeFilters["Region"];
    const matchesRegion = regionFilter
      ? normalize(s.region) === normalize(regionFilter)
      : true;
    
    // District filter - normalize both values for comparison
    const districtFilter = activeFilters["District"];
    const matchesDistrict = districtFilter
      ? normalize(s.district) === normalize(districtFilter)
      : true;
    
    return matchesSearch && matchesProgram && matchesPhase && matchesSeason && matchesRegion && matchesDistrict;
  });

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredStudents.length / STUDENTS_PER_PAGE);
  const startIndex = (currentPage - 1) * STUDENTS_PER_PAGE;
  const endIndex = startIndex + STUDENTS_PER_PAGE;
  const paginatedStudents = filteredStudents.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilters, searchQuery]);

  const openAddModal = () => {
    setEditingStudent(null);
    setForm(initialForm);
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
    if (!form.name) {
      alert("Name is required!");
      return;
    }

    if (editingStudent) {
      // Edit
      setStudentsData((prev) =>
        prev.map((s) => (s.id === editingStudent.id ? { ...form, id: editingStudent.id } as Student : s))
      );
    } else {
      // Add
      const newStudent: Student = { ...form, id: Date.now() } as Student;
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
          <p className="page-description">Manage and monitor all enrolled students</p>
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
      <FilterBar onFilterChange={setActiveFilters} filters={activeFilters} />

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
              {paginatedStudents.map((student) => (
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
                            student.attendance! >= 80
                              ? "bg-success"
                              : student.attendance! >= 60
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
                            student.performance! >= 80
                              ? "bg-primary"
                              : student.performance! >= 60
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
                    <button
                      onClick={() => openEditModal(student)}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                    >
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
          <button 
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={cn("filter-button", currentPage === 1 && "opacity-50 cursor-not-allowed")}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Show first 3 pages, last 2 pages, and current page with neighbors
              const showPage = 
                page <= 3 || 
                page > totalPages - 2 || 
                (page >= currentPage - 1 && page <= currentPage + 1);
              
              if (!showPage && page !== 4 && page !== totalPages - 3) return null;
              
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={cn(
                    "w-9 h-9 rounded-lg text-sm font-medium transition-colors",
                    currentPage === page 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-muted text-muted-foreground"
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
            className={cn("filter-button", currentPage === totalPages && "opacity-50 cursor-not-allowed")}
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* --- Modal --- */}
      {modalOpen && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="bg-background p-6 rounded-xl w-full max-w-3xl shadow-xl overflow-auto max-h-[90vh]">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">{editingStudent ? "Edit Student" : "Add New Student"}</h2>
        <p className="text-sm text-muted-foreground">Fill in the student details below</p>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Personal Information */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <h3 className="text-sm font-semibold mb-2 text-muted-foreground">Personal Information</h3>
          <input
            type="text"
            value={form.name || ""}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input-field mb-2"
            placeholder="Full Name"
          />
          <input
            type="email"
            value={form.email || ""}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input-field mb-2"
            placeholder="Email Address"
          />
          <input
            type="text"
            value={form.phone || ""}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="input-field"
            placeholder="Phone Number"
          />
        </div>

        {/* Academic Details */}
        <div className="col-span-1">
          <h3 className="text-sm font-semibold mb-2 text-muted-foreground">Academic Details</h3>
          <input
            type="text"
            value={form.trade || ""}
            onChange={(e) => setForm({ ...form, trade: e.target.value })}
            className="input-field mb-2"
            placeholder="Trade"
          />
          <input
            type="text"
            value={form.batch || ""}
            onChange={(e) => setForm({ ...form, batch: e.target.value })}
            className="input-field mb-2"
            placeholder="Batch"
          />
          <input
            type="text"
            value={form.center || ""}
            onChange={(e) => setForm({ ...form, center: e.target.value })}
            className="input-field mb-2"
            placeholder="Center"
          />
          <input
            type="text"
            value={form.district || ""}
            onChange={(e) => setForm({ ...form, district: e.target.value })}
            className="input-field mb-2"
            placeholder="District"
          />
          <input
            type="text"
            value={form.phase || ""}
            onChange={(e) => setForm({ ...form, phase: e.target.value })}
            className="input-field mb-2"
            placeholder="Phase"
          />
          <input
            type="text"
            value={form.season || ""}
            onChange={(e) => setForm({ ...form, season: e.target.value })}
            className="input-field"
            placeholder="Season"
          />
        </div>

        {/* --- Performance & Status --- */}
<div>
  <h3 className="text-sm font-semibold mb-4 text-muted-foreground">Performance Metrics</h3>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Attendance */}
    <div>
      <label className="form-label mb-1">Attendance </label>
      <div className="flex items-center gap-3">
        <input
          type="number"
          min={0}
          max={100}
          value={form.attendance || 0}
          onChange={(e) => setForm({ ...form, attendance: Number(e.target.value) })}
          className="input-field flex-1"
        />
        <span className="text-sm w-10 text-right font-medium">{form.attendance}%</span>
      </div>
      <div className="w-full h-3 bg-gray-200 rounded-full mt-1 overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300",
            form.attendance! >= 80
              ? "bg-green-500"
              : form.attendance! >= 60
              ? "bg-yellow-400"
              : "bg-red-500"
          )}
          style={{ width: `${form.attendance}%` }}
        />
      </div>
    </div>

    {/* Performance */}
    <div>
      <label className="form-label mb-1">Performance </label>
      <div className="flex items-center gap-3">
        <input
          type="number"
          min={0}
          max={100}
          value={form.performance || 0}
          onChange={(e) => setForm({ ...form, performance: Number(e.target.value) })}
          className="input-field flex-1"
        />
        <span className="text-sm w-10 text-right font-medium">{form.performance}%</span>
      </div>
      <div className="w-full h-3 bg-gray-200 rounded-full mt-1 overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300",
            form.performance! >= 80
              ? "bg-blue-500"
              : form.performance! >= 60
              ? "bg-indigo-400"
              : "bg-gray-400"
          )}
          style={{ width: `${form.performance}%` }}
        />
      </div>
    </div>
  </div>

  {/* Status */}
  <div className="mt-4">
    <label className="form-label mb-1">Student Status</label>
    <select
      value={form.status || "Active"}
      onChange={(e) => setForm({ ...form, status: e.target.value as Student["status"] })}
      className="input-field"
    >
      <option value="Active">Active</option>
      <option value="Dropped">Dropped</option>
      <option value="Completed">Completed</option>
    </select>
  </div>
</div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 mt-6">
        <button onClick={() => setModalOpen(false)} className="filter-button">
          Cancel
        </button>
        <button onClick={handleSubmit} className="bg-primary text-primary-foreground px-5 py-2 rounded-lg font-medium">
          {editingStudent ? "Update Student" : "Add Student"}
        </button>
      </div>
    </div>
  </div>
)}

      
    </MainLayout>
  );
}
