"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { students as initialStudents } from "@/lib/mockData";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Student = typeof initialStudents[number];

export default function PerformancePage() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [statusFilter, setStatusFilter] = useState<"" | "Active" | "Completed" | "Dropped">("");
  const [batchFilter, setBatchFilter] = useState("");
  const [centerFilter, setCenterFilter] = useState("");
  const [tradeFilter, setTradeFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStudent, setNewStudent] = useState<Student>({
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

  // --- Filtered students ---
  const filteredStudents = students.filter(s => {
    const matchesStatus = statusFilter ? s.status === statusFilter : true;
    const matchesBatch = batchFilter ? s.batch === batchFilter : true;
    const matchesCenter = centerFilter ? s.center === centerFilter : true;
    const matchesTrade = tradeFilter ? s.trade === tradeFilter : true;
    const matchesDistrict = districtFilter ? s.district === districtFilter : true;
    return matchesStatus && matchesBatch && matchesCenter && matchesTrade && matchesDistrict;
  });

  // --- Unique values for filters ---
  const uniqueBatches = Array.from(new Set(students.map(s => s.batch)));
  const uniqueCenters = Array.from(new Set(students.map(s => s.center)));
  const uniqueTrades = Array.from(new Set(students.map(s => s.trade)));
  const uniqueDistricts = Array.from(new Set(students.map(s => s.district)));

  // --- Stats ---
  const totalStudents = filteredStudents.length;
  const avgPerformance =
    totalStudents > 0
      ? filteredStudents.reduce((sum, s) => sum + s.performance, 0) / totalStudents
      : 0;
  const topPerformer =
    filteredStudents.length > 0
      ? filteredStudents.reduce((top, s) => (s.performance > top.performance ? s : top), filteredStudents[0])
      : null;

  // --- Add Student ---
  const handleAddStudent = () => {
    if (!newStudent.name.trim() || !newStudent.email.trim()) return;

    const studentToAdd: Student = {
      ...newStudent,
      id: students.length + 1,
    };

    setStudents([...students, studentToAdd]);

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
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="page-title">Performance</h1>
          <p className="page-description">Student performance overview</p>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as "" | "Active" | "Completed" | "Dropped")}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="Dropped">Dropped</option>
          </select>

          <select value={batchFilter} onChange={e => setBatchFilter(e.target.value)} className="px-3 py-2 border rounded-lg">
            <option value="">All Batches</option>
            {uniqueBatches.map(b => <option key={b} value={b}>{b}</option>)}
          </select>

          <select value={centerFilter} onChange={e => setCenterFilter(e.target.value)} className="px-3 py-2 border rounded-lg">
            <option value="">All Centers</option>
            {uniqueCenters.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <select value={tradeFilter} onChange={e => setTradeFilter(e.target.value)} className="px-3 py-2 border rounded-lg">
            <option value="">All Trades</option>
            {uniqueTrades.map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          <select value={districtFilter} onChange={e => setDistrictFilter(e.target.value)} className="px-3 py-2 border rounded-lg">
            <option value="">All Districts</option>
            {uniqueDistricts.map(d => <option key={d} value={d}>{d}</option>)}
          </select>

          <Button onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? "Cancel Add" : "Add Student"}
          </Button>
        </div>
      </div>

      {/* Add Student Form */}
      {showAddForm && (
        <div className="mb-6 p-4 border rounded-lg max-w-md space-y-3">
          <input placeholder="Name" value={newStudent.name} onChange={e => setNewStudent({ ...newStudent, name: e.target.value })} className="w-full px-3 py-2 border rounded" />
          <input placeholder="Email" value={newStudent.email} onChange={e => setNewStudent({ ...newStudent, email: e.target.value })} className="w-full px-3 py-2 border rounded" />
          <input placeholder="Trade" value={newStudent.trade} onChange={e => setNewStudent({ ...newStudent, trade: e.target.value })} className="w-full px-3 py-2 border rounded" />
          <input placeholder="Batch" value={newStudent.batch} onChange={e => setNewStudent({ ...newStudent, batch: e.target.value })} className="w-full px-3 py-2 border rounded" />
          <input placeholder="Center" value={newStudent.center} onChange={e => setNewStudent({ ...newStudent, center: e.target.value })} className="w-full px-3 py-2 border rounded" />
          <input placeholder="District" value={newStudent.district} onChange={e => setNewStudent({ ...newStudent, district: e.target.value })} className="w-full px-3 py-2 border rounded" />
          <select value={newStudent.status} onChange={e => setNewStudent({ ...newStudent, status: e.target.value as "Active" | "Completed" | "Dropped" })} className="w-full px-3 py-2 border rounded">
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="Dropped">Dropped</option>
          </select>
          <div>
            <label className=" " htmlFor="">Attendance</label>
          <input type="number" placeholder="Attendance %" value={newStudent.attendance} onChange={e => setNewStudent({ ...newStudent, attendance: Number(e.target.value) })} className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className=" " htmlFor="">Performance</label>
          <input type="number" placeholder="Performance %" value={newStudent.performance} onChange={e => setNewStudent({ ...newStudent, performance: Number(e.target.value) })} className="w-full px-3 py-2 border rounded" />
          </div>
          <Button onClick={handleAddStudent}>Add Student</Button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Card className="p-5">
          <h2 className="text-sm text-muted-foreground">Total Students</h2>
          <p className="text-2xl font-semibold">{totalStudents}</p>
        </Card>

        <Card className="p-5">
          <h2 className="text-sm text-muted-foreground">Avg Performance</h2>
          <p className="text-2xl font-semibold">{avgPerformance.toFixed(1)}%</p>
        </Card>

        <Card className="p-5">
          <h2 className="text-sm text-muted-foreground">Top Performer</h2>
          {topPerformer ? (
            <>
              <p className="text-2xl font-semibold">{topPerformer.name}</p>
              <p className="text-sm text-muted-foreground">{topPerformer.performance}%</p>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">N/A</p>
          )}
        </Card>
      </div>

      {/* Performance Chart */}
      <div className="mb-6">
        <PerformanceChart />
      </div>
    </MainLayout>
  );
}
