"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Phases type
type Phase = {
  id: string;
  name: string;
  season: string;
  total: number;
  active: number;
  completed: number;
  dropped: number;
  status: "Active" | "Completed" | "Dropped";
};

// Default dummy phases
const defaultPhases: Phase[] = [
  {
    id: "1",
    name: "Phase 1",
    season: "Spring 2026",
    total: 25,
    active: 20,
    completed: 4,
    dropped: 1,
    status: "Active",
  },
  {
    id: "2",
    name: "Phase 2",
    season: "Summer 2026",
    total: 18,
    active: 15,
    completed: 2,
    dropped: 1,
    status: "Active",
  },
  {
    id: "3",
    name: "Phase 3",
    season: "Fall 2026",
    total: 30,
    active: 25,
    completed: 4,
    dropped: 1,
    status: "Completed",
  },
];

// Status options
const statuses = ["Active", "Completed", "Dropped"] as const;
type Status = typeof statuses[number];

export default function PhasesPage() {
  const [phases, setPhases] = useState<Phase[]>(defaultPhases);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    season: "Spring 2026",
    total: 0,
    active: 0,
    completed: 0,
    dropped: 0,
    status: "Active" as Status,
  });

  const [statusFilter, setStatusFilter] = useState<"" | Status>("");
  const [seasonFilter, setSeasonFilter] = useState("");

  // --- CRUD Handlers ---
  const handleAddPhase = () => {
    if (!form.name.trim()) return;

    setPhases([
      ...phases,
      {
        id: crypto.randomUUID(),
        ...form,
      },
    ]);
    resetForm();
  };

  const handleEditPhase = (phase: Phase) => {
    setEditingId(phase.id);
    setForm({ ...phase });
    setShowForm(true);
  };

  const handleSaveEdit = () => {
    if (!editingId || !form.name.trim()) return;

    setPhases(phases.map(p => (p.id === editingId ? { id: editingId, ...form } : p)));
    resetForm();
  };

  const handleDeletePhase = (id: string) => {
    setPhases(phases.filter(p => p.id !== id));
  };

  const resetForm = () => {
    setEditingId(null);
    setShowForm(false);
    setForm({
      name: "",
      season: "Spring 2026",
      total: 0,
      active: 0,
      completed: 0,
      dropped: 0,
      status: "Active",
    });
  };

  // --- Filtered phases ---
  const filteredPhases = phases.filter(p => {
    const matchStatus = statusFilter ? p.status === statusFilter : true;
    const matchSeason = seasonFilter ? p.season === seasonFilter : true;
    return matchStatus && matchSeason;
  });

  return (
    <MainLayout>
      {/* Header */}
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h1 className="page-title">Phases</h1>
          <p className="page-description">
            Manage training program phases (Bano Qabil KPK)
          </p>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as "" | Status)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="">All Status</option>
            {statuses.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select
            value={seasonFilter}
            onChange={e => setSeasonFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="">All Seasons</option>
            {Array.from(new Set(phases.map(p => p.season))).map(season => (
              <option key={season} value={season}>{season}</option>
            ))}
          </select>

          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? "Close Form" : "Add Phase"}
          </Button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="mb-4 p-4 border rounded-lg max-w-md space-y-3">
          <input
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="Phase Name"
            className="w-full px-3 py-2 border rounded"
          />

          <select
            value={form.status}
            onChange={e => setForm({ ...form, status: e.target.value as Status })}
            className="w-full px-3 py-2 border rounded"
          >
            {statuses.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select
            value={form.season}
            onChange={e => setForm({ ...form, season: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          >
            {["Spring 2026", "Summer 2026", "Fall 2026"].map(season => (
              <option key={season} value={season}>{season}</option>
            ))}
          </select>

         {/* Total Students */}
<div>
  <label className="block text-sm font-medium mb-1">Total Students</label>
  <input
    type="number"
    placeholder="e.g., 25"
    value={form.total}
    onChange={e => setForm({ ...form, total: Number(e.target.value) })}
    className="w-full px-3 py-2 border rounded"
  />
</div>

{/* Active Students */}
<div>
  <label className="block text-sm font-medium mb-1">Active Students</label>
  <input
    type="number"
    placeholder="e.g., 20"
    value={form.active}
    onChange={e => setForm({ ...form, active: Number(e.target.value) })}
    className="w-full px-3 py-2 border rounded"
  />
</div>

{/* Completed Students */}
<div>
  <label className="block text-sm font-medium mb-1">Completed Students</label>
  <input
    type="number"
    placeholder="e.g., 4"
    value={form.completed}
    onChange={e => setForm({ ...form, completed: Number(e.target.value) })}
    className="w-full px-3 py-2 border rounded"
  />
</div>

{/* Dropped Students */}
<div>
  <label className="block text-sm font-medium mb-1">Dropped Students</label>
  <input
    type="number"
    placeholder="e.g., 1"
    value={form.dropped}
    onChange={e => setForm({ ...form, dropped: Number(e.target.value) })}
    className="w-full px-3 py-2 border rounded"
  />
</div>




          <div className="flex gap-2">
            {editingId ? (
              <Button onClick={handleSaveEdit}>Save</Button>
            ) : (
              <Button onClick={handleAddPhase}>Add</Button>
            )}
            <Button variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Phases Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPhases.map(phase => (
          <Card
            key={phase.id}
            className="p-5 space-y-3 shadow-lg hover:shadow-2xl rounded-lg transition-all bg-white"
          >
            <h2 className="text-xl font-bold">{phase.name}</h2>
            <div className="text-sm font-medium text-foreground">Program: Bano Qabil KPK</div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Total: {phase.total}</span>
              <span>Active: {phase.active}</span>
              <span>Completed: {phase.completed}</span>
              <span>Dropped: {phase.dropped}</span>
            </div>
            <div className="text-sm text-muted-foreground">Season: {phase.season}</div>

            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{
                  width: phase.total
                    ? `${Math.round((phase.completed / phase.total) * 100)}%`
                    : "0%",
                }}
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button size="sm" variant="outline" onClick={() => handleEditPhase(phase)}>
                Edit
              </Button>
              <Button size="sm" variant="destructive" onClick={() => handleDeletePhase(phase.id)}>
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
}
