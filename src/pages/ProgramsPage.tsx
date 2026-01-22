"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Phases
const phases = [
  { key: "phase1", name: "Module 1" },
  { key: "phase2", name: "Module 2" },
  { key: "phase3", name: "Module 3" },
];

// Seasons
const seasons = [
  { key: "season1", name: "Spring 2026" },
  { key: "season2", name: "Summer 2026" },
  { key: "season3", name: "Fall 2026" },
];

// Status options
const statuses = ["Active", "Completed", "Dropped"] as const;
type Status = typeof statuses[number];

// Program type
type Program = {
  id: string;
  name: string;
  status: Status;
  phase: string;
  season: string;
};

// Default programs (3 by default)
const defaultPrograms: Program[] = [
  { id: "1", name: "Bano Qabil KPK", status: "Active", phase: "Module 1", season: "Spring 2026" },
  { id: "2", name: "Bano Qabil KPK", status: "Completed", phase: "Module 2", season: "Summer 2026" },
  { id: "3", name: "Bano Qabil KPK", status: "Active", phase: "Module 3", season: "Fall 2026" },
];

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>(defaultPrograms);
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    status: "Active" as Status,
    phase: phases[0].name,
    season: seasons[0].name,
  });

  // --- Filter states ---
  const [statusFilter, setStatusFilter] = useState<"" | Status>("");
  const [phaseFilter, setPhaseFilter] = useState("");
  const [seasonFilter, setSeasonFilter] = useState("");

  // --- CRUD Handlers ---
  const handleAddProgram = () => {
    if (!form.name.trim()) return;
    setPrograms([...programs, { id: crypto.randomUUID(), ...form }]);
    setForm({ name: "", status: "Active", phase: phases[0].name, season: seasons[0].name });
    setShowAdd(false);
  };

  const handleDelete = (id: string) => setPrograms(programs.filter((p) => p.id !== id));

  const handleEdit = (program: Program) => {
    setEditingId(program.id);
    setForm({ name: program.name, status: program.status, phase: program.phase, season: program.season });
  };

  const handleSaveEdit = () => {
    if (!editingId || !form.name.trim()) return;
    setPrograms(programs.map((p) => (p.id === editingId ? { id: editingId, ...form } : p)));
    setEditingId(null);
    setForm({ name: "", status: "Active", phase: phases[0].name, season: seasons[0].name });
  };

  // --- Filtered programs ---
  const filteredPrograms = programs.filter((p) => {
    const matchStatus = statusFilter ? p.status === statusFilter : true;
    const matchPhase = phaseFilter ? p.phase === phaseFilter : true;
    const matchSeason = seasonFilter ? p.season === seasonFilter : true;
    return matchStatus && matchPhase && matchSeason;
  });

  return (
    <MainLayout>
      {/* Header */}
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h1 className="page-title">Programs</h1>
          <p className="page-description">Manage training programs (Bano Qabil KPK)</p>
        </div>

        {/* Add Program Button */}
        <Button onClick={() => setShowAdd(!showAdd)}>Add Program</Button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-3 mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as "" | Status)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="">All Status</option>
          {statuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select
          value={phaseFilter}
          onChange={(e) => setPhaseFilter(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="">All Phases</option>
          {phases.map((p) => (
            <option key={p.key} value={p.name}>{p.name}</option>
          ))}
        </select>

        <select
          value={seasonFilter}
          onChange={(e) => setSeasonFilter(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="">All Seasons</option>
          {seasons.map((s) => (
            <option key={s.key} value={s.name}>{s.name}</option>
          ))}
        </select>
      </div>

      {/* Add/Edit Form */}
      {(showAdd || editingId) && (
        <div className="mb-4 p-4 border rounded-lg max-w-md space-y-3 shadow-md bg-white">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Program Name"
            className="w-full px-3 py-2 border rounded"
          />

          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value as Status })}
            className="w-full px-3 py-2 border rounded"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select
            value={form.phase}
            onChange={(e) => setForm({ ...form, phase: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          >
            {phases.map((p) => (
              <option key={p.key} value={p.name}>{p.name}</option>
            ))}
          </select>

          <select
            value={form.season}
            onChange={(e) => setForm({ ...form, season: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          >
            {seasons.map((s) => (
              <option key={s.key} value={s.name}>{s.name}</option>
            ))}
          </select>

          <div className="flex gap-2">
            {editingId ? (
              <Button onClick={handleSaveEdit}>Save</Button>
            ) : (
              <Button onClick={handleAddProgram}>Add</Button>
            )}
            <Button
              variant="outline"
              onClick={() => {
                setShowAdd(false);
                setEditingId(null);
                setForm({ name: "", status: "Active", phase: phases[0].name, season: seasons[0].name });
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Programs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPrograms.map((program) => (
          <Card
            key={program.id}
            className="p-5 space-y-2 shadow-lg hover:shadow-2xl rounded-lg transition-all bg-white"
          >
            {editingId !== program.id && (
              <>
                <h2 className="text-lg font-bold">{program.name}</h2>
                <div>
                  Status:{" "}
                  <span
                    className={`font-medium ${
                      program.status === "Active" ? "text-green-600" :
                      program.status === "Completed" ? "text-blue-600" :
                      "text-red-600"
                    }`}
                  >
                    {program.status}
                  </span>
                </div>
                <div>Phase: {program.phase}</div>
                <div>Season: {program.season}</div>

                {/* Links */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <a href="/trades"><Button size="sm">Trades</Button></a>
                  <a href="/batches"><Button size="sm">Batches</Button></a>
                  <a href="/students"><Button size="sm">Students</Button></a>
                  <a href="/trainers"><Button size="sm">Trainers</Button></a>
                  <a href="/attendance"><Button size="sm">Attendance</Button></a>
                  <a href="/performance"><Button size="sm">Performance</Button></a>
                  <a href="/reports"><Button size="sm">Reports</Button></a>
                  <a href="/centers"><Button size="sm">Centers</Button></a>
                  <a href="/districts"><Button size="sm">Districts</Button></a>
                </div>

                {/* Edit/Delete */}
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(program)}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(program.id)}>Delete</Button>
                </div>
              </>
            )}
          </Card>
        ))}
      </div>
    </MainLayout>
  );
}
